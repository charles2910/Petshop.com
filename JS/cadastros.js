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