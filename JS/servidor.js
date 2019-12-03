let db_clientes;
let db_estoque;
let db_agendamentos;
let db_servicos;
let banners = new Banner();

window.onload = () =>{
    let loadUsuario = false;
    let request = window.indexedDB.open("clientes",1);
    request.onsuccess = (event)=>{
        db_clientes = request.result;
        if(loadUsuario){
            let admin = new Cliente("admin","admin@admin.com","99999999999","99999999999","2000-01-01","99999999999","admin","","",true);
            let user = new Cliente("user","user@user.com","99999999999","99999999999","2000-01-01","99999999999","user","","",false);
            writeDbCliente(admin);
            writeDbCliente(user);
        }
    }
    request.onupgradeneeded= (event) =>{
        db_clientes = event.target.result;
        let objectStore = db_clientes.createObjectStore("clientes",{keyPath: "email"});
        objectStore.createIndex("email","email",{unique: true});
        loadUsuario = true;
    }
    let loadEstoque = false;

    let request2 = window.indexedDB.open("estoque",1);
    request2.onsuccess = async (event)=>{
        db_estoque = request2.result;
        if(loadEstoque){
            await carregarProdutos();
        }
        await carregaBanners();
        AJAX_navegacao("http://trabWeb.ddns.net:8082/conteudos/principal.html","",()=>{
            carregarPaginaInicial(banners.geral1,banners.geral2,banners.geral3);
        });
    }
    request2.onupgradeneeded = (event) =>{
        db_estoque = event.target.result;
        let objectStore = db_estoque.createObjectStore("estoque",{keyPath: "codigo"});
        objectStore.createIndex("codigo","codigo",{unique: true});
        objectStore.createIndex("categoria","categoria",{unique: false});
        objectStore.createIndex("departamento","departamento",{unique: false});
        objectStore.createIndex("nomeCompleto","nomeCompleto",{unique: false});
        loadEstoque = true;
    }

    let request3 = window.indexedDB.open("agendamentos",1);
    request3.onsuccess = (event)=>{
        db_agendamentos = request3.result;
    }
    request3.onupgradeneeded = (event) =>{
        db_agendamentos = event.target.result;
        let objectStore = db_agendamentos.createObjectStore("agendamentos",{keyPath: "data"});
        objectStore.createIndex("data","data",{unique: true});
    }

    let request4 = window.indexedDB.open("servicos",1);
    request4.onsuccess = (event)=>{
        db_servicos = request4.result;
    }
    request4.onupgradeneeded = (event) =>{
        db_servicos = event.target.result;
        let objectStore = db_servicos.createObjectStore("servicos",{keyPath: "id"});
        objectStore.createIndex("id","id",{unique: true});
    }
}

async function writeDbCliente(cliente){
    return await new Promise( (resolve) => {
        let transaction = db_clientes.transaction(["clientes"],"readwrite");
        let objectStore = transaction.objectStore("clientes");
        let request = objectStore.add(cliente);
        request.onsuccess = (event) =>{
            resolve(true);
        }
        request.onerror = (event) =>{
            window.alert("Email já cadastrado");
            return false;
        }
    });
}

async function attDbCliente(cliente){
    return new Promise( (resolve,reject) => {
        let transaction = db_clientes.transaction(["clientes"],"readwrite");
        let objectStore = transaction.objectStore("clientes");
        let request = objectStore.put(cliente);
        request.onsuccess = (event) =>{
            resolve(true);
        }
    });
}

async function writeDbServico(servico){
    return new Promise( (resolve) => {
        let transaction = db_servicos.transaction(["servicos"],"readwrite");
        let objectStore = transaction.objectStore("servicos");
        let request = objectStore.put(servico);
        request.onsuccess = (event) =>{
            resolve(true);
        }
    });
}

async function writeDbData(data){
    return new Promise( (resolve) => {
        let transaction = db_agendamentos.transaction(["agendamentos"],"readwrite");
        let objectStore = transaction.objectStore("agendamentos");
        let request = objectStore.put(data);
        request.onsuccess = (event) =>{
            resolve(true);
        }
    });
}

async function writeDbProduto(produto){
    return new Promise( (resolve,reject) => {
        let transaction = db_estoque.transaction(["estoque"],"readwrite");
        let objectStore = transaction.objectStore("estoque");
        let request = objectStore.add(produto);
        request.onsuccess = (event) =>{
            resolve();
            return true;
        }
        request.onerror = (event) =>{
            window.alert("Código já cadastrado");
            reject();
            return false;
        }
    });
}

async function attDbProduto(produto){
    return new Promise( (resolve,reject) => {
        let transaction = db_estoque.transaction(["estoque"],"readwrite");
        let objectStore = transaction.objectStore("estoque");
        let request = objectStore.put(produto);
        request.onsuccess = (event) =>{
            resolve(true);
        }
    });
}

async function carregarProdutos(){
    let departamento = ["acessórios","alimentos","brinquedos","higiene","saúde"]
        return new Promise( async (resolve) =>{
        for(let i = 0; i<5;i++){
            let xhttp = new XMLHttpRequest();
            await new Promise((resolve) =>{
                xhttp.onreadystatechange = async function(){
                    if(this.readyState == 4 && this.status == 200){
                        let temp = JSON.parse(this.responseText);
                        for(let j=0; j<temp.length;j++){
                            await writeDbProduto(temp[j]); 
                        }
                        resolve(true);
                    }
                }
                xhttp.open("GET","http://trabWeb.ddns.net:8082/produtos/"+departamento[i]+".json");
                xhttp.send();
            });
        }
        resolve(true);
        });
}

async function carregaBanners(){
    return new Promise( (resolve)=> {
        let promocoes = [];
        let objectStore = db_estoque.transaction("estoque").objectStore("estoque");
        objectStore.openCursor().onsuccess = function(event) {
            let cursor = event.target.result;
            if (cursor) {
                if(cursor.value.promocao){
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
                    if(banners.geral1.length <10){
                        banners.geral1.push(promocoes[i]);
                    }
                }
                promocoes.sort(compare1);
                banners.geral2 = promocoes.slice(0,10);
                promocoes.sort(compare2);
                let i=0;
                while(banners.geral3.length < 10){
                    if(promocoes[i].qtdEstoque !==0 && i<= promocoes.length){
                        banners.geral3.push(promocoes[i]);
                    }
                    i++;
                }
                
                resolve();
            }
        }
    });    
}

function compare(a,b){//Ordena pela % do precao
    return b.precoPromocional-a.precoPromocional;
}

function compare1(a,b){//ordena pelo desconto real
    return   ((b.preco) - (b.preco) *((100-b.precoPromocional)/100)) - (a.preco - (a.preco)*((100-a.precoPromocional)/100));
}

function compare2(a,b){//Ordena pela quantidade em estoque
    return a.qtdEstoque - b.qtdEstoque;
}
