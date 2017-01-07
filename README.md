# openshift-roles-gui
This is a GUI for OpenShift roles

![OCSP Roles Management Login](https://github.com/Sifa91/openshift-roles-gui/blob/master/doc/oscp_rm_login.png)

## api-proxy
This is a node.js program which acts as webserver for the gui and as proxy to the OpenShift API
To use the api-proxy simply start it with ``node server.js``which starts the server on http://localhost:8080/
If you open the url in a browser you can use the roles gui.

### Getting a token from an OpenShift 3 Username
Sending a POST-Request with username, password and server you can get a json object with your token.
username and password are your OpenShift User and Password
server is the hostname:port of your openshift server. For example ose-cluster.example.com:8443
If successful the api-server will return a json object like this obne:
```
{
   "data":{
      "userToken":"2a7zPsqd4g7nY7DA7WFz_Ey8R1nqqmOxiij6XL6Ojig"
   },
   "error":false
}
```
There is a simple node.js example in ``api-proxy/proxytest-token.js`` which demonstrates this api.

### Using the proxy to access an OpenShift 3 API
In order to reach servers which are on different domains than the roles gui (which uses ajax) there is a simple api-proxy function. (Which does not proxy WebSocket at the moment)
There is a simple example in ``api-proxy/proxytest-client.js``
#### Example
If you want to access the following api ``https://ose-cluster.example.com:8443/oapi/v1/roles`` you can use the api-proxy with the URL ``http://localhost:8080/api-proxy/oapi/v1/roles?_server=ose-cluster.example.com:8443`` to access your OpenShift 3 server.