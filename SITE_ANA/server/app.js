process.env.AMBIENTE_PROCESSO = "desenvolvimento";
// process.env.AMBIENTE_PROCESSO = "producao";

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA = 3333;

var app = express();

var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");
var avisosRouter = require("./src/routes/avisos");
var medidasRouter = require("./src/routes/medidas");
var estufasRouter = require("./src/routes/estufas");
var produtoRouter = require("./src/routes/produtos");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('../public_html', {
    extensions: ['html']
}));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/avisos", avisosRouter);
app.use("/estufa", estufasRouter);
app.use("/produto", produtoRouter);
app.use("/medidas", medidasRouter);

app.listen(PORTA, function() {
    console.log(`Servidor do site está rodando rodando: http://localhost:${PORTA} \n
    Você está rodando sua aplicação em ${process.env.AMBIENTE_PROCESSO} \n
    \t\tSe "desenvolvimento", banco local (MySQL Workbench). \n
    \t\tSe "producao", banco remoto (SQL Server em nuvem Azure)`);
});