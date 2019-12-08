let carrinho;
inicializaCarrinho();
function inicializaCarrinho(){
    if (logged) {
        if (logged.carrinho && logged.carrinho.numProd) {
            carrinho = logged.carrinho;
        }
    } else if(!carrinho) {
        carrinho = new Carrinho();
    }
}

async function attCarrinho() {
    carrinho.numProd = carrinho.produtos.length;
    if (carrinho === undefined || carrinho === null || carrinho.numProd === 0) {
        return "Carrinho vazio";
    }
    carrinho.valorTotal = 0.00;
    carrinho.numProd  = 0;
    carrinho.produtos.forEach(element => {
        carrinho.valorTotal += (parseFloat(element.preco)*(1-parseFloat(element.precoPromocional)/100)).toFixed(2) * element.qtdCarrinho;
        console.log(carrinho.valorTotal);
        carrinho.numProd += element.qtdCarrinho;
    });
    if(carrinho.numProd <1){

    }
    if(logged) {
        logged.carrinho = carrinho;
        await AJAX_geralPUT(`http://trabweb.ddns.net:8082/api/usuarios/${logged.email}`, logged);
    }

};

async function addCarrinho(codigo) {
    let novoProduto = await AJAX_geral(`http://trabweb.ddns.net:8082/api/estoque/${codigo}`);
    let indice = -1;
    carrinho.produtos.forEach((produto, index) => {
        if (produto.nomeComercial === novoProduto.nomeComercial) {
            indice = index;
        }
    });
    if (indice >= 0) {
        carrinho.produtos[indice].qtdCarrinho += 1;
    } else {
        novoProduto.qtdCarrinho = 1;
        carrinho.produtos[carrinho.produtos.length] = novoProduto;
    }
    attCarrinho();
    alert("Produto adicionado ao carrinho.");
}

function changeCarrinho(id, value) {
    let prod = id.replace("carrinho_qtd", " ");
    prod = prod.trim();
    carrinho.produtos.forEach((produto) => {
        if (produto.nomeComercial === prod) {
            if (produto.qtdEstoque < parseInt(value)) {
                alert("Quantidade no estoque não é suficiente.");
                return;
            }
            produto.qtdCarrinho = parseInt(value);
        }
    });
    attCarrinho();
    carregarCarrinho();
}

function removerProduto(id) {
    let prod = id.replace("carrinho_remover", " ");
    prod = prod.trim();
    carrinho.produtos.forEach((produto) => {
        if (produto.nomeComercial === prod) {
            produto.qtdCarrinho = 0;
        }
    });
    carrinho.produtos = carrinho.produtos.filter((element) => {
        if (element.qtdCarrinho > 0)
            return true;
        else
            return false;
    })
    attCarrinho();
    carregarCarrinho();
}

function carregarCarrinho() {
    inicializaCarrinho();
    let txt = '<div id="conteudo_carrinho"><h1>Meu carrinho</h1><hr><table>  <tr><th>Produto</th><th>Nome</th><th>Quantidade</th><th>Preço</th><th>Remover</th></tr>';

    if (carrinho.numProd !== 0)
    carrinho.produtos.forEach(produto => {
        txt += toCarrinhoHTML(produto);
    });

    txt += '<tr class="item_carrinho"><td><h2>Total:</h2></td><td></td>';
    if (carrinho.numProd === 0) {
        txt += '<td id="carrinho_num_itens">Carrinho vazio</td>';
        txt += '<td  id="carrinho_valor_total">R$ ' + "00.00" + '</td>'
    } else {
        txt += '<td id="carrinho_num_itens">' + carrinho.numProd + '</td>';
        txt += '<td  id="carrinho_valor_total">R$ ' + carrinho.valorTotal.toFixed(2) + '</td>'
    }
    txt += '<td></td></tr></table><button onclick="finalizarCompra()" id="carrinho_finalizar_compra">Finalizar compra</button></div>';
    document.getElementById("janela_de_conteudo").innerHTML = txt;
}

function toCarrinhoHTML(produto){
    let txt ='<tr class="item_carrinho">';
    txt+=         '<td><img src="'+ produto.imgPath +'"></td>';
    txt+=         '<td><p>'+produto.nomeComercial+'</p></td>';
    txt+=         '<td>';
    txt+=            '<select id="carrinho_qtd' + produto.nomeComercial +'" onchange="changeCarrinho(id, value)">';
    for(i = 1; i <= 10 /*produto.qtdEstoque*/; i++) {
        txt +=                '<option value="' + i + '" '
        if (i === produto.qtdCarrinho)
            txt += ' selected ';
        txt +=                '>' + i + '</option>';
    }
    txt+=            '</select>';
    txt+=        '</td>';
    txt+=        '<td>R$ ' + (parseFloat(produto.preco)*(1-parseFloat(produto.precoPromocional)/100)).toFixed(2) + '</td>';
    txt+=        '<td><input id="carrinho_remover' + produto.nomeComercial + '" onclick="removerProduto(id)" type="image" src="http://trabWeb.ddns.net:8082/IMAGES/ICONS/fechar.png"></td>';
    txt+=    '</tr>'
    return txt;
}

async function finalizarCompra() {
    if(logged === undefined){
        alert("Você precisa estar logado para finalizar a compra");
    } else if(parseInt(carrinho.numProd) < 1) {
        alert("Adicione algo no carrinho");
    } else {
        logged = jsonToUser(await AJAX_geral(`http://trabweb.ddns.net:8082/api/usuarios/${logged.email}`));
        logged.pedidos.push(new Pedido(carrinho.produtos, "Pendente", parseFloat(carrinho.valorTotal), parseInt(carrinho.numProd)));
        carrinho.produtos.forEach(element => {
            element.qtdEstoque -= parseInt(element.qtdCarrinho);
            AJAX_geralPUT('http://trabweb.ddns.net:8082/api/estoque', jsonToProduto(element));
        })
        logged.carrinho = new Carrinho();
        carrinho = logged.carrinho;
        await AJAX_geralPUT(`http://trabweb.ddns.net:8082/api/usuarios/${logged.email}`, logged);
        attCarrinho();
        carregarCarrinho();
        alert("Compra concluída com sucesso!");
    }
}
