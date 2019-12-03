var diretor = require('../model/diretor')


//middleware para buscar diretores
function getDiretores(req, res, next) {
    diretor.find({}).lean().exec(function (err, docs) {
        req.diretores = docs
        next()
    })
}

function listar(req, res) {
    diretor.find({}).populate("diretor").populate("genero").lean().exec(function (err, docs) {
        res.render('diretor/list.ejs', { "Diretores": docs })
    })
}

function filtrar(req, res) {
    diretor.find({ nome: new RegExp(req.body.pesquisa, 'i') }).populate("diretor").populate("genero")
        .lean().exec(function (err, docs) {
            res.render('diretor/list.ejs', { "Diretores": docs })
        })
}

function abrirAdiciona(req, res) {
    res.render("diretor/add.ejs")
}

function adiciona(req, res) {
    var novoDiretor = new diretor({
        nome: req.body.nome,
        data_nasc: req.body.data_nasc,
        idade: req.body.idade,
        foto: req.file.filename
    })
    novoDiretor.save(function (err) {
        if (err) {
            diretor.find({}).lean().exec(function (err, docs) {
                res.render('diretor/list.ejs', { msg: "Problema ao salvar!", Diretores: docs })
            })
        } else {
            diretor.find({}).lean().exec(function (err, docs) {
                res.render('diretor/list.ejs', { msg: "Adicionado com sucesso!", Diretores: docs })
            })
        }
    })
}

function abrirEdita(req, res) {
    diretor.findById(req.params.id, function (err, diretor) {
        res.render('diretor/edit.ejs', { 'diretor': diretor });
    })
}

function edita(req, res) {
    diretor.findByIdAndUpdate(req.params.id,
        {
            nome: req.body.nome,
            data_nasc: req.body.data_nasc,
            idade: req.body.idade,
            foto: req.file.filename
        }, function (err) {
            if (err) {
                diretor.find({}).lean().exec(function (err, docs) {
                    res.render('diretor/list.ejs', { msg: "Problema ao editar!", Diretores: docs })
                })
            } else {
                diretor.find({}).lean().exec(function (err, docs) {
                    res.render('diretor/list.ejs', { msg: "Editado com sucesso!", Diretores: docs })
                })
            }
        })
}

function deleta(req, res) {
    diretor.findByIdAndDelete(req.params.id, function () {
        diretor.find({}).lean().exec(function (err, docs) {
            res.render('diretor/list.ejs', { msg: "Removido com sucesso!", Diretores: docs })
        })
    })

}

module.exports = {
    listar,
    filtrar,
    abrirAdiciona,
    adiciona,
    abrirEdita,
    edita,
    deleta,
    getDiretores
}