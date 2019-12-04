class Lista{
    constructor(nome,tipo,filtro,banner,itens,qtdTotalPaginas,pag){
    this.qtdTotalPaginas = qtdTotalPaginas;
    this.tipo = tipo;
    this.nome = nome;
    this.banner = banner;
    this.itens = itens;
    this.filtro = filtro;
    this.bannerPos = 0;
    this.pag = pag;
    }
}

let lista = new Lista();

function carregarLista(novaLista){
    lista = novaLista;
    document.getElementById("anterior").disabled = true;
    addProdutoLinha();
    addProdutoBanner();
    configBotoes();
}

function addProdutoLinha(){
    for(let i =0; i <16;i++){
        if(lista.itens[i] === undefined){
            lista.itens.push(new Produto("null","null","null","null","null","null","null","null","null","null","null","null","null","http://trabWeb.ddns.net:8082/IMAGES/PRODUTOS/produto.png"));
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
    let btn1 = document.getElementById("btn_1");
    let btn2 = document.getElementById("btn_2");
    let btn3 = document.getElementById("btn_3");
    let btn4 = document.getElementById("btn_4");
    let btn5 = document.getElementById("btn_5");
    let btn6 = document.getElementById("btn_6");
    while(parseInt(btn6.textContent) <= lista.qtdTotalPaginas-1 && parseInt(btn3.textContent) <= lista.pag){
        btn1.textContent = parseInt(btn1.textContent) + 1;
        btn2.textContent = parseInt(btn2.textContent) + 1;
        btn3.textContent = parseInt(btn3.textContent) + 1;
        btn4.textContent = parseInt(btn4.textContent) + 1;
        btn5.textContent = parseInt(btn5.textContent) + 1;
        btn6.textContent = parseInt(btn6.textContent) + 1;
    }
    
    for(let i=1 ; i<7;i++){
        if(parseInt(document.getElementById("btn_"+i).textContent) === parseInt(lista.pag)+1){
            document.getElementById("btn_"+i).style.backgroundColor = "lightgray";
            break;
        }
    }
}

function irProFinal(){
    AJAX_listas(lista.nome,lista.filtro,lista.qtdTotalPaginas-1);
}

function irProInicio(){
    AJAX_listas(lista.nome,lista.filtro,0);
}

function mudarPagina(pagina){
    AJAX_listas(lista.nome,lista.filtro,pagina-1);
}

function deletaProduto(){
    let codigo = document.getElementById("codigo").value;
    let request = db_estoque.transaction(["estoque"], "readwrite").objectStore("estoque").delete(codigo);
    request.onsuccess = function(event) {
        alert("Produto removido do estoque");
    };
}