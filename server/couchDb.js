const express = require('express');
const nano = require('nano')('http://admin:admin@localhost:5984');
const fs = require('fs')
const app = express();

async function criarDb() {
  const db_list = await nano.db.list();
  //await nano.db.destroy("estoque").catch();
  //await nano.db.destroy("usuarios").catch();
  //await nano.db.destroy("estoque").catch();
  //await nano.db.destroy("estoque").catch();
  if(db_list.indexOf("estoque")<0){
    await nano.db.create("estoque").catch();
    const estoque = nano.use("estoque");
    await carregarBancoDeDados(estoque)
  } 
  if(db_list.indexOf("usuarios")<0){
    await nano.db.create("usuarios").catch();
    const usuarios = nano.use("usuarios");
    await usuarios.insert({
        nome: "admin",
        email: "admin@admin.com",
        celular: "99999999999",
        telefone: "99999999999",
        nascimento: "2000-01-01",
        cpf: "99999999999",
        senha: "admin",
        endereco: "",
        cartao: "",
        admin: true
    },"admin@admin.com")

  }
  if(db_list.indexOf("servicos")<0) await nano.db.create("servicos").catch();
  if(db_list.indexOf("agendamentos")<0) await nano.db.create("agendamentos").catch();
}

async function carregarBancoDeDados(estoque){
    return new Promise(async(resolve)=>{
        let departamento = ["acessórios","alimentos","brinquedos","higiene","saúde"]
        for(let i = 0; i<5;i++){
            let jsonData = fs.readFileSync("produtos/"+departamento[i]+".json");
            let temp = JSON.parse(jsonData);
            for(let j=0; j<temp.length;j++){
                await estoque.insert(temp[j],temp[j].codigo);
            }
        }
        resolve(true);
    });
}

async function addUser(user){
    const usuarios = nano.use("usuarios");
    usuarios.get(user.email).then((headers)=>{
        return false
    }).catch(async ()=>{
        await usuarios.insert(user,user.email);
        return true
    });
}

async function findUser(email){
    const usuarios = nano.use("usuarios");
    let usuario;
    await usuarios.get(email).then((headers)=>{
        console.log("encontrou o usuario")
        usuario = headers;
    }).catch(()=>{
        console.log("não encontrou o usuario")
        usuario = (false);
    });
    return usuario;
}

async function addProduto(produto){
    const produtos = nano.use("produtos");
    produtos.get(produto.codigo).then((headers)=>{
        return false
    }).catch(async ()=>{
        await produtos.insert(produto,produto.codigo);
        return true
    });
}

async function findProduto(codigo){
    const produtos = nano.use("estoque");
    let produto;
    await produtos.get(codigo).then((headers)=>{
        console.log("achou o produto");
        produto = headers;
    }).catch(()=>{
        console.log("nao achou o produto");
        produto = false;
    });
    return produto;

}

async function findProdutos(inicio, qtd, filtro){

}

async function addAgendamento(agendamento){
    const agendamentos = nano.use("agendamentos");
    await agendamentos.insert(agendamento,agendamento.data);
    return true
}

async function findAgendamento(data){
    const agendamentos = nano.use("agendamentos");
    agendamentos.get(data).then((headers)=>{
        return headers
    }).catch(()=>{
        return false
    });
}

async function addServico(servico){
    const servicos = nano.use("servicos");
    servicos.get(servico.id).then((headers)=>{
        return false
    }).catch(async ()=>{
        await servicos.insert(servico,servico.id);
        return true
    });
}

async function getServicos(){
    let produto = await findProduto("a0cb");
    console.log(produto);
    const servicos = nano.use("estoque");
    servicos.list().then((body) => {
        body.rows.forEach((doc) => {
            //console.log(doc.doc);
        });
    });
}

criarDb();

app.get('/',(req,res)=>{
    res.send('Working...');
})

app.listen(3000,()=>{
    console.log("Running...");
})

getServicos();
