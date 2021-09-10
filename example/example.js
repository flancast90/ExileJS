const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const server = http.createServer(app);
const exile = require('./exilejs');
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/')); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/test.html');
});

app.post('/exile', function (req, res) {
  var fingerprint = req.body.fingerprint;
  if (exile.check(fingerprint)=="banned") {
    console.log("Blocked user "+fingerprint+" is trying to connect.");
    res.status(403).send();
  }else{
    console.log(""+fingerprint+" just connected");
    res.status(200).send();
  }
});

server.listen(8081, function () {
  console.log(`Listening on ${server.address().port}`);
});
