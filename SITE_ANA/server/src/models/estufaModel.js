var database = require("../database/config");

function listar() {
    console.log("ACESSEI O ESTUFA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT 
            e.idEstufa as id,
            e.nomeEstufa,
            e.cep,
            e.cidade,
            e.uf,
            e.fkEmpresa as empresa
        FROM estufa e;
    `;
    console.log("Executando a instrução SQL: \n"+instrucao);
    return database.executar(instrucao);
}
function cadastrar(obj) {
    console.log("ACESSEI O ESTUFA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar()");
    var instrucao = `
        INSERT INTO estufa (nomeEstufa, cep, cidade, uf, fkEmpresa, fkProduto) VALUES ('${obj.nome}', '${obj.cep}', '${obj.cidade}', '${obj.uf}', ${obj.empresa}, ${obj.produto});
    `;
    console.log("Executando a instrução SQL: \n"+instrucao);
    return database.executar(instrucao);
}
function listarPorEmpresa(idEmpresa) {
    console.log("ACESSEI O ESTUFA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
    var instrucao = `
    SELECT 
        a.idEstufa as id,
        a.nomeEstufa,
        a.cep,
        a.cidade,
        a.uf,
        a.fkEmpresa as empresa
    FROM estufa a
    WHERE fkEmpresa = ${idEmpresa};
    `;
    console.log("Executando a instrução SQL: \n"+instrucao);
    return database.executar(instrucao);
}
function listarSensor(idEstufa) {
    console.log("ACESSEI O SENSOR MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarSensor()");
    var instrucao = `
    SELECT 
        s.idSensor as id,
        s.tipoSensor,
        s.statusSensor,
        s.fkEstufa as estufa
    FROM sensor s
    INNER JOIN estufa e
    ON e.idEstufa = s.fkEstufa
    WHERE e.idEstufa = ${idEstufa};
    `;
    console.log("Executando a instrução SQL: \n"+instrucao);
    return database.executar(instrucao);
}
function obterEstufa(idEstufa) {
    console.log("ACESSEI O ESTUFA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function obterEstufa()");
    var instrucao = `
    SELECT 
        e.idEstufa as id,
        e.nomeEstufa,
        e.cep,
        e.cidade,
        e.uf,
        e.fkEmpresa as empresa
    FROM estufa
    WHERE idEstufa = ${idEstufa};
    `;
    console.log("Executando a instrução SQL: \n"+instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listar,
    cadastrar,
    listarPorEmpresa,
    listarSensor,
    obterEstufa
}
