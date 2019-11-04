let logged = false;

function login(email1, senha1){
    let email;
    let senha;
    if(email === undefined && senha === undefined){
    email = document.getElementById("email_login").value;
    senha = document.getElementById("psw_login").value;
    }else{
        email = email1;
        senha = senha1;
    }
    if(email === "admin@admin.com" && senha === "admin"){
        logged = "admin";
        popupLogin(false)
    }else if(email === "user@user.com" && senha === "user"){
        logged = "user_teste";
        popupLogin(false)
    }else{

        let transaction = db_clientes.transaction(["clientes"]);
        let objectStore = transaction.objectStore("clientes");
        let request = objectStore.get(email);

        request.onerror = (event)=>{
            window.alert("Email ou senha incorretos");
        }
        request.onsuccess = (event) =>{
            if(request.result !== undefined){
                let user = request.result;
                if(user.senha === senha){
                    if(user.admin === true){
                        logged = user;
                        document.getElementById("btn_login").innerText = "Admin";
                        addOpcoesAdmin();
                        popupLogin(false);
                    }else{
                        logged = user;
                        document.getElementById("btn_login").innerText = "Perfil";
                        document.getElementById("btn_login").setAttribute('onclick',"AJAX_navegacao('../conteudos/perfil.html',false,'Meu Perfil')");
                        popupLogin(false);
                        AJAX_navegacao('../conteudos/perfil.html',false,'Meu Perfil');
                    }
                }else{
                    window.alert("Email ou senha incorretos");
                }
            }else{
                window.alert("Email ou senha incorretos");
            }
        }
    }
}

function addOpcoesAdmin(){
    let newLiProduto = document.createElement("li");
    let newLiAdm = document.createElement("li");
    let produtoLink = document.createElement("a");
    let admLink = document.createElement("a");
    newLiAdm.setAttribute("id","li8");
    newLiProduto.setAttribute("id","li7");
    document.getElementById("btn_login").setAttribute('onclick',"AJAX_navegacao('../conteudos/cadastro_admin.html',false,'Perfil Adiministrador')");
    document.getElementById("li6").setAttribute('onclick',"AJAX_navegacao('../conteudos/admin_servicos.html','li6','Serviços')");
    produtoLink.appendChild(document.createTextNode("Cadastrar produto"));
    admLink.appendChild(document.createTextNode("Cadastrar admin"));
    produtoLink.setAttribute("href","#");
    admLink.setAttribute("href","#");
    produtoLink.setAttribute("onclick","AJAX_navegacao('../conteudos/cadastro_produto.html','li7','Cadastro de produto')");
    admLink.setAttribute("onclick","AJAX_navegacao('../conteudos/cadastro_admin.html','li8','Cadastro de adiministrador')");
    newLiProduto.appendChild(produtoLink);
    newLiAdm.appendChild(admLink);
    document.getElementById("ul_navegacao").appendChild(newLiProduto);
    document.getElementById("ul_navegacao").appendChild(newLiAdm);
}