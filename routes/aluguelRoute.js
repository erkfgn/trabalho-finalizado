var express = require('express')
var route = express.Router()
var aluguelCtr = require('../control/aluguelCtr')
var multer = require('../config/multerConfig')

// rota para listar todos usando middleware
//route.get('/',aluguelCtr.getAlugueis, aluguelCtr.listar)
route.get('/',aluguelCtr.getAlugueis, aluguelCtr.listar)

//rota para listar por filtro
route.post('/', aluguelCtr.filtrar)

//rota para abrir o adiciona
route.get('/add', aluguelCtr.abrirAdiciona)

//rota para adicionar
route.post('/add',multer.single('foto'), aluguelCtr.adiciona)

//rota para abrir o edita
route.get('/edit/:id', aluguelCtr.abrirEdita)

//rota para editar
route.post('/edit/:id',multer.single('foto'), aluguelCtr.edita)

//rota para deletar
route.get('/del/:id', aluguelCtr.deleta)

module.exports = route;