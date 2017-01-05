/**
 * Created by meissner on 05.01.17.
 * Main script for the api-proxy server
 */
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
var serve = serveStatic("../");

// Enable unsecure/self signed certificates
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

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

// Create http server
http.createServer(function (req, res) {
    // Parse the request url
    var url = parser.parse(req.url, true);

    // Decide action based on path
    switch(url.pathname.split("/")[1]) {
        case 'requestToken':
            // TODO: Clean this up and move it into a module or at least function
            // Get token from api
            console.log("request for token");
            res.setHeader('Content-Type', 'application/json');

            // Check if post request
            if (req.method != 'POST') {
                res.end(jsonResponse(null, 'Only POST-Requests allowed'));
            }

            
            var postBody = "";
            req.on('data', function (chunk) {
                postBody += chunk;
            });
            req.on('end', function () {
                var postData = querystring.parse(postBody);
                console.log(postData);

                // TODO: Check format of apiServer url and check if all values are set and valid

                // Obtain token from OpenShift API
                var url = 'https://' + postData.username + ':' + postData.password + '@' + postData.apiServer + '/oauth/authorize?client_id=openshift-challenging-client&response_type=token';

                request({url: url}, function (error, response, body) {
                    // Quick & dirty method to parse the access_token
                    var redirectUrl = response.request.href;
                    var accessToken = redirectUrl.substring(redirectUrl.indexOf("access_token=")+13, redirectUrl.indexOf("&"));
                    console.log(accessToken);
                    res.end(jsonResponse({userToken: accessToken}));
                });
                
            });

            break;
        case 'api-proxy':
            // Simple proxy to api
            console.log("api-proxy");
            break;
        case 'api-proxy-socket':
            // TODO: WebSocket Proxy to api
            console.log("api-proxy-socket");
            break;
        default:
            // Serve static files from webgui
            console.log("Serve static page: " + req.url);

            var filePath = '.' + req.url;
            if (filePath == './')
                filePath = './index.html';

            var extname = path.extname(filePath);
            switch (extname) {
                // TODO: Remove this in non-dev version or make variable to toggle it
                // For debugging/dev purposes: no caching of js files
                case '.js':
                case '.html':
                    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
                    res.setHeader('Pragma', 'no-cache');
                    console.log("set no-cache shit");
                    break;
            }

            var done = finalhandler(req, res);
            serve(req, res, done);
    }

}).listen(8080);
console.log("Now serving on http://localhost:8080");
