let banners = new Banner();
let qtdTotalPaginas;
let tipo;
let nome;
let bannerPos;

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

function moverBanner(direcao){
    if(direcao>0){
        escolheBanner(1);
    }else{
        escolheBanner(-1);
    }
    efeitoBotoes();
}

function efeitoBotoes(){
    if(bannerPos === 0){
        document.getElementById("anterior").disabled = true;
    }else if(bannerPos === 7){
        document.getElementById("proximo").disabled = true;
    }else{
        console.log(bannerPos);
        document.getElementById("anterior").disabled = false;
        document.getElementById("proximo").disabled = false;
    }
}

function compare(a,b){
    return b.precoPromocional-a.precoPromocional;
}

function carregarLista(tipo1,nome1,pag){
    tipo = tipo1;
    nome = nome1;
    bannerPos = 0;
    escolheBanner(0);
    carregaItens(pag);
    carregaBotoes();
    efeitoBotoes();
}

function carregaBotoes(){
    document.getElementById("btn_pag_inicial").setAttribute("onclick","carregaItens(0)");
    qtdItens(tipo,nome);
}

function qtdItens(){
    let objectStore = db_estoque.transaction("estoque").objectStore("estoque");
    let i = 0;
    objectStore.openCursor().onsuccess = (event)=>{
        let cursor = event.target.result;
        if(cursor){
            if(tipo === "categoria"){
                if(cursor.value.categoria === nome){
                    i++;
                }
            }else if(tipo === "departamento"){
                if(cursor.value.departamento === nome){
                    i++;
                }
            }
            cursor.continue();  
        }else{
            if(i%16 === 0){
                qtdTotalPaginas = i/16;
            }else{
                qtdTotalPaginas = ((i-(i%16))/16)+1;
            }
            qtdTotalPaginas--;
            document.getElementById("btn_pag_final").setAttribute("onclick","carregaItens("+qtdTotalPaginas+")")
        }
    }
}

function carregaItens(pag){
    let objectStore = db_estoque.transaction("estoque").objectStore("estoque");
    let i = 0;
    let cont = 0;
    let produtos = [];
    objectStore.openCursor().onsuccess = (event)=>{
        let cursor = event.target.result;
        if(cursor){
            if(tipo === "categoria"){
                if(cursor.value.categoria === nome){
                    if(cont >= (pag)*16){
                       produtos.push(jsonToProduto(cursor.value));
                       console.log(cont,i);
                       i++;
                    }
                    cont++;
                }
            }else if(tipo === "departamento"){
                if(cursor.value.departamento === nome){
                    if(cont >= (pag)*16){
                        produtos.push(jsonToProduto(cursor.value));
                        i++;
                    }
                    cont++;
                }
            }
            if(i < 16){
                cursor.continue();  
            }else{
                addProdutoLinha(produtos)
            }
        }else{
            addProdutoLinha(produtos)
        }
    }
}

function addProdutoLinha(produtos){
    for(let i =0; i <16;i++){
        if(produtos[i] === undefined){
            produtos.push(new Produto("null","null","null","null","null","null","null","null","null","null","null","null","null","../IMAGES/PRODUTOS/produto.png"));
        }
    }
    
    document.getElementById("linha1").innerHTML = bannerHtml(produtos.slice(0,4));
    document.getElementById("linha2").innerHTML = bannerHtml(produtos.slice(4,8));
    document.getElementById("linha3").innerHTML = bannerHtml(produtos.slice(8,12));
    document.getElementById("linha4").innerHTML = bannerHtml(produtos.slice(12));
}

function mudarPagina(pagina,max){
    let btn1 = document.getElementById("btn_1");
    let btn2 = document.getElementById("btn_2");
    let btn3 = document.getElementById("btn_3");
    let btn4 = document.getElementById("btn_4");
    let btn5 = document.getElementById("btn_5");
    let btn6 = document.getElementById("btn_6");
    if(max > 0){
        if(parseInt(btn6.textContent)+(max) <= qtdTotalPaginas+1){
            btn1.textContent = parseInt(btn1.textContent) + max;
            btn2.textContent = parseInt(btn2.textContent) + max;
            btn3.textContent = parseInt(btn3.textContent) + max;
            btn4.textContent = parseInt(btn4.textContent) + max;
            btn5.textContent = parseInt(btn5.textContent) + max;
            btn6.textContent = parseInt(btn6.textContent) + max;
        }
    }else{
        if(parseInt(btn1.textContent)+max > 0){
            btn1.textContent = parseInt(btn1.textContent) + max;
            btn2.textContent = parseInt(btn2.textContent) + max;
            btn3.textContent = parseInt(btn3.textContent) + max;
            btn4.textContent = parseInt(btn4.textContent) + max;
            btn5.textContent = parseInt(btn5.textContent) + max;
            btn6.textContent = parseInt(btn6.textContent) + max;
        }
    }
    console.log(pagina)
    carregaItens(pagina-1);
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

function carrinho(){
    if(logged === false){
        alert("Você precisa estar logado para adicionar um item no carrinho");
    }
}