
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
    constructor(nome, email, celular,telefone,nascimento,cpf,senha,endereco,cartao){
        this.nome = nome;
        this.email = email;
        this.celular = celular;
        this.telefone = telefone;
        this.nascimento = nascimento;
        this.cpf = cpf;
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
            document.getElementById("cpf").senha,
            endereco,
            cartao
        )
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