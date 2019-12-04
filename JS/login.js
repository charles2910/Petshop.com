let logged;

async function login(novoUsuario){
    let user
    if(novoUsuario === undefined){
        email = document.getElementById("email_login").value;
        senha = document.getElementById("psw_login").value;
        let tempUser={
            email: email,
            senha: senha
        }
        user = await AJAX_geralPUT("http://trabWeb.ddns.net:8082/api/login",tempUser);
    }else{
        user = novoUsuario;
    }
    if(user !== 'false'){
        logged = jsonToUser(JSON.parse(user));
        console.log(logged);
        if(logged.admin === true){
            document.getElementById("btn_login").innerText = "Admin";
            addOpcoesAdmin();
        }else{
            document.getElementById("btn_login").innerText = "Perfil";
            document.getElementById("btn_login").setAttribute('onclick',"AJAX_navegacao('http://trabWeb.ddns.net:8082/conteudos/perfil.html','Meu Perfil',carregaPerfil);navaegacaoInterativa(id)");  
        }
        popupLogin(false);
    }else{
        console.log(user);
        window.alert("Email ou senha incorretos");
    }
}

function addOpcoesAdmin(){
    document.getElementById("carrinho_div").style.display = "none";
    let newLiProduto = document.createElement("li");
    let newLiAdm = document.createElement("li");
    let produtoLink = document.createElement("a");
    let admLink = document.createElement("a");
    newLiAdm.setAttribute("id","li8");
    newLiProduto.setAttribute("id","li7");
    document.getElementById("btn_login").setAttribute('onclick',"AJAX_navegacao('http://trabWeb.ddns.net:8082/conteudos/perfil_admin.html','Perfil Adiministrador',carregaPerfil);navaegacaoInterativa(id)");
    document.getElementById("li6").setAttribute('onclick',"AJAX_navegacao('http://trabWeb.ddns.net:8082/conteudos/admin_servicos.html','Serviços',carregarServicosAdmin);navaegacaoInterativa(id)");
    produtoLink.appendChild(document.createTextNode("Cadastrar produto"));
    admLink.appendChild(document.createTextNode("Cadastrar admin"));
    produtoLink.setAttribute("href","#");
    admLink.setAttribute("href","#");
    produtoLink.setAttribute("onclick","AJAX_navegacao('http://trabWeb.ddns.net:8082/conteudos/cadastro_produto.html','Cadastro de produto');navaegacaoInterativa(id)");
    admLink.setAttribute("onclick","AJAX_navegacao('http://trabWeb.ddns.net:8082/conteudos/cadastro_admin.html','Cadastro de adiministrador');navaegacaoInterativa(id)");
    newLiProduto.appendChild(produtoLink);
    newLiAdm.appendChild(admLink);
    document.getElementById("ul_navegacao").appendChild(newLiProduto);
    document.getElementById("ul_navegacao").appendChild(newLiAdm);
}

function carregaPerfil(){
    document.getElementById("nome_cliente").value = validaUndefined(logged.nome);
    document.getElementById("ddd_cel").value = validaUndefined(logged.celular[0] +logged.celular[1]);
    document.getElementById("celular").value = validaUndefined(logged.celular.slice(2));
    document.getElementById("nascimento").value = validaUndefined(logged.nascimento);
    document.getElementById("senha1").value = validaUndefined(logged.senha);
    document.getElementById("email").value = validaUndefined(logged.email);
    document.getElementById("email").readOnly = true;
    document.getElementById("ddd_tel").value = validaUndefined(logged.telefone[0]+logged.telefone[1]);
    document.getElementById("telefone").value = validaUndefined(logged.telefone.slice(2));
    document.getElementById("cpf").value = validaUndefined(logged.cpf);
    document.getElementById("complemento").value = validaUndefined(logged.endereco.complemento);
    document.getElementById("numero_casa").value = validaUndefined(logged.endereco.numero);
    document.getElementById("cidade").value = validaUndefined(logged.endereco.cidade);
    document.getElementById("rua").value = validaUndefined(logged.endereco.rua);
    document.getElementById("cep").value =  validaUndefined(logged.endereco.cep);
    document.getElementById("bairro").value = validaUndefined(logged.endereco.bairro);
    document.getElementById("estado").value = validaUndefined(logged.endereco.estado);
    if(!logged.admin){
        document.getElementById("nome_cartao").value = validaUndefined(logged.cartao.nome);
        document.getElementById("numero_cartao").value =  validaUndefined(logged.cartao.numero);
        document.getElementById("validade_cartao").value = validaUndefined(logged.cartao.validade);
        document.getElementById("cvv").value = validaUndefined(logged.cartao.cvv);
    }
}

function validaUndefined(valor){
    if(valor !== undefined){
        return valor;
    }
    else{
        return "";
    }
}
