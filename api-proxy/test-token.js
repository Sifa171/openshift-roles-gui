/**
 * Created by meissner on 05.01.17.
 * A test to get the token
 */
var request = require("request");

// Enable unsecure/self signed certificates
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var username = 'developer',
    password = 'developer',
    url = 'https://' + username + ':' + password + '@192.168.1.20:8443/oauth/authorize?client_id=openshift-challenging-client&response_type=token';

request({url: url}, function (error, response, body) {
    // Quick & dirty method to parse the access_token
    var redirectUrl = response.request.href;
    var accessToken = redirectUrl.substring(redirectUrl.indexOf("access_token=")+13, redirectUrl.indexOf("&"));
    console.log(accessToken);
});