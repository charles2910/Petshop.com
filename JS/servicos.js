function carregarServicos(){
    let calendario = document.getElementById("data");
    let horariosDisponiveis = document.getElementById("hora");

    dataAtual = new Date();
    dataAtual.setDate(dataAtual.getDate()+1);
    calendario.setAttribute("min",dataAtual.getFullYear()+"-"+(dataAtual.getMonth()+1)+"-"+(dataAtual.getDate()));
    dataAtual.setDate(dataAtual.getDate()+30);
    calendario.setAttribute("max",dataAtual.getFullYear()+"-"+(dataAtual.getMonth()+1)+"-"+(dataAtual.getDate()));
    
    if(logged === undefined){
        document.getElementById("select_pet").onclick = () =>{
            alert("É preciso estar logado para ver os seus Pets");
        }
        document.getElementById("agendar").onclick = () =>{
            alert("É preciso estar logado para agendar um serviço");
        }
    }else{
        let request = db_clientes.transaction("clientes").objectStore("clientes").get(logged.email);
        request.onsuccess = function(event) {
            let cliente = jsonToUser(request.result);
            pets = document.getElementById("select_pet")
            for(let i=0; i< cliente.pets.length;i++){
            let elem = document.createElement('option')
            elem.text  = cliente.pets[i].nome;
            pets.add(elem, pets.options[i]);
            }
        }
        document.getElementById("agendar").onclick = () =>{
            let data = document.getElementById("data").value;
            let hora = document.getElementById("hora").value;
            let id = (data.replace(/-/g,"")+hora.replace(":","")).split('').reverse().join('');
            let servico = new Servico(
                id,
                document.getElementById("tipo_servico").value,
                data,
                hora,
                document.getElementById("descricao_servico").value,
                "-",
                "Agendado"
            )
            console.log(id);
        }   
       
    }

    calendario.onchange= () =>{
        while(horariosDisponiveis.length !== 0){
            horariosDisponiveis.remove(0);
        }
        let request = db_datas.transaction("datas").objectStore("datas").get(calendario.value);
        request.onsuccess = function(event) {
            let horarios;
            if(request.value !== undefined){
                horarios = request.value.horarios;
            }else{
                let data = new DiasDisponiveis();
                horarios = data.horarios;
            }
            for(let i=0; i< horarios.length;i++){
                let elem = document.createElement('option')
                elem.text  = horarios[i];
                horariosDisponiveis.add(elem, horariosDisponiveis.options[i]);
            }
        }
    } 
}