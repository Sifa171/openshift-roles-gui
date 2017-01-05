/**
 * Created by meissner on 05.01.17.
 * A test to get the token
 */
var request = require("request");


request.post({
    url: 'http://localhost:8080/requestToken/',
   // headers: {'content-type' : 'application/x-www-form-urlencoded'},
    form: {
        username: 'developer',
        password: 'developer',
        server: '192.168.1.20:8443'
    }
}, function (error, response, body) {
    console.log(body);
});