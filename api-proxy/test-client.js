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
        'Authorization': 'Bearer ' + 'IIJ_DNe5Mi_lpTEmLwFWbL31JcsAalUqLaWfaklXb4I'
    }
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log('success');
        //var info = JSON.parse(body);
        console.log(body);
    } else {
        console.log("Error with status " + response.statusCode);
        console.log(error);
        console.log(body);
    }
}

request(options, callback);