async function navegarCompra(codigo){
    if(logged.admin){
        await AJAX_navegacao("../conteudos/cadastro_produto.html",false,"Cadastro de produto",()=>{
            document.getElementById("Alterar").style.display = "block";
            document.getElementById("deletar").style.display = "block";
            document.getElementById("Cadastrar").style.display = "none";
        });
    }else{
         AJAX_navegacao("../conteudos/compra.html",false,"",()=>{
             let request = db_estoque.transaction("estoque").objectStore("estoque").get(codigo);
             request.onsuccess = function(event) {
                let produto = jsonToProduto(request.result);
                document.getElementById("tela_compra").innerHTML = produto.toCompraHtml();
                document.getElementById("nome_produto_compra").innerHTML = produto.nomeComercial;
                document.getElementById("nome_completo").innerHTML = produto.nomeCompleto;
            };
         });
    }
}

async function AJAX_navegacao(arquivo,id,pagina_atual,callback){
    let xhttp = new XMLHttpRequest();
    let i=0;
    if(id !== undefined || id !== false){
        while(document.getElementById("li" + i )!== null){
            if("li" + i !== id){
                document.getElementById("li" + i ).style.backgroundColor = "yellow";
            }else{
                document.getElementById("li" + i).style.backgroundColor = "white";
            }
            i++
        }
    }
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

function escolheBanner(mover){
    bannerPos+= mover;
    if(tipo === "categoria"){
        if(nome === "cachorros"){
            document.getElementById("banner_lista").innerHTML = bannerHtml(banners.cachorros.slice(bannerPos,bannerPos+4));
        }else if( nome === "gatos"){
            document.getElementById("banner_lista").innerHTML = bannerHtml(banners.gatos.slice(bannerPos,bannerPos+4));
        }else if( nome === "roedores"){
            document.getElementById("banner_lista").innerHTML = bannerHtml(banners.roedores.slice(bannerPos,bannerPos+4));
        }else if( nome === "passáros"){
            document.getElementById("banner_lista").innerHTML = bannerHtml(banners.passaros.slice(bannerPos,bannerPos+4));
        }else if( nome === "peixes"){
            document.getElementById("banner_lista").innerHTML = bannerHtml(banners.peixes.slice(bannerPos,bannerPos+4));
        }
    }else if(tipo ==="departamento"){
        if(nome === "brinquedos"){
            document.getElementById("banner_lista").innerHTML = bannerHtml(banners.brinquedos.slice(bannerPos,bannerPos+4));
        }else if( nome === "saúde"){
            document.getElementById("banner_lista").innerHTML = bannerHtml(banners.saude.slice(bannerPos,bannerPos+4));
        }else if( nome === "alimentos"){
            document.getElementById("banner_lista").innerHTML = bannerHtml(banners.alimentos.slice(bannerPos,bannerPos+4));
        }else if( nome === "higiene"){
            document.getElementById("banner_lista").innerHTML = bannerHtml(banners.higiene.slice(bannerPos,bannerPos+4));
        }else if( nome === "acessórios"){
            document.getElementById("banner_lista").innerHTML = bannerHtml(banners.acessorios.slice(bannerPos,bannerPos+4));
        }
    }else{
        document.getElementById("banner_lista").innerHTML = bannerHtml(banners.geral.slice(bannerPos,bannerPos+4));
    }
}
