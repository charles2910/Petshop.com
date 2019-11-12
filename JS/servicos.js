function carregarServicos(){
    let calendario = document.getElementById("data");
    let select_horarios = document.getElementById("hora");
    let select_pet = document.getElementById("select_pet")
    let horarios;
    dataAtual = new Date();
    dataAtual.setDate(dataAtual.getDate()+1);
    calendario.setAttribute("min",dataAtual.getFullYear()+"-"+(dataAtual.getMonth()+1)+"-"+(dataAtual.getDate()));
    dataAtual.setDate(dataAtual.getDate()+30);
    calendario.setAttribute("max",dataAtual.getFullYear()+"-"+(dataAtual.getMonth()+1)+"-"+(dataAtual.getDate()));
    if(logged === undefined){

        document.getElementById("select_pet").onclick = () =>{
            alert("É preciso estar logado para ver os seus Pets");
        }
        document.getElementById("form_servico").onsubmit = () =>{
            alert("É preciso estar logado para agendar um serviço");
            return false;
        }
    }else{
        let request = db_clientes.transaction("clientes").objectStore("clientes").get(logged.email);
        request.onsuccess = function(event) {
            let cliente = jsonToUser(request.result);
            for(let i=0; i< cliente.pets.length;i++){
                let elem = document.createElement('option')
                elem.text  = cliente.pets[i].nome;
                select_pet.add(elem, select_pet.options[i]);
            }
        }
        document.getElementById("form_servico").onsubmit = async () =>{
            let data = document.getElementById("data").value;
            let hora = document.getElementById("hora").value;
            let id = (data.replace(/-/g,"")+hora.replace(":","")).split('').reverse().join('');
            let pet_cliente;
            for(let i =0; i <logged.pets.length;i++){
                if(logged.pets[i].nome === select_pet.value){
                    pet_cliente = logged.pets[i];
                    break;
                }
            }
            let servico = new Servico(
                id,
                document.getElementById("tipo_servico").value,
                pet_cliente,
                data,
                hora,
                document.getElementById("descricao_servico").value,
                "-",
                "Agendado"
            )
            await writeDbServico(servico);
            let agendamento = new Agendamento(data);
            agendamento.horarios = horarios; 
            agendamento.ocupaHorario(hora);
            await writeDbData(agendamento);
            return false;
        }   
       
    }

    calendario.onchange= () =>{
        while(select_horarios.length !== 0){
            select_horarios.remove(0);
        }
        let request = db_agendamentos.transaction("agendamentos").objectStore("agendamentos").get(calendario.value);
        request.onsuccess = function(event) {
            if(request.result !== undefined){
                horarios = request.result.horarios;
            }else{
                let data = new Agendamento();
                horarios = data.horarios;
            }
            for(let i=0; i< horarios.length;i++){
                let elem = document.createElement('option')
                elem.text  = horarios[i];
                select_horarios.add(elem, select_horarios.options[i]);
            }
        }
    } 
}