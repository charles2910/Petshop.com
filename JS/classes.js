class Cliente{
    constructor(nome, email, celular,telefone,nascimento,cpf,senha,endereco,cartao,admin,pets,pedidos,carrinho){
        this.nome = nome;
        this.email = email;
        this.celular = celular;
        this.telefone = telefone;
        this.nascimento = nascimento;
        this.cpf = cpf;
        this.admin = admin;
        this.senha = senha;
        this.endereco = endereco;
        this.cartao = cartao;
        this.pets = pets;
        this.pedidos = pedidos;
        this.carrinho = carrinho;
    }
    addPet(pet){
        this.pets.push(pet);
        logged = this;
        AJAX_geralPUT(`http://trabweb.ddns.net:8082/api/usuarios/${this.email}`, this);
    }
    addPedido(pedido){
        logged = this;
        this.pedidos.push(pedido);
    }
    addCarrinho(produto){
        logged = this;
        this.carrinho.push(produto);
    }

    attPet(pet){
        console.log(pet);
        for(let i=0; i< this.pets.length;i++){
            if(this.pets[i].nome === pet.nome){
                this.pets.splice(i,1);
                this.pets.push(pet);
                break;
            }
        }
    }
}

class Endereco{
    constructor(cep,rua,numero,bairro,complemento,estado,cidade){
        this.cep = cep;
        this.rua = rua;
        this.numero = numero;
        this.bairro = bairro;
        this.complemento = complemento;
        this.estado = estado;
        this.cidade = cidade;
    }
}

class Pagamento{
    constructor(nome,numero,validade,cvv){
        this.nome = nome;
        this.numero = numero;
        this.validade = validade;
        this.cvv = cvv;
    }
}

class Pet{
    constructor(nome,tipo,raca,idade,peso,sexo,servicos){
        this.nome = nome;
        this.tipo = tipo
        this.raca = raca;
        this.idade = idade;
        this.peso = peso;
        this.sexo = sexo;
        this.servicos= servicos;
    }
    addServicos(servico){
        this.servicos.push(servico);
    }
    async function petToHtml(){
        let txt =    "<h2>"+this.nome+"</h2><hr>";
            txt +=   '<div class="dados_pet">';
            txt +=       "<p>Tipo: "+this.tipo+"</p>";
            txt +=       "<p>Raça: "+this.raca+"</p>";
            txt +=       "<p>Sexo: "+this.sexo+"</p>";
            txt +=       "<p>Idade: "+this.idade+"</p>";
            txt +=       "<p>Peso: "+this.peso+"</p>";
            txt +=       "<button onclick=\"servicoPet(true,"+"\'id_"+this.nome+"\');\">Serviços</button>";
            txt +=   "</div>";
            txt +=   "<div class = 'servicos_desc' id="+"id_"+this.nome+">";
            txt +=   '<div class="titulo_serv">';
            txt +=      "<h2>Serviços</h2>";
            txt +=      '<input onclick=\"servicoPet(false,\''+'id_'+this.nome+'\');\" type="image" src="http://trabWeb.ddns.net:8082/IMAGES/ICONS/fechar.png">';
            txt +=      "</div><hr>";
        for(let i =0; i <this.servicos.length;i++){
            let servico = await AJAX_geral(`http://trabweb.ddns.net:8082/api/servicos/${this.servicos[i]}`);
                console.log(servico);
            txt += jsonToServico(servico).toHtmlCliente();
        }
            txt +=   "</div>";
        return txt;
    }
}

class Servico{
    constructor(id,dono,tipo,pet,data,hora,detalhes,preco,status){
        this.id = id;
        this.dono = dono;
        this.pet = pet;
        this.tipo = tipo;
        this.data = data;
        this.hora = hora;
        this.detalhes = detalhes;
        this.preco = preco;
        this.status = status;
    }

    toHtmlCliente(){
        console.log(this.id);
        let txt = '<div class="servicos_pet">';
            txt+= '<h3>Serviço '+this.id+'</h3><hr>';
            txt+= '<div class="desc_servico">';
            txt+= ' <p>Nome: '+this.tipo+'</p>';
            txt+=        '<p>Preço: R$ '+this.preco+'</p>';
            txt+=        '<p>Data: '+dateToNormalDate(this.data)+", "+this.hora+""+'</p>';
            txt+=        '<p>Status: '+this.status+'</p>';
            txt+=    '</div>';
            txt+= '</div>';
            return txt;
    }
}

class Produto{
    constructor(nomeComercial,marca,categoria,departamento,preco,precoPromocional,nomeCompleto,codigo,qtdEstoque,lote,validade,descricao,promocao,img){
        this.nomeComercial = nomeComercial;
        this.marca = marca;
        this.categoria = categoria;
        this.departamento = departamento;
        this.preco = preco;
        this.precoPromocional = precoPromocional;
        this.nomeCompleto = nomeCompleto;
        this.codigo = codigo;
        this.qtdEstoque = qtdEstoque;
        this.lote = lote;
        this.validade = validade;
        this.descricao = descricao;
        this.promocao = promocao;
        this.imgPath = img;
    }

    toProdutoHtml(){
        let txt;
        if(this.qtdEstoque !== 0){
            if(this.codigo !== "null"){
                txt = '<div id="'+this.codigo+'" class="produto" onclick=navegar'+'Compra("'+this.codigo+'")>';
            }else{
                txt = '<div id="'+this.codigo+'" class="produto">';
            }
            txt +=  '<img src="'+this.imgPath+'"/>';
            txt +=  '<h3>'+this.nomeComercial+'</h3>';
            if(this.promocao){
                txt +=  '<h5>De <del>'+this.preco+'</del> por: </h5>';
                txt +=  '<h4>R$ '+(this.preco*((100-this.precoPromocional)/100)).toFixed(2)+'</h4>';
            }else{
                txt +=  '<h5>Por apenas:</h5>';
                txt +=  '<h4>R$ '+this.preco+'</h4>';
            }
            txt +=  '</div>';
        }else{
            txt = '<div id="'+this.codigo+'" class="produto esgotado" onclick=navegar'+'Compra("'+this.codigo+'")>';
            txt +=  '<img src="'+this.imgPath+'"/>';
            txt +=  '<h3>'+this.nomeComercial+'</h3>';
            if(this.promocao){
                txt +=  '<h5> ESGOTADO </h5>';
                txt +=  '<h4><del>R$ '+(this.preco*((100-this.precoPromocional)/100)).toFixed(2)+'</del></h4>';
            }else{
                txt +=  '<h5> ESGOTADO </h5>';
                txt +=  '<h4><del>R$ '+this.preco+'</del></h4>';
            }
            txt +=  '</div>';
        }

        return txt;
    }

    toCompraHtml(){
        let txt = '<div id = "img_compra" class="img_produto_compra">';
        txt+=   '<img id="imagem_produto" src="'+this.imgPath+'">';
        txt+=   '</div>';
        txt+=   '<div id="detalhes_compra">';
        if(this.promocao){
            txt+=   "<h4>De <del>R$ "+this.preco+"</del> ("+this.precoPromocional+"% de desconto)</h4>";
            txt+=   '<h2>por</h2> <h1 id="preco_produto">R$ '+(this.preco*((100-this.precoPromocional)/100)).toFixed(2)+'</h1><h2> à vista</h2><br/>';
        }else{
             txt+=  '<h2>Por apenas:</h2> <h1 id="preco_produto">R$ '+(this.preco)+'</h1><h2> à vista</h2><br/>';
        }
        if(this.qtdEstoque !== 0){
            txt+=   '<button id=\"btn_carrinho_add\" onclick=\"addCarrinho(\''+this.codigo+'\')\"><i class=\"fa fa-cart-plus\"></i> Adicionar ao carrinho</button>';
        }else{
            txt+=   '<button id=\"btn_carrinho_add\" onclick=\"alert(\'Produto esgotado!\')\"><i class=\"fa fa-cart-plus\"></i> Adicionar ao carrinho</button>';

        }
        txt+=   '</div>';
        return txt;
    }

    toCarrinhoHtml(){
        let txt ='<tr class="item_carrinho">';
        txt+=         '<td><img src="'+this.imgPath+'"></td>';
        txt+=         '<td><p>'+this.nomeComercial+'</p></td>';
        txt+=         '<td>';
        txt+=            '<select>';
        txt+=                '<option value="0">1</option>';
        txt+=                '<option value="1">1</option>';
        txt+=                '<option value="2">1</option>';
        txt+=                '<option value="3">1</option>';
        txt+=                '<option value="4">1</option>';
        txt+=                '<option value="5">1</option>';
        txt+=            '</select>';
        txt+=        '</td>';
        if(this.promocao){
            txt+=        '<td>R$ '+(this.preco*((100-this.precoPromocional)/100)).toFixed(2)+'</td>';
        }else{
            txt+=        '<td>R$ '+this.preco+'</td>';
        }
        txt+=        '<td><input type="image" src="http://trabWeb.ddns.net:8082/IMAGES/ICONS/fechar.png"></td>';
        txt+=    '</tr>'
        return txt;
    }
}

class Pedido{
    constructor(produtos,entrega,precoTotal,qtdItens){
        this.produtos = produtos;
        this.entrega = entrega;
        this.precoTotal = precoTotal;
        this.qtdItens = qtdItens;
    }
}

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

class Carrinho{
    constructor() {
        this.produtos = [];
        this.valorTotal = 0.00;
        this.numProd = this.produtos.length;
    }
}

class Agendamento{
    constructor(data){
        this.data = data;
        this.horarios= ["8:00","9:00","10:00","11:00","12:00",
                        "13:00","14:00","15:00","16:00","17:00"]
    }
    ocupaHorario(horario){
        this.horarios.splice(this.horarios.indexOf(horario),1);
    }
}

function jsonToServico(json){
    return new Servico(
    json.id,
    json.dono,
    json.tipo,
    json.pet,
    json.data,
    json.hora,
    json.detalhes,
    json.preco,
    json.status
    );
}

function jsonToUser(json){
    return new Cliente(
        json.nome,
        json.email,
        json.celular,
        json.telefone,
        json.nascimento,
        json.cpf,
        json.senha,
        json.endereco,
        json.cartao,
        json.admin,
        (json.pets !== undefined) ? json.pets : [],
        (json.pedidos !== undefined) ? json.pedidos : [],
        (json.carrinho !== undefined) ? json.carrinho : []
    );
}

function jsonToProduto(json){
    let temp = new Produto(json.nomeComercial,
                            json.marca,
                            json.categoria,
                            json.departamento,
                            json.preco,
                            json.precoPromocional,
                            json.nomeCompleto,
                            json.codigo,
                            json.qtdEstoque,
                            json.lote,
                            json.validade,
                            json.descricao,
                            json.promocao,
                            json.imgPath,
                            );
    return temp;
}

function jsonToPet(json){
    let pet = new Pet(json.nome,
                      json.tipo,
                      json.raca,
                      json.idade,
                      json.peso,
                      json.sexo,
                      (json.servicos !== undefined) ? json.servicos : []
    );
    return pet;
}

function dateToNormalDate(data){
    data = data.split("-");
    return data[2]+"/"+data[1]+"/"+data[0];
}
