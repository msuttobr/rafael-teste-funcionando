var database = require("../database/config");

function cadastrar(obj) {
    console.log("ACESSEI O PRODUTO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar()");
    var instrucao = `
        INSERT INTO produto (nomeProduto, temperatura_min, temperatura_max, luminosidade_min, luminosidade_max) VALUES ('${obj.nome}', '${obj.tmp_min}', '${obj.tmp_max}', '${obj.lum_min}', '${obj.lum_max}');
    `;
    console.log("Executando a instrução SQL: \n"+instrucao);
    return database.executar(instrucao);
}
module.exports = {
    cadastrar
}