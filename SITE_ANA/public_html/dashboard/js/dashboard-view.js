
var length = 0;
var num_alertas = 0;
obterEstufas();

function obterEstufas() {
    fetch("/estufa/listar", {
        method: "GET",
    }).then(data => data.json()).then((json) => {
        criarCards(json);
        return json;
    });
}
function criarCards(object) {
    var cards = document.getElementsByClassName("cards")[0];
    cards.innerHTML = "";

    length = object.length;

    for(var i = 0; i < length; i++) {
        cards.innerHTML += `
        <div class="card">
            <h1>Estufa ${i + 1}</h1>
            <div class="temperatura">
                <p class="temp_aquario"></p>
            </div>
            <div class="cor-alerta"></div>
        </div>`;
    }
    atualizacaoPeriodica();
}
function atualizacaoPeriodica() {
    for(let i = 0; i < length; i++) {
        obterdados(i);
    }
    setTimeout(atualizacaoPeriodica, 2000);
}
function obterdados(idAquario) {
    fetch(`http://localhost:3000/api`)
        .then(resposta => {
            if (resposta.ok) {
                resposta.json().then(resposta => {
                    console.log(resposta);
                    // console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                    var dados = {
                        temperatura: resposta.data2[resposta.data2.length - 1],
                        luminosidade: resposta.data[resposta.data.length - 1],
                    }

                    alertar(dados, idAquario);
                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`);
        });
}

function alertar(dados, idAquario) {
    var temperatura = dados.temperatura;
    var luminosidade = dados.luminosidade;

    var limites = {
        muito_quente: 25,
        quente: 22,
        ideal:20,
        frio: 10,
        muito_frio: 5
    };

    var classe_temperatura = 'card';

    if (temperatura >= limites.muito_quente) {
        classe_temperatura = 'card perigo-quente';
    }
    else if (temperatura < limites.muito_quente && temperatura >= limites.quente) {
        classe_temperatura = 'card alerta-quente';
    }
    else if (temperatura < limites.quente && temperatura > limites.frio) {
        classe_temperatura = 'card ideal';
    }
    else if (temperatura <= limites.frio && temperatura > limites.muito_frio) {
        classe_temperatura = 'card alerta-frio';
    }
    else if (temperatura < limites.min_temperatura) {
        classe_temperatura = 'card perigo-frio';
    }
    
    document.getElementsByClassName("card")[idAquario].className = classe_temperatura;
    document.getElementsByClassName("temp_aquario")[idAquario].innerHTML = `${temperatura} °C<br>${luminosidade} -L`;
}

// FUNÇÕES DO DASHBOARD HIDRO CONTROL
function show_cadastro(){
    if (cads.style.display == 'none'){
        cads.style.display = 'block';
        li_cadastros_icon.innerHTML = "&#9660;";
    } else {
        cads.style.display = 'none';
        li_cadastros_icon.innerHTML = "&#9654;";
    }
};
function show_dashboard(){
    if (estufasContainer.style.display == 'none'){
        estufasContainer.style.display = 'block';
        li_dashboard_icon.innerHTML = "&#9660;";
    } else {
        estufasContainer.style.display = 'none';
        li_dashboard_icon.innerHTML = "&#9654;";
    }
};
