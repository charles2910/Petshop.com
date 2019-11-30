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
            pet_cliente = jsonToPet(pet_cliente);
            let servico = new Servico(
                id,
                logged,
                document.getElementById("tipo_servico").value,
                pet_cliente,
                data,
                hora,
                document.getElementById("descricao_servico").value,
                "-",
                "Agendado"
            )
            pet_cliente.addServicos(servico);
            logged.attPet(pet_cliente);
            attDbCliente(logged);
            await writeDbServico(servico);
            let agendamento = new Agendamento(data);
            agendamento.horarios = horarios; 
            agendamento.ocupaHorario(hora);
            await writeDbData(agendamento);
            carregarServicos();
            alert("Serviço agendado com sucesso!");
            banners.geral1,banners.geral2
            AJAX_navegacao("http://trabWeb.ddns.net:8081/conteudos/principal.html","",()=>{
                carregarPaginaInicial(paginaInicial.banner1,paginaInicial.banner2,paginaInicial.banner3);
            }); 
            navaegacaoInterativa("li0");
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

function carregarServicosAdmin(){
    let concluidos = "";
    let agendados = "";
    return new Promise((resolve) => {
        let objectStore = db_servicos.transaction("servicos").objectStore("servicos");
        objectStore.openCursor().onsuccess = (event)=>{
            let cursor = event.target.result;
            if(cursor){
                if(cursor.value.status === "Agendado"){
                    agendados+= jsonToHtmlAdminServico(cursor.value);
                }else{
                    concluidos+= jsonToHtmlAdminServico(cursor.value);
                }
                cursor.continue();
            }else{
                document.getElementById("prox_servicos").innerHTML = agendados;
                document.getElementById("ant_servicos").innerHTML = concluidos;
            }
        }
    });
}

function statusServico(id,status){
    let request = db_servicos.transaction("servicos").objectStore("servicos").get(id);
    request.onsuccess = function(event) {
        request.result.status = status;
        writeDbServico(request.result);
        carregarServicosAdmin();
    }
    
}

function jsonToHtmlAdminServico(json){
    let txt=    '<div class="servicos_admin">'
        txt+=        '<div class="dados_cliente">'
        txt+=        '<h3>Cliente</h3>'
        txt+=            '<p>Nome: '+json.dono.nome+'</p>'
        txt+=            '<p>Email: '+json.dono.email+'</p>'
        txt+=            '<p>Celular: '+json.dono.celular+'</p>'
        txt+=        '</div>'
        txt+=        '<div class="endereco_cliente">'
        txt+=            '<h3>Endereço</h3>'
        txt+=            '<p>Cidade: '+json.dono.endereco.cidade+','+json.dono.endereco.estado+'</p>'
        txt+=            '<p>Bairro: '+json.dono.endereco.bairro+'</p>'
        txt+=            '<p>Rua: '+json.dono.endereco.rua+'</p>'
        txt+=            '<p>Número: '+json.dono.endereco.numero+'</p>'
        txt+=        '</div>'
        txt+=        '<div class="dados_animal">'
        txt+=            '<h3>Animal</h3>'
        txt+=            '<p>Nome: '+json.pet.nome+'</p>'
        txt+=            '<p>Especie: '+json.pet.tipo+','+json.pet.raca+'</p>'
        txt+=            '<p>Especificacões: <br>'+json.detalhes+'</p>'
        txt+=        '</div>'
        txt+=        '<div class="dados_servico">'
        txt+=            '<h3>Serviço</h3>'
        txt+=            '<p>Serviço: '+json.tipo+'</p>'
        txt+=            '<p>Dia: '+dateToNormalDate(json.data)+'</p>'
        txt+=            '<p>Horas: '+json.hora+'</p>'
        txt+=        '</div>'
        if(json.status === "Agendado"){
            txt+=        '<div class="botoes_servico">'
            txt+=            '<input onclick="statusServico(\''+json.id+'\',\'Cancelado\')" type="image" src="http://trabWeb.ddns.net:8081/IMAGES/ICONS/fechar.png">'
            txt+=            '<input onclick="statusServico(\''+json.id+'\',\'Concluído\')" type="image" src="http://trabWeb.ddns.net:8081/IMAGES/ICONS/check.png">'
            txt+=        '</div>'
        }else{
            txt+=        '<div class="servico_status">'
            txt+=            '<h3>Status</h3>'
            txt+=            '<p>Serviço: '+json.status+'</p>'
            if(json.tstus === 'Cancelado'){
                txt+=            '<p>Pagamento: - </p>'
            }else{
                txt+=            '<p>Pagamento: Recebido </p>'
            }
            txt+=        '</div>'
        }
        txt+=   '</div>'
        return txt;
}