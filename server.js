const express = require('express');
const app = express();
import * as db from 'server/couchDb.js';


app.use(express.json());

app.get('/', (req, res) => {
   res.sendFile(__dirname + '/HTML/' + 'index_completo.html');
   console.log("/ acessado");
})

app.get('/index.html', (req, res) => {
   res.sendFile(__dirname + '/HTML/' + 'index_completo.html');
   console.log("/index.html acessado");
})

app.get('/api/estoque', (req, res) => {

})

app.get('/api/estoque/:id', (req, res) => {

})

app.post('/api/estoque/:id', (req, res) => {

})

app.put('/api/estoque/:id', (req, res) => {

})

app.delete('/api/estoque/:id', (req, res) => {

})

app.get('/api/usuarios', (req, res) => {

})

app.get('/api/usuarios/:id', (req, res) => {

})

app.post('/api/usuarios/:id', (req, res) => {

})

app.put('/api/usuarios/:id', (req, res) => {

})

app.delete('/api/usuarios/:id', (req, res) => {

})

app.get('/api/agendamentos', (req, res) => {

})

app.get('/api/agendamentos/:id', (req, res) => {

})

app.post('/api/agendamentos/:id', (req, res) => {

})

app.put('/api/agendamentos/:id', (req, res) => {

})

app.delete('/api/agendamentos/:id', (req, res) => {

})

app.get('/api/servicos', (req, res) => {

})

app.get('/api/servicos/:id', (req, res) => {

})

app.post('/api/servicos/:id', (req, res) => {

})

app.put('/api/servicos/:id', (req, res) => {

})

app.delete('/api/servicos/:id', (req, res) => {

})

app.get('/*', (req, res) => {
   let path = decodeURI(req.path);
   res.sendFile(__dirname + path);
   console.log(`/${path} acessado`);
})

const server = app.listen(8081, '10.142.0.2', function () {
   const host = server.address().address
   const port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})
