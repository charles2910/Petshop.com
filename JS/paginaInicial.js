let banners = new Banner();

window.onload = () =>{
    navegarPaginaInicial();
}

function navegarPaginaInicial(){
    AJAX_navegacao('http://trabWeb.ddns.net:8082/conteudos/principal.html','',async ()=>{
        let tempBanner = await AJAX_geral("http://trabWeb.ddns.net:8082/api/bannersPrincipal");
        banners = new Banner();
        for(let i=0;i<3;i++){
            tempBanner[i].forEach((produto)=>{
                banners["geral"+(i+1)].push(jsonToProduto(produto));
            })
        }
        carregarPaginaInicial();
    });
}

class PaginaInicial{
    constructor(banner1,banner2,banner3){
        this.banner1 = banner1;
        this.banner2 = banner2;
        this.banner3 = banner3;
        this.banner1Pos = 0;
        this.banner2Pos = 0;
        this.banner3Pos = 0;
    }
}

let paginaInicial;

function carregarPaginaInicial(){
    paginaInicial = new PaginaInicial(banners.geral1,banners.geral2,banners.geral3);
    addProdutoBannerGeral("ofertas_dia",paginaInicial.banner1,paginaInicial.banner1Pos);
    addProdutoBannerGeral("oferta_economia",paginaInicial.banner2,paginaInicial.banner2Pos);
    addProdutoBannerGeral("oferta_acabando",paginaInicial.banner3,paginaInicial.banner3Pos);
    configOnclick();
}

function configOnclick(){
    document.getElementById("anterior1").onclick = ()=> {
        if(moverBannerGeral(-1,"ofertas_dia",paginaInicial.banner1,paginaInicial.banner1Pos)){
            paginaInicial.banner1Pos--;
        }
    }
    document.getElementById("proximo1").onclick = ()=> {
        if(moverBannerGeral(1,"ofertas_dia",paginaInicial.banner1,paginaInicial.banner1Pos)){
            paginaInicial.banner1Pos++;
        }
    }
    document.getElementById("anterior2").onclick = ()=> {
        if(moverBannerGeral(-1,"oferta_economia",paginaInicial.banner2,paginaInicial.banner2Pos)){
            paginaInicial.banner2Pos--;
        }
    }
    document.getElementById("proximo2").onclick = ()=> {
        if(moverBannerGeral(1,"oferta_economia",paginaInicial.banner2,paginaInicial.banner2Pos)){
            paginaInicial.banner2Pos++;
        }
    }
    document.getElementById("anterior3").onclick = ()=> {
        if(moverBannerGeral(-1,"oferta_acabando",paginaInicial.banner3,paginaInicial.banner3Pos)){
            paginaInicial.banner3Pos--;
        }
    }
    document.getElementById("proximo3").onclick = ()=> {
        if(moverBannerGeral(1,"oferta_acabando",paginaInicial.banner3,paginaInicial.banner3Pos)){
            paginaInicial.banner3Pos++;
        }
    }
    document.getElementById("logo").onclick = ()=> {
        AJAX_navegacao('http://trabWeb.ddns.net:8082/conteudos/principal.html','',()=>{
            carregarPaginaInicial(paginaInicial.banner1,paginaInicial.banner2,paginaInicial.banner3)
        });
    }
    document.getElementById("li0").onclick= ()=>{
        AJAX_navegacao("http://trabWeb.ddns.net:8082/conteudos/principal.html","",()=>{
            carregarPaginaInicial(paginaInicial.banner1,paginaInicial.banner2,paginaInicial.banner3)
        }); 
        navaegacaoInterativa("li0");
    }

    document.getElementById("btn_buscador").onclick = () =>{
        let txt = document.getElementById("buscador").value;
        AJAX_listas(txt,3,0);
    }
}

function addProdutoBannerGeral(id,banner,pos){
    document.getElementById(id).innerHTML = bannerHtml(banner.slice(pos,pos+4));
}

function moverBannerGeral(direcao,id,banner,pos){
    if((direcao< 0 && pos > 0) || (pos <6 && direcao>0)){
        pos += direcao;
        addProdutoBannerGeral(id,banner,pos);
        return true;
    }
}

function pesquisar(produto){
    let txt = document.getElementById("buscador").value;
    txt = txt.toLowerCase();
    txt = txt.split(" ");
    let compare = produto.nomeCompleto.toLowerCase();
    for(let i=0; i< txt.length;i++){
        if(compare.includes(txt[i])){
            return true;
        }
    }
    return false;
}