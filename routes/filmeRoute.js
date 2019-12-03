var express = require('express')
var route = express.Router()
var filmeCtr = require('../control/filmeCtr')
var multer = require('../config/multerConfig')

// rota para listar todos usando middleware
//route.get('/',filmeCtr.getFilmes, filmeCtr.listar)
route.get('/',filmeCtr.getFilmes, filmeCtr.listar)

//rota para listar por filtro
route.post('/', filmeCtr.filtrar)

//rota para abrir o adiciona
route.get('/add', filmeCtr.abrirAdiciona)

//rota para adicionar
route.post('/add',multer.single('foto'), filmeCtr.adiciona)

//rota para abrir o edita
route.get('/edit/:id', filmeCtr.abrirEdita)

//rota para editar
route.post('/edit/:id',multer.single('foto'), filmeCtr.edita)

//rota para deletar
route.get('/del/:id', filmeCtr.deleta)

module.exports = route;