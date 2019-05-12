"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cadastrodealunos_1 = require("./cadastrodealunos");
var app = express();
exports.app = app;
var cadastro = new cadastrodealunos_1.CadastroDeAlunos();
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};
app.use(allowCrossDomain);
app.use(bodyParser.json());
app.get('/alunos', function (req, res) {
    res.send(JSON.stringify(cadastro.getAlunos()));
});
app.delete('/aluno', function (req, res) {
    //====================AQUI by zegabr
    var cpf = req.body;
    var alunos = cadastro.remover(cpf); //retorna array de alunos
    res.send({ "success": "O aluno foi removido com sucesso" });
    //================================
});
app.post('/aluno', function (req, res) {
    var aluno = req.body; //verificar se é mesmo Aluno!
    aluno = cadastro.criar(aluno);
    if (aluno) {
        res.send({ "success": "O aluno foi cadastrado com sucesso" });
    }
    else {
        res.send({ "failure": "O aluno não pode ser cadastrado" });
    }
});
app.put('/aluno', function (req, res) {
    var aluno = req.body;
    aluno = cadastro.atualizar(aluno);
    if (aluno) {
        res.send({ "success": "O aluno foi atualizado com sucesso" });
    }
    else {
        res.send({ "failure": "O aluno não pode ser atualizado" });
    }
});
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
//# sourceMappingURL=ta-server.js.map