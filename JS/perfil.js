async function carregaPets(){
    let txt = "";
    logged = jsonToUser(await AJAX_geral(`http://trabweb.ddns.net:8082/api/usuarios/${logged.email}`));
    if (logged) {
        if (logged.pets && logged.pets.length > 0) {
            carrinho = logged.carrinho;
            for(let i = 0; i < logged.pets.length; i++) {
                let pet = jsonToPet(logged.pets[i]);
                txt += pet.petToHtml();
            }
        } else {
            txt += "Você não possui Pets.";
        }
        document.getElementById("pets_cliente").innerHTML = txt;
    }
}

async function carregaPedidos(){
    let request = db_clientes.transaction("clientes").objectStore("clientes").get(logged.email);
    request.onsuccess = function(event) {
        pedidoToHtml(request.result.pedidos);
    }
}

function pedidoToHtml(pedidos){
    let concluido = '';
    let pendente = '';
    if(pedidos !== undefined){
        pedidos.forEach((pedido) => {
            let txt = '';
            console.log(pedido);
            txt+=     '<h3>Pedido '+pedidos.indexOf(pedido)+'</h3>'
            txt+=     '<table>'
            txt+=     '<tr>';
            txt+=        '<th>Produto</th>';
            txt+=        '<th>Nome</th>';
            txt+=        '<th>Quantidade</th>';
            txt+=        '<th>Preço</th>';
            txt+=        '<th>Entrega</th>';
            txt+=     '</tr>';
            pedido.produtos.forEach((produto) =>{
                txt+=    '<tr class="item_carrinho">'
                txt+=        '<td><img src="'+produto.imgPath+'"></td>'
                txt+=        '<td><p>'+produto.nomeCompleto+'</p></td>'
                txt+=        '<td>'+produto.qtdCarrinho+'</td>'
                txt+=        '<td>R$ '+produto.preco+'</td>'
                txt+=        '<td> '+pedido.entrega+' </td>'
                txt+=    '</tr>'
            });
            txt+= '<tr class="item_carrinho">'
            txt+=     '<td><h2>Total:</h2></td>'
            txt+=     '<td></td>'
            txt+=     '<td>'+pedido.qtdItens+'</td>'
            txt+=     '<td>R$ '+pedido.precoTotal+'</td>'
            if(pedido.entrega == "Pendente"){
                txt+=     '<td><button onclick="concluirPedido('+pedidos.indexOf(pedido)+')">Concluir pedido</button></td>';
            }else{
                txt+= '<td></td>';
            }
            txt+= '</tr>'
            txt+= '</table>';
            if(pedido.entrega == "Pendente"){
                pendente +=txt;
            }else{
                concluido +=txt;
            }
        });
    }
    document.getElementById("pedidos_pendentes").innerHTML = pendente;
    document.getElementById("pedidos_concluidos").innerHTML = concluido;
}

function concluirPedido(index){
    logged.pedidos[index].entrega = "Concluída";
    attDbCliente(logged);
    carregaPedidos();
}
