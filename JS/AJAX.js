async function navegarCompra(codigo){
    if(logged !== undefined && logged.admin){
        AJAX_navegacao("http://trabWeb.ddns.net:8082/conteudos/att_produto.html","Cadastro de produto",async ()=>{
            let produto = await AJAX_geral(`http://localhost:8082/api/compra?id=${codigo}`);
            produto = jsonToProduto(produto);
            document.getElementById("nome").value = produto.nomeComercial;
            document.getElementById("marca").value = produto.marca;
            document.getElementById("preco").value = produto.preco;
            document.getElementById("preco_promo").value = produto.precoPromocional;
            document.getElementById("nome_comp").value = produto.nomeCompleto;
            document.getElementById("codigo").value = produto.codigo;
            document.getElementById("codigo").readOnly = true;
            document.getElementById("qtd").value = produto.qtdEstoque;
            document.getElementById("lote").value = produto.lote;
            document.getElementById("validade").value = produto.validade;
            document.getElementById("desc").value = produto.descricao;
            let menu = document.getElementById("categoria");
            for(let i=0; i< menu.length;i++){
                if(menu.options[i].value.toLowerCase() === produto.categoria){
                    menu.options[i].setAttribute("selected","selected");
                }
            }
            menu = document.getElementById("departamento");
            for(let i=0; i< menu.length;i++){
                if(menu.options[i].value.toLowerCase() === produto.departamento){
                    menu.options[i].setAttribute("selected","selected");
                }
            }
        });
    }else{
         AJAX_navegacao("http://trabWeb.ddns.net:8082/conteudos/compra.html","",async ()=>{
            let produto = await AJAX_geral(`http://localhost:8082/api/compra?id=${codigo}`);
            produto = jsonToProduto(produto);
            document.getElementById("tela_compra").innerHTML = produto.toCompraHtml();
            document.getElementById("nome_produto_compra").innerHTML = produto.nomeComercial;
            document.getElementById("nome_completo").innerHTML = produto.nomeCompleto;
            document.getElementById("espec").innerHTML = produto.descricao;
            if(produto.qtdEstoque === 0){
                document.getElementById("btn_carrinho_add").disable = true;
                document.getElementById("btn_carrinho_add").style.opacity = "0.5";
                document.getElementById("btn_carrinho_add").style.cursor = "default";
            }
         });
    }
}

async function AJAX_navegacao(arquivo,pagina_atual,callback){
    let xhttp = new XMLHttpRequest();
    if(pagina_atual !== undefined){
        document.getElementById("pagina_atual").innerHTML = pagina_atual;
    }
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            document.getElementById("janela_de_conteudo").innerHTML = this.responseText;
            if(callback !== undefined){
                callback();
            }
        }
    }
    xhttp.open("GET",arquivo);
    xhttp.send();
}

async function AJAX_listas(nome,filtro,pagina){
    let xhttp = new XMLHttpRequest();
    if(pagina_atual !== undefined){
        document.getElementById("pagina_atual").innerHTML = nome;
    }
    nome = nome.toLowerCase();
    xhttp.onreadystatechange = async function(){
        if(this.readyState == 4 && this.status == 200){
            document.getElementById("janela_de_conteudo").innerHTML = this.responseText;
            if(pagina === undefined) pagina = 0;
            let lista = await AJAX_geral(`http://localhost:8082/api/estoque?init=${pagina}&&filtro=${filtro}&&nome=${nome}`);
            carregarLista(lista);
            /*if(banner !== undefined){
                let result = await qtdPaginas(nome,tipo,filtro);
                carregarLista(nome,
                          tipo,
                          banner,
                          await carregaItens(nome,tipo,pagina,filtro),
                          result[0],filtroMarca,filtroPreco,filtroTipo,
                          result[1],
                          pagina);
            }else{
                filtro = () => {return true};
                let result = await qtdPaginas(nome,tipo,filtro);
                carregarLista(nome,
                          tipo,
                          escolheBanner(nome,tipo),
                          await carregaItens(nome,tipo,0,filtro),
                          result[0],[],[],[],
                          result[1],
                          0);
            }*/
        }
    }
    xhttp.open("GET","http://trabWeb.ddns.net:8082/conteudos/listas.html");
    xhttp.send();
}

function navaegacaoInterativa(id){
    let i=0;
    if(id !== undefined || id !== false){
        while(document.getElementById("li" + i )!== null){
            if("li" + i !== id){
                document.getElementById("li" + i ).setAttribute("onmouseover",
                    'document.getElementById("li" + '+i+' ).style.backgroundColor = "white"'
                );
                document.getElementById("li" + i ).setAttribute("onmouseout",
                    'document.getElementById("li" + '+i+' ).style.backgroundColor = "yellow"'
                );
                document.getElementById("li" + i ).style.backgroundColor = "yellow";
            }else{
                document.getElementById("li" + i).style.backgroundColor = "white";
                document.getElementById("li" + i ).setAttribute("onmouseout",
                    'document.getElementById("li" + '+i+' ).style.backgroundColor = "white"'
                );
            }
            i++
        }
    }
}

async function AJAX_geral(rota,callback){
    return new Promise((resolve)=>{
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                resolve(this.responseText);
                if(callback !== undefined){
                    callback();
                }
            }
        }
        xhttp.open("GET",rota);
        xhttp.send();
    })
}
