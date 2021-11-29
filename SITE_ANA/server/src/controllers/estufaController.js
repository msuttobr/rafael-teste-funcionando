var estufaModel = require("../models/estufaModel");

function testar(req, res) {
    console.log("ENTRAMOS NO estufaController");
    res.send("ENTRAMOS NO ESTUFA CONTROLLER");
}

function cadastrar(req, res) {
    var obj = {
        'nome'    : req.body.nome,
        'cep'     : req.body.cep,
        'cidade'  : req.body.cidade,
        'uf'      : req.body.uf,
        'empresa' : req.body.empresa,
        'produto' : req.body.produto
    };
    estufaModel.cadastrar(obj).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao cadastrar as estufas: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
function listar(req, res) {
    estufaModel.listar().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as estufas: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function listarPorEmpresa(req, res) {
    var idEmpresa = req.params.idEmpresa;

    estufaModel.listarPorEmpresa(idEmpresa)
    .then(
        function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        }
    )
    .catch(
        function (erro) {
            console.log(erro);
            console.log(
                "Houve um erro ao buscar as estufas: ",
                erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        }
    );
}
function listarSensor(req, res) {
    var descricao = req.params.idSensor;

    estufaModel.listarSensor(descricao)
    .then(
        function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado[0]);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar os sensores: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    );
}
function obterEstufa(req, res) {
    var descricao = req.params.idEstufa;

    estufaModel.obter(descricao)
    .then(
        function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado[0]);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        }
    ).catch(
        function (erro) {
            console.log(erro);
            console.log("Houve um erro ao buscar as estufas: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    );
}
module.exports = {
    testar,
    cadastrar,
    listar,
    listarPorEmpresa,
    listarSensor,
    obterEstufa
}