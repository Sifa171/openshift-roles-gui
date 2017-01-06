/**
 * Created by meissner on 05.01.17.
 * Main script for the api-proxy server
 */
// Enable unsecure/self signed certificates
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// WebServer
var http = require('http');
// Serve static pages
var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');

// To parse urls
var parser = require('url');
var path = require('path');

// To parse post data
var querystring = require('querystring');


// Http proxy
var httpProxy = require('http-proxy');

// Serve static files of the webUi
var serve = serveStatic("./webui/");

// Make requests (used to obtain the token)
var request = require("request");


// Function to return json for internal api
function jsonResponse(responseData, errorMessage) {
    var response = {data:responseData};
    if (errorMessage) {
        response.error = true;
        response.error_message = errorMessage;
    } else {
        response.error = false;
    }

    return JSON.stringify(response);
}

var proxy = httpProxy.createProxyServer({});

proxy.on('upgrade', function (req, socket, head) {
    console.log(req);
    console.log('--  WebProxy Upgrade detected');

});

// Create http server
http.createServer(function (req, res) {
    // Parse the request url
    var url = parser.parse(req.url, true);

    // Decide action based on path
    switch(url.pathname.split("/")[1]) {
        case 'requestToken':
            // TODO: Clean this up and move it into a module or at least function
            // Get token from api
            console.log("Request for token");
            res.setHeader('Content-Type', 'application/json');

            // Check if post request
            if (req.method != 'POST') {
                res.end(jsonResponse(null, 'Only POST-Requests allowed'));
            }

            var postBody = "";
            req.on('data', function (chunk) {
                // Append to post
                postBody += chunk;
            });
            req.on('end', function () {
                var postData = querystring.parse(postBody);

                // TODO: Check format of apiServer url and check if all values are set and valid

                // Obtain token from OpenShift API
                var url = 'https://' + postData.username + ':' + postData.password + '@' + postData.server + '/oauth/authorize?client_id=openshift-challenging-client&response_type=token';

                request({url: url}, function (error, response, body) {
                    if (typeof response !== 'undefined' && typeof response.request !== 'undefined' && typeof response.request.href !== 'undefined') {
						// Redirect works and got url to token


                        // Quick & dirty method to parse the access_token
						var redirectUrl = response.request.href;
                        // Check if redirect contains requestToken
                        if (redirectUrl.indexOf("access_token=") > 1) {
                            var accessToken = redirectUrl.substring(redirectUrl.indexOf("access_token=")+13, redirectUrl.indexOf("&"));
                            console.log('Got token ' + accessToken);
                            res.end(jsonResponse({userToken: accessToken}));
                        } else {
                            res.end(jsonResponse(null, "Did not got an access_token, propably access denied"));
                        }

					} else {
						// TODO: Error handling to display wrong username/password
						res.end(jsonResponse(null, "Did not got redirected and got no token"));
					}
                    
                    
                });
                
            });

            break;
        case 'api-proxy':
            // Simple proxy to api
            console.log('api-proxy to server ' + url.query._server);

            // Rewrite URL to original request
            req.url = 'https://' + url.query._server + url.path.substr(10);

            // Proxy Request
            proxy.web(req, res, { target: 'https://' + url.query._server , secure: false});

            break;
        case 'api-proxy-socket':
            // TODO: WebSocket Proxy to api
            console.log("api-proxy-socket");
            break;
        default:
            // Serve static files from webgui

            // Prepare the file-path (and append index.html if root dir)
            var filePath = '.' + req.url;
            if (filePath == './') {
                filePath = './index.html';
            }

            var extname = path.extname(filePath);
            switch (extname) {
                case '.png':
                case '.ico':
                case '.svg':
                case '.woff':
                    // dont log assets
                    break;
                case '.js':
                case '.html':
                    // TODO: Remove this in non-dev version or make variable to toggle it
                    // For debugging/dev purposes: no caching of js files
                    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
                    res.setHeader('Pragma', 'no-cache');
                    console.log('Serve static page: ' + req.url + ' (Without caching for dev)');
                    break;
                default:
                    // Access log
                    console.log('Serve static page: ' + req.url);
                    break;
            }

            var done = finalhandler(req, res);
            serve(req, res, done);
    }

}).listen(8080);
console.log("Now serving on http://localhost:8080");
