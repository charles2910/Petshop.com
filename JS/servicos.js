let servicos=[];
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
    console.log(logged);
    if(logged === undefined){
        document.getElementById("select_pet").onclick = () =>{
            alert("É preciso estar logado para ver os seus Pets");
        }
        document.getElementById("form_servico").onsubmit = () =>{
            alert("É preciso estar logado para agendar um serviço");
            return false;
        }
    }else{
        for(let i=0; i< logged.pets.length;i++){
            let elem = document.createElement('option')
            elem.text  = logged.pets[i].nome;
            select_pet.add(elem, select_pet.options[i]);
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
            pet_cliente.addServicos(servico.id);
            logged.attPet(pet_cliente);
            await AJAX_geralPUT("http://trabWeb.ddns.net:8082/api/cadastro",logged);
            await AJAX_geralPOST("http://trabWeb.ddns.net:8082/api/servicos",servico);
            let agendamento = new Agendamento(data);
            agendamento.horarios = horarios; 
            agendamento.ocupaHorario(hora);
            await AJAX_geralPOST("http://trabWeb.ddns.net:8082/api/agenda",agendamento);
            alert("Serviço agendado com sucesso!");
            navegarPaginaInicial();
            return false;
        }
    }
    calendario.onchange = async() =>{
        console.log("teste");
        while(select_horarios.length !== 0){
            select_horarios.remove(0);
        }
        let data = await AJAX_geral(`http://trabWeb.ddns.net:8082/api/agendamentos?data=${calendario.value}`)
        horarios = data.horarios;
        for(let i=0; i< horarios.length;i++){
            let elem = document.createElement('option')
            elem.text  = horarios[i];
            select_horarios.add(elem, select_horarios.options[i]);
        }
    }
}

function carregarServicosAdmin(){
    let concluidos = "";
    let agendados = "";
    servicosJSON = await AJAX_geral("http://trabWeb.ddns.net:8082/api/servicos");
    servicosJSON.forEach((servico)=>{
        if(servico.status === "Agendado"){
            agendados+= jsonToHtmlAdminServico(servico);
        }else{
            concluidos+= jsonToHtmlAdminServico(servico);
        }
        servicos.push(jsonToServico(servico));
    });
    document.getElementById("prox_servicos").innerHTML = agendados;
    document.getElementById("ant_servicos").innerHTML = concluidos;
}

function alteraStatusServico(id,status){
    let servico;
    for(servicoProcurado of servicos){
        if(servicoProcurado.id === id){
            servico = servicoProcurado;
            break;
        }
    }
    servico.status = status;
    await AJAX_geralPUT("http://trabWeb.ddns.net:8082/api/servicos",servico);
    carregarServicosAdmin();
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
            txt+=            '<input onclick="alteraStatusServico(\''+json.id+'\',\'Cancelado\')" type="image" src="http://trabWeb.ddns.net:8082/IMAGES/ICONS/fechar.png">'
            txt+=            '<input onclick="alteraStatusServico(\''+json.id+'\',\'Concluído\')" type="image" src="http://trabWeb.ddns.net:8082/IMAGES/ICONS/check.png">'
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