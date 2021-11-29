// sessão
function validarSessao(path) {
    var id = sessionStorage.ID;
    var tipo = sessionStorage.TIPO_USUARIO;
    var nome  = sessionStorage.NOME;
    
    if (id && tipo && nome) {
        var nomeCliente = document.getElementById("nomeCliente");
        if(nomeCliente) {
            nomeCliente.textContent = nome;
        }
    } else {
        window.location = path;
    }
}

function sair() {
    sessionStorage.clear();
    window.location = "../login";
}
