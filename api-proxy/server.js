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


// Http proxy
var httpProxy = require('http-proxy');


// Create http server
http.createServer(function (req, res) {
    // Parse the request url
    var url = parser.parse(req.url, true);
    //console.log(url);

    console.log(url.pathname.split("/")[1]);

    // Decide action based on path
    switch(url.pathname.split("/")[1]) {
        case 'requestToken':
            // Get token from api
            console.log("request for token");
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
            console.log("serve default pages");

    }


    //console.log(req.url);
    res.end('welcome');

}).listen(8080);
