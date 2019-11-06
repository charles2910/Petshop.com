async function navegarCompra(codigo){
    if(logged.admin){
        await AJAX_navegacao("../conteudos/cadastro_produto.html",false,"Cadastro de produto",()=>{
            document.getElementById("Alterar").style.display = "block";
            document.getElementById("deletar").style.display = "block";
            document.getElementById("Cadastrar").style.display = "none";
            console.log("teste2");
        });
    }else{
         AJAX_navegacao("../conteudos/compra.html",false,"",()=>{
             let request = db_estoque.transaction("estoque").objectStore("estoque").get(codigo);
             request.onsuccess = function(event) {
                let produto = jsonToProduto(request.result);
                document.getElementById("tela_compra").innerHTML = produto.toCompraHtml();
                document.getElementById("nome_produto_compra").innerHTML = produto.nomeComercial;
            };
         });
    }
}

async function AJAX_navegacao(arquivo,id,pagina_atual,callback,){
    
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
            console.log("teste1")
            document.getElementById("janela_de_conteudo").innerHTML = this.responseText;
            if(callback !== undefined){
                callback();
            }
        }
    }
    xhttp.open("GET",arquivo);
    xhttp.send();
}

async function AJAX_post_img(arquivo,callback){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            console.log("teste1")
            document.getElementById("janela_de_conteudo").innerHTML = this.responseText;
            if(callback !== undefined){
                callback();
            }
        }
    }
    xhttp.open("POST",arquivo,true);
    xhttp.send();
}