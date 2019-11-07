class Lista{
    constructor(nome,tipo,banner,itens,qtdTotalPaginas,filtroMarca,filtroPreco,filtroTipo,marcas,pag){
    this.qtdTotalPaginas = qtdTotalPaginas;
    this.tipo = tipo;
    this.nome = nome;
    this.banner = banner;
    this.itens = itens;
    this.bannerPos = 0;
    this.filtroMarca = filtroMarca;
    this.filtroPreco = filtroPreco;
    this.filtroTipo = filtroTipo;
    this.marcas = marcas;
    this.pag = pag;
    }
}

let lista = new Lista();

function carregarLista(nome,tipo,banner,qtdTotalPaginas,filtroMarca,filtroPreco,filtroTipo,marcas,pag){
    lista = new Lista(nome,tipo,banner,qtdTotalPaginas,filtroMarca,filtroPreco,filtroTipo,marcas,pag);
    console.log("teste2");
    document.getElementById("anterior").disabled = true;
    addProdutoLinha();
    addProdutoBanner();
    configBotoes();
}

function addProdutoLinha(){
    for(let i =0; i <16;i++){
        if(lista.itens[i] === undefined){
            lista.itens.push(new Produto("null","null","null","null","null","null","null","null","null","null","null","null","null","../IMAGES/PRODUTOS/produto.png"));
        }
    }
    document.getElementById("linha1").innerHTML = bannerHtml(lista.itens.slice(0,4));
    document.getElementById("linha2").innerHTML = bannerHtml(lista.itens.slice(4,8));
    document.getElementById("linha3").innerHTML = bannerHtml(lista.itens.slice(8,12));
    document.getElementById("linha4").innerHTML = bannerHtml(lista.itens.slice(12));
}

function addProdutoBanner(){
    document.getElementById("banner_lista").innerHTML = bannerHtml(lista.banner.slice(lista.bannerPos,lista.bannerPos+4));
}

function bannerHtml(produtos){
    let txt = "";
    for(let i=0;i< produtos.length;i++){
        txt+= produtos[i].toProdutoHtml();
    }
    return txt;
}

function moverBanner(direcao){
    if(lista.bannerPos > 0){
        document.getElementById("anterior").disabled = false;
    }
    if((direcao<0 && lista.bannerPos > 0) || (lista.bannerPos <8 && direcao>0)){
        lista.bannerPos += direcao;
        addProdutoBanner();
    }
}

function configBotoes(){
    document.getElementById("btn_pag_inicial").setAttribute("onclick","AJAX_listas('"+lista.nome+"','"+lista.tipo+"',"+0+","+filtroLista+")");
    document.getElementById("btn_pag_final").setAttribute("onclick","AJAX_listas('"+lista.nome+"','"+lista.tipo+"',"+lista.qtdTotalPaginas+","+filtroLista+")");
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
    AJAX_listas('"+lista.nome+"','"+lista.tipo+"',"+lista.qtdTotalPaginas+","+filtroLista+");
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
    lista.pag = pagina -1;
    AJAX_listas(lista.nome,lista.tipo,lista.pag,filtroLista)
}

function filtroLista(produto){
    if(lista.filtroMarca.length !== 0){
        if(!lista.filtroMarca.includes(produto.marca)){
            return false;
        }
    }
    if(lista.filtroPreco.length !== 0){
        if(produto.preco < filtroPreco[0] && produto.preco > filtroPreco[1]){
            return false;
        }
    }
    if(lista.filtroTipo.length !== 0){
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