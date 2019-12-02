//necessário apenas para teste
    const express = require('express');
    const app = express();
//------------------------------------
const nano = require('nano')('http://admin:admin@localhost:5984');
const fs = require('fs')

class Banner{
    constructor(){
        this.cachorros=[];
        this.gatos=[];
        this.roedores=[];
        this.passaros=[];
        this.peixes=[];
        this.brinquedos=[];
        this.saude=[];
        this.alimentos=[];
        this.higiene=[];
        this.acessorios=[];
        this.geral1=[];
        this.geral2=[];
        this.geral3=[];
    }
}

const banners = new Banner();

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
  await carregarBanners();
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
    let retorno;
    await usuarios.get(user.email).then((headers)=>{
        retorno = false
    }).catch(async ()=>{
        await usuarios.insert(user,user.email);
        retorno = true
    });
    return retorno;
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
    let retorno;
    await produtos.get(produto.codigo).then((headers)=>{
        retorno =  false
    }).catch(async ()=>{
        await produtos.insert(produto,produto.codigo);
        retorno = true
    });
    return retorno;
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
    let retorno;
    await agendamentos.get(data).then((headers)=>{
        retorno = headers
    }).catch(()=>{
        retorno = false
    });
    return retorno;
}

async function addServico(servico){
    const servicos = nano.use("servicos");
    let retorno;
    await servicos.get(servico.id).then((headers)=>{
        retorno = false
    }).catch(async ()=>{
        await servicos.insert(servico,servico.id);
        retorno = true
    });
    return retorno;
}

async function getServicos(){
    const servicos = nano.use("servicos");
    let todosServicos = [];
    let body = await servicos.list();
    for(const id of body.rows){
        let servico = await servicos.get(id.id);
        todosServicos.push(servico);
    }
    return todosServicos;
}

async function carregarBanners(){
    return new Promise( async(resolve)=> {
        const estoque = nano.use("estoque");
        const promocoes = []
        body = await estoque.view('view', 'view', {
            'key': [1,true]
        })
        body.rows.forEach((doc) => {
            promocoes.push(doc.value);
        });
        promocoes.sort(compare);
        promocoes.forEach((produto)=>{
            const categoria = produto.categoria.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const departamento = produto.departamento.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            if(banners[departamento].length < 12) banners[departamento].push(produto);
            if(banners[categoria].length < 12) banners[categoria].push(produto);
        });
        promocoes.sort(compare1);
        banners.geral2 = promocoes.slice(0,10);
        promocoes.sort(compare2);
        let i=0;
        while(banners.geral3.length < 10){
            if(promocoes[i].qtdEstoque !==0 && i<= promocoes.length){
                banners.geral3.push(promocoes[i]);
            }
            i++;
        }
        resolve(true);
    });
}

function compare(a,b){//Ordena pela % do precao
    return b.precoPromocional-a.precoPromocional;
}

function compare1(a,b){//ordena pelo desconto real
    return   ((b.preco) - (b.preco) *((100-b.precoPromocional)/100)) - (a.preco - (a.preco)*((100-a.precoPromocional)/100));
}

function compare2(a,b){//Ordena pela quantidade em estoque
    return a.qtdEstoque - b.qtdEstoque;
}
//Apenas para teste, parte a ser removida
    criarDb();
    app.listen(3000,()=>{
        console.log("Running...");
    })
//---------------------------------------