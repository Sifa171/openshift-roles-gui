/**
 * Created by meissner on 05.01.17.
 * Simple node.js request against the openshift api
 */
var request = require("request");

// Enable unsecure/self signed certificates
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// simple request
request({
    uri: "https://192.168.1.20:8443/oapi/v1?pretty=true",
    method: "GET",
    timeout: 10000,
    followRedirect: true,
    maxRedirects: 10
}, function(error, response, body) {
    console.log(body);
});


var options = {
    url: 'https://192.168.1.20:8443/oapi/v1/roles?pretty=true',
    headers: {
        'User-Authorization': 'Bearer ' + 'WWlnAxQyVwxPx0Ok3wgjoHXFtYlMiV0cvJO3yP1jO7w'
    }
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        //var info = JSON.parse(body);
        console.log(body);
    }
}

request(options, callback);