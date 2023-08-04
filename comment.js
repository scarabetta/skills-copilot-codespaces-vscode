// Create a web server that can respond to requests for /comments.json
// with a list of comments in JSON format. Assume comments is an array
// of comment objects, each with a "content" and a "date" property.

var http = require('http');
var url = require('url');
var comments = [{ content: "hello", date: "today" }];
var server = http.createServer(function (req, res) {
    var parsedUrl = url.parse(req.url, true);
    if (parsedUrl.pathname === "/comments.json") {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(comments));
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end("Not found");
    }
});
server.listen(8080);
