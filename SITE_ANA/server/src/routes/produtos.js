var express = require("express");
var router = express.Router();

var produtoController = require("../controllers/produtoController");

router.get("/", function (req, res) {
    produtoController.testar(req, res);
});

router.post("/cadastrar", function (req, res) {
    produtoController.cadastrar(req, res);
});

module.exports = router;