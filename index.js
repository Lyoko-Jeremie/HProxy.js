
var express = require('express');
var request = require('request');
var url = require('url');
var app = express();

console.log("HProxy Initing.......");

app.all('*', function (req, res) {
  var originUrl = req.header('origin-url');

  console.log('HProxy proxy: ' + originUrl);
  
  if (!originUrl) {
    res.end('H');
    return;
  }

  var target = url.parse(originUrl);
  var headers = req.headers;
  headers.host = target.host;
  request({
    method: req.method,
    url: originUrl,
    headers: headers
  }).pipe(res);
});

app.listen(process.env.PORT || 5000);

console.log("HProxy Inited!");
console.log("HProxy Running....");
