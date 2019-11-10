function carregaPets(){
    let request = db_clientes.transaction("clientes").objectStore("clientes").get(logged.email);
    request.onsuccess = function(event) {
        let txt = "";
        let user = jsonToUser(request.result);
        console.log(user);
        for(let i=0;i<user.pets.length;i++){
            let pet = jsonToPet(request.result.pets[i]);
            txt += pet.petToHtml();
        }
        document.getElementById("pets_cliente").innerHTML = txt;
    }
}

function jsonToPet(json){
    let pet = new Pet(json.nome,
                      json.tipo,
                      json.raca,
                      json.idade,
                      json.peso,
                      json.sexo,
                      (json.servicos !== undefined) ? json.servicos : []
    );
    console.log(pet);
    return pet;
}