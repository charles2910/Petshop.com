let banners = new Banner();
function carregarProdutos(){
    let departamento = ["acessórios","alimentos","brinquedos","higiene","saúde"]
    for(let i = 0; i<5;i++){
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                let temp = JSON.parse(this.responseText);
                for(let j=0; j<temp.length;j++){
                    writeDbProduto(temp[j]); 
                }
            }
        }
        xhttp.open("GET","../produtos/"+departamento[i]+".json");
        xhttp.send();
    }
}

function carregaBanners(){
    let promocoes = [];
    let i = 0;
    let objectStore = db_estoque.transaction("estoque").objectStore("estoque");
    objectStore.openCursor().onsuccess = function(event) {
        let cursor = event.target.result;
        if (cursor) {
            if(cursor.value.promocao ==="true"){
                promocoes.push(jsonToProduto(cursor.value));
            }
            cursor.continue();
        }else{
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
                if(banners.geral.length <15){
                    banners.geral.push(promocoes[i]);
                }
            }
            console.log(banners);
        }
    };
}

function compare(a,b){
    return b.precoPromocional-a.precoPromocional;
}

function carregarLista(tipo,nome,pag){
    console.log("lista")
    let objectStore = db_estoque.transaction("estoque").objectStore("estoque");
    let i = 0;
    let produtos = [];
    objectStore.openCursor().onsuccess = (event)=>{
        let cursor = event.target.result;
        if(cursor){
            if(tipo === "categoria"){
                if(cursor.value.categoria === nome){
                    if(i >= (pag)*16){
                        produtos.push(jsonToProduto(cursor.value));
                        i++;
                    }
                }
            }else if(tipo === "departamento"){
                
                if(cursor.value.departamento === nome){
                    if(i >= (pag)*16){
                        produtos.push(jsonToProduto(cursor.value));
                        i++;
                    }
                }
            }
            if(i < (pag+1)*16){
                cursor.continue();  
            }else{
                console.log(produtos);
                document.getElementById("linha1").innerHTML = bannerHtml(produtos.slice(0,4));
                document.getElementById("linha2").innerHTML = bannerHtml(produtos.slice(4,8));
                document.getElementById("linha3").innerHTML = bannerHtml(produtos.slice(8,12));
                document.getElementById("linha4").innerHTML = bannerHtml(produtos.slice(12));
            }
        }else{
            document.getElementById("linha1").innerHTML = bannerHtml(produtos.slice(0,4));
            document.getElementById("linha2").innerHTML = bannerHtml(produtos.slice(3,8));
            document.getElementById("linha3").innerHTML = bannerHtml(produtos.slice(7,12));
            document.getElementById("linha4").innerHTML = bannerHtml(produtos.slice(11));
        }
    }
}

function bannerHtml(produtos){
    let txt = "";
    for(let i=0;i< produtos.length;i++){
        txt+= produtos[i].toProdutoHtml();
    }
    return txt;
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