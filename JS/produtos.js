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
    let objectStore = db_estoque.transaction("estoque").objectStore("estoque");
    objectStore.openCursor().onsuccess = function(event) {
        let cursor = event.target.result;
        if (cursor) {
            if(cursor.value.promocao ==="true"){
                let temp2 = new Produto(cursor.value.nomeComercial,
                                            cursor.value.marca,
                                            cursor.value.categoria,
                                            cursor.value.departamento,
                                            cursor.value.preco,
                                            cursor.value.precoPromocional,
                                            cursor.value.nomeCompleto,
                                            cursor.value.codigo,
                                            cursor.value.qtdEstoque,
                                            cursor.value.lote,
                                            cursor.value.validade,
                                            cursor.value.descricao,
                                            cursor.value.promocao,
                                            cursor.value.imgPath,
                                            );
                promocoes.push(temp2)
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

function carregarInicial(){

}