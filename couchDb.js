const nano = require('nano')('http://admin:admin@localhost:5984')
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

class Lista{
    constructor(nome,tipo,filtro,banner,itens,qtdTotalPaginas,pag){
    this.qtdTotalPaginas = qtdTotalPaginas;
    this.tipo = tipo;
    this.nome = nome;
    this.banner = banner;
    this.itens = itens;
    this.filtro = filtro;
    this.bannerPos = 0;
    this.pag = pag;
    }
}

const banners = new Banner();

<<<<<<< HEAD:couchDb.js
 async function criarDb() {
=======
async function criarDb() {
>>>>>>> Restruturação do código do servidor pra tornar a tabela de roteamento mais fácil, novas funções da API que estão encapsuladas em node_modules/api.js:server/couchDb.js
  const db_list = await nano.db.list();
  //await nano.db.destroy("estoque").catch();
  //await nano.db.destroy("usuarios").catch();
  //await nano.db.destroy("servicos").catch();
  //await nano.db.destroy("agendamentos").catch();
  if(db_list.indexOf("estoque")<0){
    await nano.db.create("estoque").catch();
    const estoque = nano.use("estoque");
    await carregarBancoDeDados(estoque).catch()
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

<<<<<<< HEAD:couchDb.js
 async function carregarBancoDeDados(estoque){
=======
async function carregarBancoDeDados(estoque){
>>>>>>> Restruturação do código do servidor pra tornar a tabela de roteamento mais fácil, novas funções da API que estão encapsuladas em node_modules/api.js:server/couchDb.js
    return new Promise(async(resolve)=>{
        let departamento = ["acessórios","alimentos","brinquedos","higiene","saúde"]
        for(let i = 0; i<5;i++){
            let jsonData = fs.readFileSync("produtos/"+departamento[i]+".json");
            let temp = JSON.parse(jsonData);
            for(let j=0; j<temp.length;j++){
                await estoque.insert(temp[j],temp[j].codigo).catch();
            }
        }
        resolve(true);
    });
}

<<<<<<< HEAD:couchDb.js
 async function addUser(user){
=======
async function addUser(user){
>>>>>>> Restruturação do código do servidor pra tornar a tabela de roteamento mais fácil, novas funções da API que estão encapsuladas em node_modules/api.js:server/couchDb.js
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

<<<<<<< HEAD:couchDb.js
 async function updateUser(user){
=======
async function updateUser(user){
>>>>>>> Restruturação do código do servidor pra tornar a tabela de roteamento mais fácil, novas funções da API que estão encapsuladas em node_modules/api.js:server/couchDb.js
    const usuarios = nano.use("usuarios");
    let retorno;
    await usuarios.get(user.email).then(async (headers)=>{
        console.log(headers._rev);
        await usuarios.insert({user,_id: user.email, _rev: headers._rev});
        retorno = true
    }).catch(async ()=>{
        console.log("usuario não existe");
        retorno = false;
    });
    return retorno;
}

<<<<<<< HEAD:couchDb.js
 async function findUser(email){
=======
async function findUser(email){
>>>>>>> Restruturação do código do servidor pra tornar a tabela de roteamento mais fácil, novas funções da API que estão encapsuladas em node_modules/api.js:server/couchDb.js
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

<<<<<<< HEAD:couchDb.js
 async function addProduto(produto){
=======
async function addProduto(produto){
>>>>>>> Restruturação do código do servidor pra tornar a tabela de roteamento mais fácil, novas funções da API que estão encapsuladas em node_modules/api.js:server/couchDb.js
    const produtos = nano.use("estoque");
    let retorno;
    await produtos.get(produto.codigo).then((headers)=>{
        retorno =  false
    }).catch(async ()=>{
        await produtos.insert(produto,produto.codigo);
        retorno = true
    });
    return retorno;
}

<<<<<<< HEAD:couchDb.js
 async function updateProduto(produto){
=======
async function updateProduto(produto){
>>>>>>> Restruturação do código do servidor pra tornar a tabela de roteamento mais fácil, novas funções da API que estão encapsuladas em node_modules/api.js:server/couchDb.js
    const estoque = nano.use("estoque");
    let retorno;
    await estoque.get(produto.codigo).then(async (headers)=>{
        console.log(headers._rev);
        await estoque.insert({produto,_id: produto.codigo, _rev: headers._rev});
        retorno = true
    }).catch(async ()=>{
        console.log("produto não existe");
        retorno = false;
    });
    return retorno;
}

<<<<<<< HEAD:couchDb.js
 async function removeProduto(produto){
=======
async function removeProduto(produto){
>>>>>>> Restruturação do código do servidor pra tornar a tabela de roteamento mais fácil, novas funções da API que estão encapsuladas em node_modules/api.js:server/couchDb.js
    const produtos = nano.use("estoque");
    let retorno;
    await produtos.get(produto.codigo).then(async(headers)=>{
        await produtos.destroy(produto.codigo,headers._rev);
        console.log("produto removido");
        retorno =  true
    }).catch(async ()=>{
        console.log("produto não existe");
        retorno = false
    });
    return retorno;
}

<<<<<<< HEAD:couchDb.js
 async function findProduto(codigo){
=======
async function findProduto(codigo){
>>>>>>> Restruturação do código do servidor pra tornar a tabela de roteamento mais fácil, novas funções da API que estão encapsuladas em node_modules/api.js:server/couchDb.js
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
// filtro 1 = departamento, 2 = categoria
//nome é ou o departamento ou a categoria em especifico que se quer buscar
//inicio é qual pagina será carregada
<<<<<<< HEAD:couchDb.js
 async function findProdutos(inicio, filtro, nome){
=======
async function findProdutos(inicio, filtro, nome){
>>>>>>> Restruturação do código do servidor pra tornar a tabela de roteamento mais fácil, novas funções da API que estão encapsuladas em node_modules/api.js:server/couchDb.js
    const estoque = nano.use("estoque");
    const produtos = [];
    let qtdTotalpaginas = 0;
    filtro++;
    body = await estoque.view('view', 'view', {
        'key': [filtro,nome]
    })
    if(body.rows.length%16 == 0){
        qtdTotalpaginas = (body.rows.length/16);
    }else{
        qtdTotalpaginas = ((body.rows.length-(body.rows.length%16))/16)+1;
    }
    for(let i=0;i<body.rows.length;i++){
        if(i>=(inicio*16) && produtos.length < 16){
            produtos.push(body.rows[i].value);
        }
        if(produtos.length >= 16){
            break;
        }
    }
    let tipo;
    if(filtro==1){
        tipo = "departamento";
    }else{
        tipo = "categoria";
    }
    return new Lista(nome,tipo,filtro-1,banners[nome],produtos,qtdTotalpaginas,inicio);
}

<<<<<<< HEAD:couchDb.js
 async function buscaProduto(inicio,txt){
=======
async function buscaProduto(inicio,txt){
>>>>>>> Restruturação do código do servidor pra tornar a tabela de roteamento mais fácil, novas funções da API que estão encapsuladas em node_modules/api.js:server/couchDb.js
    if(txt!=undefined){
        const estoque = nano.use("estoque");
        body = await estoque.view('view', 'view');
        const retorno = [];
        txt = txt.toLowerCase();
        txt = txt.split(" ");
        body.rows.forEach((produto)=>{
            txt.forEach((palavra)=>{
                let txtProduto = produto.value.nomeCompleto + " "
                                 produto.value.preco +" "
                                 produto.value.precoPromocional +" "
                                 produto.value.marca +" "
                                 produto.descricao;
                if(txtProduto.includes(palavra)){
                    retorno.push(produto.value);
                    return;
                }
            });
        });
        return retorno;
    }
}

<<<<<<< HEAD:couchDb.js
 async function addAgendamento(agendamento){
=======
async function addAgendamento(agendamento){
>>>>>>> Restruturação do código do servidor pra tornar a tabela de roteamento mais fácil, novas funções da API que estão encapsuladas em node_modules/api.js:server/couchDb.js
    const agendamentos = nano.use("agendamentos");
    await agendamentos.insert(agendamento,agendamento.data);
    return true
}

<<<<<<< HEAD:couchDb.js
 async function findAgendamento(data){
=======
async function findAgendamento(data){
>>>>>>> Restruturação do código do servidor pra tornar a tabela de roteamento mais fácil, novas funções da API que estão encapsuladas em node_modules/api.js:server/couchDb.js
    const agendamentos = nano.use("agendamentos");
    let retorno;
    await agendamentos.get(data).then((headers)=>{
        retorno = headers
    }).catch(()=>{
        retorno = false
    });
    return retorno;
}

<<<<<<< HEAD:couchDb.js
 async function addServico(servico){
=======
async function addServico(servico){
>>>>>>> Restruturação do código do servidor pra tornar a tabela de roteamento mais fácil, novas funções da API que estão encapsuladas em node_modules/api.js:server/couchDb.js
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

<<<<<<< HEAD:couchDb.js
 async function updateServico(servico){
=======
async function updateServico(servico){
>>>>>>> Restruturação do código do servidor pra tornar a tabela de roteamento mais fácil, novas funções da API que estão encapsuladas em node_modules/api.js:server/couchDb.js
    const servicos = nano.use("servicos");
    let retorno;
    await servicos.get(servico.id).then(async (headers)=>{
        console.log(headers._rev);
        await servicos.insert({servico,_id: servico.id, _rev: headers._rev});
        retorno = true
    }).catch(async ()=>{
        console.log("servico não existe");
        retorno = false;
    });
    return retorno;
}

<<<<<<< HEAD:couchDb.js
 async function getServicos(){
=======
async function getServicos(){
>>>>>>> Restruturação do código do servidor pra tornar a tabela de roteamento mais fácil, novas funções da API que estão encapsuladas em node_modules/api.js:server/couchDb.js
    const servicos = nano.use("servicos");
    let todosServicos = [];
    let body = await servicos.list();
    for(const id of body.rows){
        let servico = await servicos.get(id.id);
        todosServicos.push(servico);
    }
    return todosServicos;
}

<<<<<<< HEAD:couchDb.js
 async function carregarBanners(){
=======
async function carregarBanners(){
>>>>>>> Restruturação do código do servidor pra tornar a tabela de roteamento mais fácil, novas funções da API que estão encapsuladas em node_modules/api.js:server/couchDb.js
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
        banners.geral1 = promocoes.slice(0,10);
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

<<<<<<< HEAD:couchDb.js
 function getBanner(nome){
     console.log(banners)
=======
function getBanner(nome){
>>>>>>> Restruturação do código do servidor pra tornar a tabela de roteamento mais fácil, novas funções da API que estão encapsuladas em node_modules/api.js:server/couchDb.js
    if(nome!== "geral"){
        return banners[nome];
    }else{
        return [banners.geral1,banners.geral2,banners.geral3];
    }
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
<<<<<<< HEAD:couchDb.js

module.exports = {
    addAgendamento: addAgendamento,
    addProduto: addProduto,
    addServico: addServico,
    addUser: addUser,
    buscaProduto: buscaProduto,
    criarDb: criarDb,
    findAgendamento: findAgendamento,
    findProduto: findProduto,
    findProdutos: findProdutos,
    findUser: findUser,
    getBanner: getBanner,
    getServicos: getServicos,
    removeProduto: removeProduto,
    updateProduto: updateProduto,
    updateServico: updateServico,
    updateUser: updateUser
}
=======
>>>>>>> Restruturação do código do servidor pra tornar a tabela de roteamento mais fácil, novas funções da API que estão encapsuladas em node_modules/api.js:server/couchDb.js
