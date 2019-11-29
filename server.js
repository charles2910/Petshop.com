var express = require('express');
var app = express();

app.get('/', function (req, res) {
   res.sendFile(__dirname + '/HTML/' + 'index_completo.html');
   console.log("/ acessado");
})

app.get('/index.html', function (req, res) {
   res.sendFile(__dirname + '/HTML/' + 'index_completo.html');
   console.log("/index.html acessado");
})

app.get('/*', function (req, res) {
   res.sendFile(__dirname + req.path);
   console.log(`/${req.path} acessado`);
})

var server = app.listen(8081, '10.142.0.2', function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
