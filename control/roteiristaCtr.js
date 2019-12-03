var roteirista = require('../model/roteirista')


//middleware para buscar roteiristaes
function getRoteiristas(req, res, next) {
    roteirista.find({}).lean().exec(function (err, docs) {
        req.roteiristas = docs
        next()
    })
}

function listar(req, res) {
    roteirista.find({}).lean().exec(function (err, docs) {
        res.render('roteirista/list.ejs', { "Roteiristas": docs })
    })
}

function filtrar(req, res) {
    roteirista.find({ nome: new RegExp(req.body.pesquisa, 'i') })
        .lean().exec(function (err, docs) {
            res.render('roteirista/list.ejs', { "Roteiristas": docs })
        })
}

function abrirAdiciona(req, res) {
    res.render("roteirista/add.ejs")
}

function adiciona(req, res) {
    var novoRoteirista = new roteirista({
        nome: req.body.nome,
        nacionalidade: req.body.nacionalidade,
        datanasc: req.body.datanasc,
        foto: req.file.filename
    })
    novoRoteirista.save(function (err) {
        if (err) {
            roteirista.find({}).lean().exec(function (err, docs) {
                res.render('roteirista/list.ejs', { msg: "Problema ao salvar!", Roteiristas: docs })
            })
        } else {
            roteirista.find({}).lean().exec(function (err, docs) {
                res.render('roteirista/list.ejs', { msg: "Adicionado com sucesso!", Roteiristas: docs })
            })
        }
    })
}

function abrirEdita(req, res) {
    roteirista.findById(req.params.id, function (err, roteirista) {
        res.render('roteirista/edit.ejs', { 'roteirista': roteirista });
    })
}

function edita(req, res) {
    roteirista.findByIdAndUpdate(req.params.id,
        {
            nome: req.body.nome,
            nacionalidade: req.body.nacionalidade,
            datanasc: req.body.datanasc,
            foto: req.file.filename
        }, function (err) {
            if (err) {
                roteirista.find({}).lean().exec(function (err, docs) {
                    res.render('roteirista/list.ejs', { msg: "Problema ao editar!", Roteiristas: docs })
                })
            } else {
                roteirista.find({}).lean().exec(function (err, docs) {
                    res.render('roteirista/list.ejs', { msg: "Editado com sucesso!", Roteiristas: docs })
                })
            }
        })
}

function deleta(req, res) {
    roteirista.findByIdAndDelete(req.params.id, function () {
        roteirista.find({}).lean().exec(function (err, docs) {
            res.render('roteirista/list.ejs', { msg: "Removido com sucesso!", Roteiristas: docs })
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
    getRoteiristas
}