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
    
    var rs = fs.createReadStream(filename);

    rs.on('data', function(data) {
	response.write(data);
    });
    rs.on('close', function() {
	response.end();
    });
    rs.on('error', function(error) {
	console.log('error:' + error);
    });

}).listen(8080, function () {
    console.log('Access Boids simulation at http://localhost:8080/index.html');
});
