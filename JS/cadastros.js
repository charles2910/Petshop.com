async function cadastrarUsuario(admin,att){
    if(document.getElementById("senha1").value === document.getElementById("senha2").value){
        let endereco = new Endereco(
            document.getElementById("cep").value,
            document.getElementById("rua").value,
            document.getElementById("numero_casa").value,
            document.getElementById("bairro").value,
            document.getElementById("complemento").value,
            document.getElementById("estado").value,
            document.getElementById("cidade").value
            );         
        let cartao;
        if(!admin){
            cartao = new Pagamento(
                document.getElementById("nome_cartao").value,
                document.getElementById("numero_cartao").value,
                document.getElementById("validade_cartao").value,
                document.getElementById("cvv").value
            );
        }
        let cliente = new Cliente(
            document.getElementById("nome_cliente").value,
            document.getElementById("email").value,
            document.getElementById("ddd_cel").value +
            document.getElementById("celular").value,
            document.getElementById("ddd_tel").value +
            document.getElementById("telefone").value,
            document.getElementById("nascimento").value,
            document.getElementById("cpf").value,
            document.getElementById("senha1").value,
            endereco,
            cartao,
            admin
        );
        if(!att){
            let user = await AJAX_geralPOST("http://trabWeb.ddns.net:8082/api/cadastro",cliente);
            if(user === 'false'){
                alert("email já cadastrado!");
            }else{
                alert("dados cadastrados com sucesso!");
            }
        }else{
            let user = await AJAX_geralPUT("http://trabWeb.ddns.net:8082/api/cadastro",cliente);
            if(user !== 'false'){
                logged = jsonToUser(JSON.parse(user));
                alert("Dados alterados com sucesso!");
            }
        }
    }else{
        window.alert("As senhas devem ser identicas");
    }
}

function cadastrarProduto(att){
    let produto = new Produto(
        document.getElementById("nome").value,
        document.getElementById("marca").value,
        (document.getElementById("categoria").value).toLowerCase(),
        (document.getElementById("departamento").value).toLowerCase(),
        parseFloat(document.getElementById("preco").value),
        parseFloat(document.getElementById("preco_promo").value),
        document.getElementById("nome_comp").value,
        document.getElementById("codigo").value,
        parseInt(document.getElementById("qtd").value),
        document.getElementById("lote").value,
        document.getElementById("validade").value,
        document.getElementById("desc").value,
        (document.getElementById("promo_ativ").value === "on") ? true : false,
        "http://trabWeb.ddns.net:8082/IMAGES/PRODUTOS/produto.png"
    );
    if(!att){
        writeDbProduto(produto);
    }else{
        attDbProduto(produto);
        alert("Dados alterados com sucesso!");
    }
    carregaBanners();
}

function cadastrarPet(){
    let pet = new Pet(
        document.getElementById("nome_pet").value,
        document.getElementById("tipo_pet").value,
        document.getElementById("raca_pet").value,
        parseInt(document.getElementById("idade_pet").value),
        parseFloat(document.getElementById("peso_pet").value),
        document.getElementById("sexo_pet").value
    );
    let existe = false;
    for(let i =0; i < logged.pets.length;i++){
        if(logged.pets[i].nome === pet.nome){
            existe = true;
            break;
        }
    }
    if(!existe){
        logged.addPet(pet);
        popupCadastro(false);
        AJAX_navegacao('http://trabWeb.ddns.net:8082/conteudos/pets.html','Meu Perfil',carregaPets);
    }else{
        alert("Esse pet já esta cadastrado!");
    }
}