const express = require('express');
const app = express();
const api = require('api');
const db = require('couchDb')
//db.destruirDb();
db.criarDb();
app.use(express.json());
app.get('/', (req, res) => {
   res.sendFile(__dirname + '/HTML/' + 'index_completo.html');
   console.log("/ acessado");
})

app.get('/index.html', (req, res) => {
   res.sendFile(__dirname + '/HTML/' + 'index_completo.html');
   console.log("/index.html acessado");
})
//FUNCIONANDO POREM PODE MUDAR PARA TORNAR O CÓDIGO MAIS LIMPO=============================
app.get('/api/bannersPrincipal',(req,res)=>{
    res.send(db.getBanner("geral"));
})

app.get('/api/compra',(req,res)=>{
    api.findProduto(req.query.id,res);
})

app.get('/api/estoque', async (req, res) => {
    let produtos = await db.findProdutos(req.query.init,req.query.filtro,req.query.nome);
    res.send(produtos);
})

app.post('/api/estoque', async (req, res) => {
    let produtos = await db.addProduto(req.body);
    res.send(produtos);
})

app.put('/api/estoque', async (req, res) => {
    let produtos = await db.updateProduto(req.body);
    res.send(produtos);
})

app.put('/api/estoque/delete', async (req, res) => {
    let produtos = await db.removeProduto(req.query.id);
    res.send(produtos);
})

app.put('/api/login', async (req, res) => {
    res.send(await db.validaLogin(req.body.email,req.body.senha));
})

app.post('/api/cadastro', async (req, res) => {
    console.log(req.body);
    res.send(await db.addUser(req.body));
})

app.put('/api/cadastro', async (req, res) => {
    res.send(await db.updateUser(req.body));
})

app.get('/api/busca', async (req, res) => {
    let produtos = await db.buscaProduto(req.query.init,req.query.search);
    res.send(produtos);
})

app.get('/api/agendamentos', async (req, res) => {
    let produtos = await db.findAgendamento(req.query.data);
    res.send(produtos);
})

app.post('/api/servicos', async (req, res) => {
    let produtos = await db.addServico(req.body);
    res.send(produtos);
})

app.post('/api/agenda', async (req, res) => {
    let produtos = await db.addAgendamento(req.body);
    res.send(produtos);
})
//==========================================================================================

app.get('/api/estoque/:id', (req, res) => {
    api.findProduto(req.params.id, res);
    return;
})

app.post('/api/estoque/:id', (req, res) => {
    api.addProduto(req.body, res);
    return;
})

app.put('/api/estoque/:id', (req, res) => {
    api.updateProduto(req.body, res);
    return;
})

app.delete('/api/estoque/:id', (req, res) => {
    api.removeProduto(req.body, res);
    return;
})

app.get('/api/usuarios/:id', (req, res) => {
    api.findUser(req.params.id, res);
    return;
})

app.post('/api/usuarios/:id', (req, res) => {
    api.addUser(req.body, res);
    return;
})

app.put('/api/usuarios/:id', (req, res) => {
    api.updateUser(req.body, res);
    return;
})

app.delete('/api/usuarios/:id', (req, res) => {

})

app.get('/api/agendamentos', (req, res) => {

})

app.get('/api/agendamentos/:id', (req, res) => {
    api.findAgendamento(req.params.id, res);
    return;
})

app.post('/api/agendamentos/:id', (req, res) => {
    api.addAgendamento(req.body, res);
    return;
})

app.put('/api/agendamentos/:id', (req, res) => {

})

app.delete('/api/agendamentos/:id', (req, res) => {

})

app.get('/api/servicos', (req, res) => {
    api.getServicos(res);
    return;
})

app.get('/api/servicos/:id', (req, res) => {
    api.getServico(req.params.id, res);
    return;
})

app.post('/api/servicos/:id', (req, res) => {
    api.addServico(req.body, res);
    return;
})

app.put('/api/servicos/:id', (req, res) => {
    api.updateServico(res);
    return;
})

app.delete('/api/servicos/:id', (req, res) => {

})

app.get('/*', (req, res) => {
   let path = decodeURI(req.path);
   res.sendFile(__dirname + path);
   console.log(`/${path} acessado`);
})

const server = app.listen(8082,'10.142.0.2',function () {
   const host = server.address().address
   const port = server.address().port
   console.log("Example app listening at http://:%s", port)
})
