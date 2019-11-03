
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
    //console.log(xhttp);
    xhttp.open("GET",arquivo);
    xhttp.send();
}