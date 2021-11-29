var express = require("express");
var router = express.Router();

var estufaController = require("../controllers/estufaController");

router.get("/", function (req, res) {
    estufaController.testar(req, res);
});

router.post("/cadastrar", function (req, res) {
    estufaController.cadastrar(req, res);
});

router.get("/listar", function (req, res) {
    estufaController.listar(req, res);
});

router.get("/listar/:idEmpresa", function (req, res) {
    estufaController.listarPorEmpresa(req, res);
});

router.get("/sensor/:idSensor", function (req, res) {
    estufaController.listarSensor(req, res);
});

router.get("/:idEstufa", function (req, res) {
    estufaController.obterEstufa(req, res);
});

module.exports = router;