var express = require('express');
var request = require('request');
var commander = require('commander');
var url = require('url');
var app = express();

console.log("HProxy Initing.......");

commander.version('0.1.0');
commander.option('-p, --port <n>', 'listen port', parseInt);
commander.parse(process.argv);

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

console.log('HProxy will listen in %j port.', (commander.port || process.env.PORT || 5000));
app.listen(commander.port || process.env.PORT || 5000);

console.log("HProxy Inited!");
console.log("HProxy Running....");
