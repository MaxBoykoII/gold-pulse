var http = require('http'),
  path = require('path'),
  express = require('express'),
  app = express(),
  server = http.createServer(app),
  request = require('request'),
  baseUrl = 'https://www.goldminerpulse.com/_demo/dvex-api.php?';

app.use(express.static(path.resolve(__dirname, 'client')));

app.get('/api', function(req, res) {
  var m = req.query.m,
    query = 'm=' + m,
    requestUrl = baseUrl + query;

  request({
    "uri": requestUrl,
    "method": "GET"
  }, function(err, response, body) {
    if (err) {
      console.log(err);
    }
    body = JSON.parse(body);
    res.json({
      body: body
    });
  });

});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0");
