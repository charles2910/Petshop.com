let db_clientes;
window.onload = () =>{
    console.log("carregada");
    let request = window.indexedDB.open("clientes",1);
    request.onsuccess = (event)=>{
        db_clientes = request.result;
    }
    request.onupgradeneeded= (event) =>{
        db_clientes = event.target.result;
        let objectStore = db_clientes.createObjectStore("clientes",{keyPath: "email"});
        objectStore.createIndex("email","email",{unique: true})

    }

}

function writeDb(cliente){
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

function servicoPet(acao,id){
    if(acao){
        document.getElementById(id).style.display="block";
    }else{
        document.getElementById(id).style.display="none";
    }
}

