var express = require('express')
var route = express.Router()
var roteiristaCtr = require('../control/roteiristaCtr')
var multer = require('../config/multerConfig')

//rota para listar todos usando middleware
//route.get('/',roteiristaCtr.getroteiristas, roteiristaCtr.listar)

//rota para listar todos
route.get('/', roteiristaCtr.listar)

//rota para listar por filtro
route.post('/', roteiristaCtr.filtrar)

//rota para abrir o adiciona
route.get('/add', roteiristaCtr.abrirAdiciona)

//rota para adicionar
route.post('/add',multer.single('foto'), roteiristaCtr.adiciona)

//rota para abrir o edita
route.get('/edit/:id', roteiristaCtr.abrirEdita)

//rota para editar
route.post('/edit/:id',multer.single('foto'), roteiristaCtr.edita)

//rota para deletar
route.get('/del/:id', roteiristaCtr.deleta)

module.exports = route;