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
    novoProduto.preco = document.getElementById("preco_produto").innerHTML.replace("R$", "").replace(",", ".");
    novoProduto.preco = Number(novoProduto.preco);
    carrinho.produtos[carrinho.numProd] = novoProduto;
    attCarrinho();
}

function carregarCarrinho() {
    let txt = '<div id="conteudo_carrinho"><h1>Meu carrinho</h1><hr><table>  <tr><th>Produto</th><th>Nome</th><th>Quantidade</th><th>Preço</th><th>Remover</th></tr><tr class="item_carrinho"><td><h2>Total:</h2></td><td></td><td id="carrinho_num_itens">Carrinhos vazio</td><td  id="carrinho_valor_total">R$ 0,00</td><td></td></tr></table><button id="carrinho_finalizar_compra">Finalizar compra</button></div>';
    document.getElementById("janela_de_conteudo").innerHTML = txt;
}