var alertas = 0;
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
// código API

var context = document.getElementById("chart").getContext("2d");
context.canvas.width = 100;
context.canvas.height = 60;

var configuration = {
    type: 'line',
    data: {
        datasets: [{
            label: "Temperatura",
            type: 'line',
            borderColor: ['rgb(112, 173, 71)'],
            backgroundColor: ['rgb(169, 209, 142)']
        }]
    },
    options: {
        scales: {
            xAxes: [{
                distribution: 'series',
                ticks: {
                    beginAtZero:true
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                },
                ticks: {
                    beginAtZero:true
                }
            }]
        },
        animation: {
            duration: 0
        }
    }
};

var chart = new Chart(context, configuration);

// gráfico 2

var context2 = document.getElementById("chart2").getContext("2d");
context2.canvas.width = 100;
context2.canvas.height = 60;

var configuration2 = {
    type: 'line',
    data: {
        datasets: [{
            label: "Luminosidade",
            type: 'line',
            borderColor: ['rgb(112, 173, 71)'],
            backgroundColor: ['rgb(169, 209, 142)']
        }]
    },
    options: {
        scales: {
            xAxes: [{
                distribution: 'series',
                ticks: {
                    beginAtZero:true
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                },
                ticks: {
                    beginAtZero:true
                }
            }]
        },
        animation: {
            duration: 0
        }
    }
};

var chart2 = new Chart(context2, configuration2);


//Função para obter os dados de temperatura do server
//Seria mais interessante fazer isso com WebSocket, porém para fins academicos, os dados serão atualizados via HTTP

//Esse atributo dentro do contexto serve para saber qual foi o último índice processado, assim eliminado os outros elementos na
//hora de montar/atualizar o gráfico
// this.lastIndexTemp = 0;
// this.lastIndexTemp2 = 0;

function get_data(){

    var http = new XMLHttpRequest();
    http.open('GET', 'http://localhost:3000/api', false);
    http.send(null);        
    
    var obj = JSON.parse(http.responseText);

    if (obj.data.length == 0){
        return;
    }

    // var _lastIndexTemp = this.lastIndexTemp;
    // this.lastIndexTemp = obj.data.length;
    listTemp = obj.data;
    //listTemp = obj.data.slice(_lastIndexTemp)
    for(let i=0; i<listTemp.length; i++) {
        data = listTemp[i];
        //Máximo de 60 itens exibidos no gráfico
        if (chart.data.labels.length == 10 && chart.data.datasets[0].data.length == 10){
            chart.data.labels.shift();
            chart.data.datasets[0].data.shift();
        }

        chart.data.labels.push(i);
        chart.data.datasets[0].data.push(parseFloat(data));
        chart.update();


        if (data <= 22.89 || data >= 27.38) {
            chart.data.datasets[0].borderColor = ['rgb(237, 28, 36)'];
            chart.data.datasets[0].backgroundColor =  ['rgb(242, 98, 105)'];
        } else {
            chart.data.datasets[0].borderColor = ['rgb(112, 173, 71)'];
            chart.data.datasets[0].backgroundColor =  ['rgb(169, 209, 142)'];
        }
    };
    
    if (obj.data2.length == 0){
        return;
    }

    // var _lastIndexTemp2 = this.lastIndexTemp2;
    // this.lastIndexTemp2 = obj.data2.length;
    // listTemp2 = obj.data2.slice(_lastIndexTemp2);
    listTemp2 = obj.data2;

    for(let i=0; i<listTemp2.length; i++) {
        data2 = listTemp2[i];
        //Máximo de 60 itens exibidos no gráfico
        if (chart2.data.labels.length == 10 && chart2.data.datasets[0].data.length == 10){
            chart2.data.labels.shift();
            chart2.data.datasets[0].data.shift();
        }

        chart2.data.labels.push(i);
        chart2.data.datasets[0].data.push(parseFloat(data2));
        chart2.update();
        
        if (data2 <= 674.25 || data2 >= 927.25) {
            chart2.data.datasets[0].borderColor = ['rgb(237, 28, 36)'];
            chart2.data.datasets[0].backgroundColor =  ['rgb(242, 98, 105)'];
        } else {
            chart2.data.datasets[0].borderColor = ['rgb(112, 173, 71)'];
            chart2.data.datasets[0].backgroundColor =  ['rgb(169, 209, 142)'];
        }
    }
    if(((listTemp[listTemp.length - 1] <= 22.89 || listTemp[listTemp.length - 1] >= 27.38))
    || (listTemp2[listTemp2.length - 1] <= 674.2 || listTemp2[listTemp2.length - 1] >= 927.25)) alertas++;

    document.getElementById('average').textContent = obj.average;
    document.getElementById('average2').textContent = obj.average2;
} 

setInterval(() => {
    get_data();
    ctg_alertas.innerHTML = 'ALERTAS: ' + alertas;
    if(alertas > 10) {
        alerta_geral.classList = 'alerta_negativo';
        titulo_alerta.innerHTML = 'ALERTA!';
        msg_alerta.innerHTML = 'Ocorreu alguma anormalidade durante o monitoramento. Acesse o histórico para obter mais informações.'
        ctg_alertas.style.backgroundColor = 'red'
        chart.datasets.borderColor = 'red'
    }
}, 1000);
