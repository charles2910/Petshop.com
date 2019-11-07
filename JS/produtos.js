class Lista{
    constructor(){
    this.qtdTotalPaginas;
    this.tipo;
    this.nome;
    this.bannerPos;
    this.filtroMarca = [];
    this.filtroPreco = [];
    this.filtroTipo = [];
    this.marcas = [];
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
        document.getElementById("anterior").disabled = false;
        document.getElementById("proximo").disabled = false;
    }
}

function carregarLista(tipo1,nome1,pag){
    tipo = tipo1;
    nome = nome1;
    bannerPos = 0;
    filtroMarca = [];
    filtroPreco = [];
    filtroTipo = [];
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
    let index = objectStore.index(tipo);
    index.openCursor(IDBKeyRange.only(nome)).onsuccess = (event)=>{
        let cursor = event.target.result;
        if(cursor){
            if(filtro(cursor.value)){
                i++;
            }
            if(!marcas.includes(cursor.value.marca)){
                marcas.push(cursor.value.marca);
            }
            cursor.continue();  
        }else{
            if(i%16 === 0){
                qtdTotalPaginas = i/16;
            }else{
                qtdTotalPaginas = ((i-(i%16))/16)+1;
            }
            console.log(qtdTotalPaginas);
            if(qtdTotalPaginas < 6){
                for(let j = qtdTotalPaginas +1 ; j<7; j++){
                    document.getElementById("btn_"+j).disabled = true;
                    document.getElementById("btn_"+j).style.opacity = "0.3";
                    document.getElementById("btn_"+j).style.backgroundColor = "white";
                    document.getElementById("btn_"+j).style.cursor = "default";
                }
            }
            carregaFiltros();
            qtdTotalPaginas--;
            
            document.getElementById("btn_pag_final").setAttribute("onclick","carregaItens("+qtdTotalPaginas+")")
        }
    }
}


function carregaFiltros(){
    for(let i=0;i<marcas.length;i++){
        let newMarca = document.createElement("li");
        let marcaLink = document.createElement("a");
        newMarca.setAttribute("id",marcas[i]);
        marcaLink.appendChild(document.createTextNode(marcas[i]));
        marcaLink.setAttribute("href","#");
        marcaLink.setAttribute("onclick","aplicaFiltro('"+marcas[i]+"',1,'"+marcas[i]+"')");
        newMarca.appendChild(marcaLink);
        document.getElementById("filtro_marca").appendChild(newMarca);
    }
    let txt;
    if(tipo === "categoria"){
        txt = '<li onclick="aplicarFiltro(cat_1,2,"brinquedos") ><a id="cat_1" href="#">Brinquedos</a></li>';
        txt+= '<li onclick="aplicarFiltro(cat_2,2,"higiene")" ><a id="cat_2" href="#">Higiene</a></li>';
        txt+= '<li onclick="aplicarFiltro(cat_3,2,"saúde")" ><a id="cat_3" href="#">Saúde</a></li>';
        txt+= '<li onclick="aplicarFiltro(cat_4,2,"alimentos")" ><a id="cat_4" href="#">Alimentos</a></li>';
        txt+= '<li onclick="aplicarFiltro(cat_5,2,"acessórios")" ><a id="cat_5" href="#">Acessórios</a></li>';
    }else{
        txt = '<li onclick="aplicarFiltro(cat_1,2,"gatos")" ><a id="cat_1" href="#">Gatos</a></li>';
        txt+= '<li onclick="aplicarFiltro(cat_2,2,"cachorros")" ><a id="cat_2" href="#">Cachorros</a></li>';
        txt+= '<li onclick="aplicarFiltro(cat_3,2,"roedores")" ><a id="cat_3" href="#">Roedores</a></li>';
        txt+= '<li onclick="aplicarFiltro(cat_4,2,"passáros")" ><a id="cat_4" href="#">Passáros</a></li>';
        txt+= '<li onclick="aplicarFiltro(cat_5,2,"peixes")" ><a id="cat_5" href="#">Peixes</a></li>';
    }
    document.getElementById("filtro_tipo").innerHTML = txt;
}

function aplicaFiltro(id,funcao,filtro1,filtro2){
    if(funcao === 1){
        filtroMarca.push(filtro1);
    }else if(funcao ===2){
        filtroTipo.push(filtro1);
    }else{
        filtroPreco.push(filtro1);
        filtroPreco.push(filtro2);
    }
    AJAX_navegacao("../conteudos/listas.html",false,"Acessórios",()=>{bannerPos = 0;escolheBanner(0);carregaItens(0);carregaBotoes();efeitoBotoes();});
}

function carregaItens(pag){
    let objectStore = db_estoque.transaction("estoque").objectStore("estoque");
    let i = 0;
    let cont = 0;
    let produtos = [];
    let index = objectStore.index(tipo);
    index.openCursor(nome).onsuccess = (event)=>{
        let cursor = event.target.result;
        if(cursor){
            if(filtro(cursor.value)){
                if(cont >= (pag)*16){
                    produtos.push(jsonToProduto(cursor.value));
                    i++;
                }
                cont++;
            }
            if(i < 16){
                cursor.continue();  
            }else{
                console.log(produtos);
                addProdutoLinha(produtos);
            }
        }else{
            addProdutoLinha(produtos);
            console.log(produtos);
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

function filtro(produto){
    if(filtroMarca.length !== 0){
        if(!filtroMarca.includes(produto.marca)){
            return false;
        }
    }
    if(filtroPreco.length !== 0){
        if(produto.preco < filtroPreco[0] && produto.preco > filtroPreco[1]){
            return false;
        }
    }
    if(filtroTipo.length !== 0){
        if(tipo === "categoria"){
            if(!filtroMarca.includes(produto.categoria)){
                return false;
            }
        }else{
            if(!filtroMarca.includes(produto.departamento)){
                return false;
            }
        }
    }
    return true;
}