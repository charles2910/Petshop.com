let db_clientes;
let db_estoque;

window.onload = () =>{
    console.log("carregada");
    let loadUsuario = false;
    let request = window.indexedDB.open("clientes",1);
    request.onsuccess = (event)=>{
        db_clientes = request.result;
        if(loadUsuario){
            let admin = new Cliente("admin","admin@admin.com","99999999999","99999999999","1-1-2000","99999999999","admin","","",true);
            let user = new Cliente("user","user@user.com","99999999999","99999999999","1-1-2000","99999999999","user","","",false);
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
            carregarProdutos();
        }
        carregaBanners()
        AJAX_navegacao("../conteudos/principal.html",false,"",carregarInicial());
    }
    request2.onupgradeneeded= (event) =>{
        db_estoque = event.target.result;
        let objectStore = db_estoque.createObjectStore("estoque",{keyPath: "codigo"});
        objectStore.createIndex("codigo","codigo",{unique: true});
        objectStore.createIndex("categoria","categoria",{unique: false});
        objectStore.createIndex("departamento","departamento",{unique: false});
        loadEstoque = true;
    }
}

function writeDbCliente(cliente){
    let transaction = db_clientes.transaction(["clientes"],"readwrite");
    let objectStore = transaction.objectStore("clientes");
    let request = objectStore.add(cliente);
    request.onsuccess = (event) =>{
        console.log("sucesso")
        return true;
    }
    request.onerror = (event) =>{
        window.alert("Email já cadastrado");
        return false;
    }
}

function writeDbProduto(produto){
    let transaction = db_estoque.transaction(["estoque"],"readwrite");
    let objectStore = transaction.objectStore("estoque");
    let request = objectStore.add(produto);
    request.onsuccess = (event) =>{
        console.log("sucesso")
        return true;
    }
    request.onerror = (event) =>{
        window.alert("Código já cadastrado");
        return false;
    }
}

function servicoPet(acao,id){
    if(acao){
        document.getElementById(id).style.display="block";
    }else{
        document.getElementById(id).style.display="none";
    }
}



