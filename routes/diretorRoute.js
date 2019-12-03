var express = require('express')
var route = express.Router()
var diretorCtr = require('../control/diretorCtr')
var multer = require('../config/multerConfig')

//rota para listar todos usando middleware
//route.get('/',diretorCtr.getdiretores, diretorCtr.listar)

//rota para listar todos
route.get('/', diretorCtr.listar)

//rota para listar por filtro
route.post('/', diretorCtr.filtrar)

//rota para abrir o adiciona
route.get('/add', diretorCtr.abrirAdiciona)

//rota para adicionar
route.post('/add',multer.single('foto'), diretorCtr.adiciona)

//rota para abrir o edita
route.get('/edit/:id', diretorCtr.abrirEdita)

//rota para editar
route.post('/edit/:id',multer.single('foto'), diretorCtr.edita)

//rota para deletar
route.get('/del/:id', diretorCtr.deleta)

module.exports = route;