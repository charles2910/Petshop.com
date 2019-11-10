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
        attDbCliente(this);
        attDbSessao(this);
    }
    addPedido(pedido){
        logged = this;
        this.pedidos.push(pedido);
    }
    addCarrinho(produto){
        logged = this;
        this.carrinho.push(produto);
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
    petToHtml(){
        let txt =    "<h2>"+this.nome+"</h2><hr>";
            txt +=   '<div class="dados_pet">';
            txt +=       "<p>Tipo: "+this.tipo+"</p>";
            txt +=       "<p>Raça: "+this.raca+"</p>";
            txt +=       "<p>Sexo: "+this.sexo+"</p>";
            txt +=       "<p>Idade: "+this.idade+"</p>";
            txt +=       "<p>Peso: "+this.peso+"</p>";
            txt +=       "<button>Editar</button>";
            txt +=       "<button onclick=\"servicoPet(true,"+"\'id_"+this.nome+"\');\">Serviços</button>";
            txt +=   "</div>";
            txt +=   "<div class = 'servicos_desc' id="+"id_"+this.nome+">";
            txt +=   '<div class="titulo_serv">';
            txt +=      "<h2>Serviços</h2>";
            txt +=      '<input onclick=\"servicoPet(false,\''+'id_'+this.nome+'\');\" type="image" src="../IMAGES/ICONS/fechar.png">';
            txt +=      "</div><hr>";
        for(let i =0; i <this.servicos.length;i++){
            txt += servico[i].toHtmlCliente();
        }
            txt +=   "</div>";
        return txt;
    }
}

class servico{
    constructor(id,tipoAnimal,nomeAnimal,tipo,data,detalhes,preco,status){
        this.id = id;
        this.tipoAnimal = tipoAnimal;
        this.nomeAnimal = nomeAnimal;
        this.tipo = tipo;
        this.data = data;
        this.detalhes = detalhes;
        this.preco = preco;
        this.status = status;
    }

    toHtmlCliente(){
        let txt = '<div class="servicos_pet">';
            txt+= '<h3>Serviço '+this.id+'</h3><hr>';
            txt+= '<div class="desc_servico">';
            txt+= ' <p>Nome: '+this.tipo+'</p>';
            txt+=        '<p>Preço: R$ '+this.preco+'</p>';
            txt+=        '<p>Data: '+this.data+'</p>';
            txt+=        '<p>Status: '+this.status+'</p>';
            txt+=    '</div>';
            txt+= '</div>';
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
        return txt;
    }

    toCompraHtml(){
        let txt = '<div id = "img_compra" class="img_produto_compra">';
        txt+=   '<img src="'+this.imgPath+'">'; 
        txt+=   '</div>';
        txt+=   '<div id="detalhes_compra">';
        if(this.promocao){
            txt+=   "<h4>De <del>R$ "+this.preco+"</del> ("+this.precoPromocional+"% de desconto)</h4>";
            txt+=   '<h2>por</h2> <h1>R$ '+(this.preco*((100-this.precoPromocional)/100)).toFixed(2)+'</h1><h2> à vista</h2><br/>';
        }else{
             txt+=  '<h2>Por apenas:</h2> <h1>R$ '+(this.preco)+'</h1><h2> à vista</h2><br/>';
        }
        txt+=   '<button onclick="carrinho()" id="btn_carrinho_add"><i class="fa fa-cart-plus"></i> Adicionar ao carrinho</button>';
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
        txt+=        '<td><input type="image" src="../IMAGES/ICONS/fechar.png"></td>';
        txt+=    '</tr>'
        return txt;
    }

}

class Pedido{
    constructor(imagem,nome,qtd,preco,entrega){
        this.imagem = imagem;
        this.nome = nome;
        this.qtd = qtd;
        this.preco = preco;
        this.entrega = entrega;
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
