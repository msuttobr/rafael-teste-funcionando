var produtoModel = require("../models/produtoModel");

function testar(req, res) {
    console.log("ENTRAMOS NO produtoController");
    res.send("ENTRAMOS NO PRODUTO CONTROLLER");
}

function cadastrar(req, res) {
    var obj = {
        'nome'    : req.body.nome,
        'tmp_min' : req.body.tmp_min,
        'tmp_max' : req.body.tmp_max,
        'lum_min' : req.body.lum_min,
        'lum_max' : req.body.lum_max
    };
    produtoModel.cadastrar(obj).then(function (resultado) {
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
module.exports = {
    testar,
    cadastrar
}