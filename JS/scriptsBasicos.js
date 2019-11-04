let db_clientes;
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

function cadastrarUsuario(admin){
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
        let cartao;
        if(!admin){
            cartao = new Pagamento(
                document.getElementById("nome_cartao").value,
                document.getElementById("nmr_cartao").value,
                document.getElementById("validade_cartao").value,
                document.getElementById("cvv").value
            )
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
        )
        if(writeDb(cliente)){
            login(cliente.email, cliente.senha);
        }
    }else{
        window.alert("As senhas devem ser identicas");
    }
}

function AJAX_navegacao(arquivo,id,pagina_atual){
    
    let xhttp = new XMLHttpRequest();
    let i=0;
    if(id !== undefined || id !== false){
        while(document.getElementById("li" + i )!== null){
            if("li" + i !== id){
                document.getElementById("li" + i ).style.backgroundColor = "yellow";
            }else{
                document.getElementById("li" + i).style.backgroundColor = "white";
            }
            i++ 
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