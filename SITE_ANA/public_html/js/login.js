function entrar() {
    var formulario = new URLSearchParams(new FormData(document.getElementById("form_login")));

    console.log("FORM LOGIN: ", formulario.get("login"));
    console.log("FORM SENHA: ", formulario.get("senha"));

    fetch("/usuarios/autenticar", {
        method: "POST",
        body: formulario
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {                    
                console.log(json);
                console.log(JSON.stringify(json));

                sessionStorage.LOGIN_USUARIO = json.login;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.ID_USUARIO = json.id;

                setTimeout(function () {
                    window.location = "/index";
                }, 1000);
            });

        } else {

            console.log("Erro de login!");

            resposta.text().then(texto => {
                console.error(texto);                    
                // limparFormulario();
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

function validarSessao() {

    var id = sessionStorage.ID;
    var tipo = sessionStorage.TIPO_USUARIO;
    var nome  = sessionStorage.NOME;
    
    if (id && tipo && nome) {
        window.alert(`Seja bem-vindo, ${nome}!`);
        //h1Titulo.innerHTML = `${login}`;
        window.location = "./dashboard/estufa";
        
    } else {
        //window.location = "login";
    }
}

function sair() {
    sessionStorage.clear();
    window.location = "login";
}