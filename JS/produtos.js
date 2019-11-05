function carregarProdutos(){
    let departamento = ["acessórios","alimentos","brinquedos","higiene","saúde","serviços"]
    for(let i = 0; i<5;i++){
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                let temp = JSON.parse(this.responseText);
                for(let j=0; j<temp.length;j++){
                    let temp2 = new Produto(temp[j].nomeComercial,
                                            temp[j].marca,
                                            temp[j].categoria,
                                            temp[j].departamento,
                                            temp[j].preco,
                                            temp[j].precoPromocional,
                                            temp[j].nomeCompleto,
                                            temp[j].codigo,
                                            temp[j].qtdEstoque,
                                            temp[j].lote,
                                            temp[j].validade,
                                            temp[j].descricao,
                                            temp[j].promocao,
                                            temp[j].imgPath,
                                            );
                    if(i===0){
                        estoque.acessorios.push(temp2);
                    }else if(i===1){
                        estoque.alimentos.push(temp2);
                    }else if(i===2){
                        estoque.brinquedos.push(temp2);
                    }else if(i===3){
                        estoque.higiente.push(temp2);
                    }else if(i===4){
                        estoque.saude.push(temp2);
                    } 
                }
            }
        }
        xhttp.open("GET","../produtos/"+departamento[i]+".json");
        xhttp.send();
    }
    console.log(estoque);

}

function busca(tipo,nome,qtd){
    if(tipo === "departamento"){

    }else if(tipo === "categoria"){
        
    }else if( tipo === "any"){

    }
}

function orderna(key){
    
}