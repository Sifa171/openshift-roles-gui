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


// Http proxy
var httpProxy = require('http-proxy');

// Serve static files of the webUi
var serve = serveStatic("../");


// Create http server
http.createServer(function (req, res) {
    // Parse the request url
    var url = parser.parse(req.url, true);

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
