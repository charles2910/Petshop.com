const express = require('express');
const app = express();
const db = require ('couchDb');

async function addUser (user, res) {
    await db.addUser(user);
    res.send(user);
}

async function getUserEmail (email, res) {
    const user = await db.findUser(email);
    res.send(user);
}

async function addProduto(produto, res) {
    await db.addProduto(produto);
    res.send(produto);
}

async function findProduto(codigo, res) {
    const produto = await db.findProduto(codigo);
    res.send(produto);
}

async function findProdutos(inicio, qtd, filtro, tipo, res) {
    const lista = await db.findProdutos(inicio, qtd, filtro, tipo);
    res.send(lista);
}

async function buscaProduto(nome, res) {
    const lista = await db.buscaProduto(nome);
    res.send(lista);
}

async function addAgendamento(agendamento, res) {
    await db.addAgendamento(agendamento);
    res.send(agendamento);
}

async function findAgendamento(data, res) {
    const agendamento = await db.findAgendamento(data);
    res.send(agendamento);
}

async function addServico(servico, res) {
    await db.addServico(servico);
    res.send(servico);
}

async function getServicos(res) {
    const servicos = await db.getServicos();
    res.send(servicos);
}

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
    findProduto(req.params.id, res);
    return;
})

app.post('/api/estoque/:id', (req, res) => {
    addProduto(req.body, res);
    return;
})

app.put('/api/estoque/:id', (req, res) => {

})

app.delete('/api/estoque/:id', (req, res) => {

})

app.get('/api/usuarios', (req, res) => {

})

app.get('/api/usuarios/:id', (req, res) => {
    getUserEmail(req.params.id, res);
    return;
})

app.post('/api/usuarios/:id', (req, res) => {
    addUser(req.body, res);
    return;
})

app.put('/api/usuarios/:id', (req, res) => {

})

app.delete('/api/usuarios/:id', (req, res) => {

})

app.get('/api/agendamentos', (req, res) => {

})

app.get('/api/agendamentos/:id', (req, res) => {
    findAgendamento(req.params.id, res);
    return;
})

app.post('/api/agendamentos/:id', (req, res) => {
    addAgendamento(req.body, res);
    return;
})

app.put('/api/agendamentos/:id', (req, res) => {

})

app.delete('/api/agendamentos/:id', (req, res) => {

})

app.get('/api/servicos', (req, res) => {
    getServicos(res);
    return;
})

app.get('/api/servicos/:id', (req, res) => {

})

app.post('/api/servicos/:id', (req, res) => {
    addServico(req.body, res);
    return;
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
