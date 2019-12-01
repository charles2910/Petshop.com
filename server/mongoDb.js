const mongoose = require("mongoose")
const fs = require('fs');
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

let estoque
let usuarios
let agendamentos
let servicos
let banners = new Banner();


async function conectarMongoDb(){
    return await new Promise ((resolve,reject)=>{
        mongoose.connect("mongodb://localhost/petshop",{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    });
}

function carregarBancoDeDados(){
    let i = 0;
    let departamento = ["acessórios","alimentos","brinquedos","higiene","saúde"]
    for(let i = 0; i<5;i++){
        let jsonData = fs.readFileSync("../produtos/"+departamento[i]+".json");
        let temp = JSON.parse(jsonData);
        for(let j=0; j<temp.length;j++){
            addProduto(temp[j]);
        }
    }
}

function initMongoDb(){
    conectarMongoDb();
    const produtoSchema = mongoose.Schema({
        _id: {type:  String, require: true},
        nomeComercial :  {type:  String, require: true},
        marca :  {type:  String, require: true},
        categoria:  {type:  String, require: true},
        departamento :  {type:  String, require: true},
        preco :   {type:  Number, require: true},
        precoPromocional :  {type:  Number, require: true},
        nomeCompleto :  {type:  String, require: true},
        codigo :  {type:  String, require: true},
        qtdEstoque :  {type:  Number, require: true},
        lote :  {type:  String, require: true},
        validade :  {type:  String, require: true},
        descricao :  {type:  String, require: true},
        promocao :  {type:  Boolean, require: true},
        imgPath :  {type:  String, require: true},
    })
    const usuarioSchema = mongoose.Schema({
    _id: {type:  String, require: true},
    nome :  {type:  String, require: true},
    email : {type:  String, require: true},
    celular : {type:  String, require: true},
    telefone :   {type:  String, require: true},
    nascimento : {type:  String, require: true},
    cpf : {type:  String, require: true},
    admin : {type:  Boolean, require: true},
    senha : {type:  String, require: true},
    endereco : {
        cep :  {type:  String, require: true},
        rua :  {type:  String, require: true},
        numero : {type:  String, require: true},
        bairro : {type:  String, require: true},
        complemento :  {type:  String, require: true},
        estado :  {type:  String, require: true},
        cidade :  {type:  String, require: true},
    },
    cartao : {
        nome : {type:  String},
        numero : {type:  String},
        validade : {type:  String},
        cvv : {type:  String},
    },
    pets : {type: mongoose.Schema.Types.Mixed},
    pedidos : {type: mongoose.Schema.Types.Mixed},
    carrinho : {type: mongoose.Schema.Types.Mixed}
    })
    const agendamentoSchema = mongoose.Schema({
        data: {type:  String, require: true},
        horarios: {type:  [String], require: true},
    })
    const servicoSchema = mongoose.Schema({
        id : {type:  String, require: true},
        dono : {type:  String, require: true},
        pet : {type:  String, require: true},
        tipo : {type:  String, require: true},
        data : {type:  String, require: true},
        hora : {type:  String, require: true},
        detalhes : {type:  String, require: true},
        preco : {type:  String, require: true},
        status : {type:  String, require: true}
    })
    estoque = mongoose.model('estoque',produtoSchema);
    usuarios = mongoose.model('usuarios',usuarioSchema);
    agendamentos = mongoose.model('agendamentos',agendamentoSchema);
    servicos = mongoose.model('servicos',servicoSchema);
    mongoose.connection.on('open', function (ref) {
    mongoose.connection.db.listCollections().toArray(function (err, names) {
        if(names.length === 0){
            carregarBancoDeDados();
        }
    });
    carregaBanners()
})
}

initMongoDb();

function addUsuario(usuario){
    const novoUsuario = mongoose.model("usuarios");
    new novoUsuario({
        _id: usuario.email,
       nome: usuario.nome,
       email:  usuario.email,
       celular:  usuario.celular,
       telefone:  usuario.telefone,
       nascimento:  usuario.nascimento,
       cpf:  usuario.cpf,
       admin:  usuario.admin,
       senha : usuario.senha,
       endereco : {
            cep :  usuario.endereco.cep,
            rua :  usuario.endereco.rua,
            numero : usuario.endereco.numero,
            bairro : usuario.endereco.bairro,
            complemento :  usuario.endereco.complemento,
            estado :  usuario.endereco.estado,
            cidade :  usuario.endereco.cidade
        },
        cartao : {
            nome : usuario.cartao.cep,
            numero : usuario.cartao.numero,
            validade : usuario.cartao.validade,
            cvv : usuario.cartao.cvv,
        },
        pets : usuario.pets,
        pedidos : usuario.pedidos,
        carrinho: usuario.carrinho
    }).save()
    .then(()=>{return true})
    .catch(()=>{return false});
}

function addProduto(produto) {
    const novoProduto = mongoose.model("estoque");
    new novoProduto({
        _id: produto.codigo,
        nomeComercial: produto.nomeComercial,
        marca: produto.marca,
        categoria: produto.categoria,
        departamento: produto.departamento,
        preco: produto.preco,
        precoPromocional: produto.precoPromocional,
        nomeCompleto: produto.nomeCompleto,
        codigo: produto.codigo,
        qtdEstoque: produto.qtdEstoque,
        lote: produto.lote,
        validade: produto.validade,
        descricao: produto.descricao,
        promocao: produto.promocao,
        imgPath: produto.imgPath
    }).save()
        .then(() => { return true; })
        .catch(() => { return false; });
}

function addAgendamento(agendamento){
    const novoAgendamento = mongoose.model("agendamentos");
    new novoAgendamento({
        data: agendamento.data,
        horarios: agendamento.horarios
    }).save()
    .then(()=>{return true})
    .catch(()=>{return false});
}

function addServico(servico){
    const novoServico = mongoose.model("servicos");
    new novoServico({
        id : servico.id,
        dono : servico.dono,
        pet : servico.pet,
        tipo : servico.tipo,
        data : servico.data,
        hora : servico.hora,
        detalhes : servico.detalhes,
        preco : servico.preco,
        status : servico.status
    }).save()
    .then(()=>{return true})
    .catch(()=>{return false});
}

function findProduto(inicio,qtd,filtro){
    if(filtro === undefined){
        filtro = ()=>{return true};
    }
    let qtdProdutos = 0;
    let pos=0;
    let resultado=[];
    estoque.find({}, function (err, docs) {
        for(let i=0; i<docs.length;i++){
            if(filtro(docs[i])){
                if(pos>=inicio){
                    pos++;
                    qtdProdutos++;
                    resultado.push(docs[i]);
                    if(qtdProdutos>= qtd){
                        return resultado;
                    }
                }else{
                    pos++;
                }
            }
        }
        return resultado;
    });
}

async function carregaBanners(){
        estoque.find({'promocao': true}, function (err, promocoes) {
        promocoes.sort(compare);
            for(let i = 0; i < promocoes.length; i++){
                if(promocoes[i].departamento =="alimentos" &&  banners.alimentos.length <12){
                    banners.alimentos.push(promocoes[i]);
                }else if(promocoes[i].departamento =="higiene" &&  banners.higiene.length <12){
                    banners.higiene.push(promocoes[i]);
                }else if(promocoes[i].departamento =="acessórios" &&  banners.acessorios.length <12){
                    banners.acessorios.push(promocoes[i]);
                }else if(promocoes[i].departamento =="brinquedos" &&  banners.brinquedos.length <12){
                    banners.brinquedos.push(promocoes[i]);
                }else if(promocoes[i].departamento =="saúde" &&  banners.saude.length <12){
                    banners.saude.push(promocoes[i]);
                }
                if(promocoes[i].categoria =="cachorros" &&  banners.cachorros.length <12){
                    banners.cachorros.push(promocoes[i]);
                }else if(promocoes[i].categoria =="gatos" &&  banners.gatos.length <12){
                    banners.gatos.push(promocoes[i]);
                }else if(promocoes[i].categoria =="passáros" &&  banners.passaros.length <12){
                    banners.passaros.push(promocoes[i]);
                }else if(promocoes[i].categoria =="peixes" &&  banners.peixes.length <12){
                    banners.peixes.push(promocoes[i]);
                }else if(promocoes[i].categoria =="roedores" &&  banners.roedores.length <12){
                    banners.roedores.push(promocoes[i]);
                }
                if(banners.geral1.length <10){
                    banners.geral1.push(promocoes[i]);
                }
            }
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

function filtroLista(produto){
    if(lista.filtroMarca.length !== 0){
        if(!lista.filtroMarca.includes(produto.marca)){
            return false;
        }
    }
    if(lista.filtroPreco.length !== 0){
        let cont = 0;
        for(let i =0; i<lista.filtroPreco.length;i+=2){
            if(produto.preco < lista.filtroPreco[i] || produto.preco > lista.filtroPreco[i+1]){
                cont++;
            }
        }
        if(cont === lista.filtroPreco.length/2){
            return false
        }
    }
    if(lista.filtroTipo.length !== 0){
        if(lista.tipo === "categoria"){
            if(!lista.filtroTipo.includes(produto.departamento)){
                return false;
            }
        }else{
            if(!lista.filtroTipo.includes(produto.categoria)){
                return false;
            }
        }
    }
    return true;
}

findProduto(2,2,(produto)=>{
    if(produto.preco>30 && produto.preco<37){
        return true;
    }
});

