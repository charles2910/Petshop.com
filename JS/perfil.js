function carregaPets(){
    let request = db_clientes.transaction("clientes").objectStore("clientes").get(logged.email);
    request.onsuccess = function(event) {
        let txt = "";
        let user = jsonToUser(request.result);
        for(let i=0;i<user.pets.length;i++){
            let pet = jsonToPet(request.result.pets[i]);
            txt += pet.petToHtml();
        }
        document.getElementById("pets_cliente").innerHTML = txt;
    }
}
