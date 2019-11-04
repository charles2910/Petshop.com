let db_clientes;
let logged = false;
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

function login(){
    let nome = document.getElementById("email_login").value;
    let senha = document.getElementById("psw_login").value;
    if(nome === "admin" && senha === "admin"){
        logged = admin;
    }else if(nome === "user" && senha === "user"){
        logged = user_teste
    }else{
        let transaction = db_clientes.transaction(["clientes"]);
        let objectStore = transaction.objectStore("clientes");
        let request = objectStore.get(nome);

        request.onerror = (event)=>{
            window.alert("Email ou senha incorretos");
        }
        request.onsuccess = (event) =>{
            if(request.result !== undefined){
                let cliente = request.result;
                if(cliente.senha === senha){
                    logged = "usuario";
                }
                console.log(cliente);
            }else{
                window.alert("Email ou senha incorretos");
            }
        }
    }
}

function AssistChat(acao){
    if(acao){
        document.getElementById("popupChatDiv").style.display="block";
    }else{
        document.getElementById("popupChatDiv").style.display="none";
    }
}
function popupSenha(acao){
    if(acao){
        document.getElementById("janela_popup_senha").style.display="block";
        document.getElementById("login_form_popup").style.display="none";
    }else{
        document.getElementById("janela_popup_senha").style.display="none";
    }
}

function popupLogin(acao){
    if(acao){
        document.getElementById("login_form_popup").style.display="block";
    }else{
        document.getElementById("login_form_popup").style.display="none";
    }
}

function popupCadastro(acao){
    if(acao){
        document.getElementById("cadastro_form_popup").style.display="block";
    }else{
        document.getElementById("cadastro_form_popup").style.display="none";
    }
}

function servicoPet(acao,id){
    if(acao){
        document.getElementById(id).style.display="block";
    }else{
        document.getElementById(id).style.display="none";
    }
}

function navegarCompra(){
    AJAX_navegacao("../conteudos/compra.html");
}

class Cliente{
    constructor(nome, email, celular,telefone,nascimento,cpf,senha,endereco,cartao,admin){
        this.nome = nome;
        this.email = email;
        this.celular = celular;
        this.telefone = telefone;
        this.nascimento = nascimento;
        this.cpf = cpf;
        this.admin = admin;
        this.senha = senha;
        this.endereco = endereco;
        this.cartao = cartao;
    }
}

class Endereco{
    constructor(cep,rua,numero,bairro,complemento,estado,cidade){
        this.cep = cep;
        this.rua = rua;
        this.numero = numero;
        this.bairro = bairro;
        this.complemento = complemento;
        this.estado = estado;
        this.cidade = cidade;
    }
}

class Pagamento{
    constructor(nome,numero,validade,cvv){
        this.nome = nome;
        this.numero = numero;
        this.validade = validade;
        this.cvv = cvv;
    }
}

function cadastrarCliente(){
    if(document.getElementById("senha1").value === document.getElementById("senha2").value){
        let endereco = new Endereco(
            document.getElementById("cep").value,
            document.getElementById("rua").value,
            document.getElementById("numero_casa").value,
            document.getElementById("bairro").value,
            document.getElementById("complemento").value,
            document.getElementById("estado").value,
            document.getElementById("cidade").value
        )

        let cartao = new Pagamento(
            document.getElementById("nome_cartao").value,
            document.getElementById("nmr_cartao").value,
            document.getElementById("validade_cartao").value,
            document.getElementById("cvv").value
        )

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
            false
        )
        writeDb(cliente);
    }else{
        window.alert("As senhas devem ser identicas");
    }
}

function AJAX_navegacao(arquivo,id,pagina_atual){
    
    let xhttp = new XMLHttpRequest();
    if(id !== undefined || id !== false){
        for(let i=0;i<7;i++){
            if("li" + i !== id){
                document.getElementById("li" + i ).style.backgroundColor = "yellow";
            }else{
                document.getElementById("li" + i).style.backgroundColor = "white";
            }
        }   
    }
    if(pagina_atual !== undefined){
        document.getElementById("pagina_atual").innerHTML = pagina_atual;
    }
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            document.getElementById("janela_de_conteudo").innerHTML = this.responseText;
        }
    }
    xhttp.open("GET",arquivo);
    xhttp.send();
}