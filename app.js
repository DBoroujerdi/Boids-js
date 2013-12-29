/**
 * @author daniel
 */
var fs = require('fs'), 
    http = require('http'),
    url = require("url"),  
    path = require("path");  

http.createServer(function (request, response) {
    var uri = url.parse(request.url).pathname;
    var filename = path.join(process.cwd(), uri);
    
    fs.createReadStream(filename).pipe(response);

}).listen(8080, function () {
    console.log('Access Boids simulation at http://localhost:8080/index.html');
});
