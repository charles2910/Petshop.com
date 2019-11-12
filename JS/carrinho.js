let carrinho = new Carrinho();
console.log("Abriu");

function attCarrinho() {
    carrinho.numProd = carrinho.produtos.length;
    if (carrinho === undefined || carrinho === null || carrinho.numProd === 0) {
        console.log("Carrinho vazio");
        return "Carrinho vazio";
    }
    carrinho.valorTotal = 0.00;
    carrinho.produtos.forEach(element => {
        carrinho.valorTotal += element.preco;
    });

    carrinho.numProd = carrinho.produtos.length;
};

function addCarrinho() {
    console.log("Entrou novo produto");
    let novoProduto = new Produto(null,null,null,null,null,null,null,null,null,null,null,null,null, null);
    novoProduto.nomeComercial = document.getElementById("nome_produto_compra").innerHTML;
    novoProduto.imgPath = document.getElementById("imagem_produto").getAttribute("src");
    novoProduto.preco = document.getElementById("preco_produto").innerHTML.replace("R$", "").replace(",", ".");
    novoProduto.preco = Number(novoProduto.preco);
    carrinho.produtos[carrinho.numProd] = novoProduto;
    attCarrinho();
}

function carregarCarrinho() {
    let txt = '<div id="conteudo_carrinho"><h1>Meu carrinho</h1><hr><table>  <tr><th>Produto</th><th>Nome</th><th>Quantidade</th><th>Preço</th><th>Remover</th></tr>';

    if (carrinho.numProd !== 0)
    carrinho.produtos.forEach(produto => {
        txt += toCarrinhoHTML(produto);
    });
   
    txt += '<tr class="item_carrinho"><td><h2>Total:</h2></td><td></td>';
    if (carrinho.numProd === 0) {
        txt += '<td id="carrinho_num_itens">Carrinhos vazio</td>';
    } else {
        txt += '<td id="carrinho_num_itens">' + carrinho.numProd + '</td>';
    }
    txt += '<td  id="carrinho_valor_total">R$' + carrinho.valorTotal + '</td>'
    txt += '<td></td></tr></table><button id="carrinho_finalizar_compra">Finalizar compra</button></div>';
    document.getElementById("janela_de_conteudo").innerHTML = txt;
}

function toCarrinhoHTML(produto){
    let txt ='<tr class="item_carrinho">';
    txt+=         '<td><img src="'+ produto.imgPath +'"></td>';
    txt+=         '<td><p>'+produto.nomeComercial+'</p></td>';
    txt+=         '<td>';
    txt+=            '<select>';
    txt+=                '<option value="1">1</option>';
    txt+=                '<option value="2">2</option>';
    txt+=                '<option value="3">3</option>';
    txt+=                '<option value="4">4</option>';
    txt+=                '<option value="5">5</option>';
    txt+=            '</select>';
    txt+=        '</td>';
    txt+=        '<td>R$ '+produto.preco+'</td>';
    txt+=        '<td><input type="image" src="../IMAGES/ICONS/fechar.png"></td>';
    txt+=    '</tr>'
    return txt;
}