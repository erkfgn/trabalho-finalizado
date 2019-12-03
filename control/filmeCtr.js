var filme = require('../model/filme')
var diretor = require('../model/diretor')
var genero = require('../model/genero')
var roteirista = require('../model/roteirista')

//middleware para buscar filmes
function getFilmes(req, res, next) {
    filme.find({}).lean().exec(function (err, docs) {
        req.filmes = docs
        next()
    }) 
}

function listar(req, res) {
    filme
        .find({})
        .populate('genero')
        .populate('diretor')
        .populate('roteiristas')
        .lean()
        .exec(function (err, docs) {
            res.render('filme/list.ejs', { "Filmes": docs })
        })
}

function filtrar(req, res) {
    filme
        .find({ titulo: new RegExp(req.body.pesquisa, 'i') })
        .populate('genero')
        .populate('diretor')
        .populate('roteiristas')
        .lean()
        .exec(function (err, docs) {
            res.render('filme/list.ejs', { "Filmes": docs })
        })
}

function abrirAdiciona(req, res) {
    diretor
        .find({})
        .lean()
        .exec(function (e, diretores) {
            roteirista
                .find({})
                .lean()
                .exec(function (e, roteiristas) {
                    genero
                        .find({})
                        .lean()
                        .exec(function (e, generos) {
                            res.render("filme/add.ejs", { "Diretores": diretores, "Roteiristas": roteiristas, "Generos": generos })
                        });
                });
        });
}

function adiciona(req, res) {

    var novoFilme = new filme({
        titulo: req.body.titulo,
        isbn: req.body.isbn,
        sinopse: req.body.sinopse,
        foto: req.file.filename,
        genero: req.body.genero,
        diretor: req.body.diretor,
        roteiristas: req.body.roteiristas,
    })
    novoFilme.save(function (err) {
        if (err) {
            filme.find({}).populate('genero').populate('diretor').populate('roteirista').lean().exec(function (err, docs) {
                res.render('filme/list.ejs', { msg: "Problema ao salvar!", Filmes: docs })
            })
        } else {
            filme.find({}).populate('genero').populate('diretor').populate('roteiristas').lean().exec(function (err, docs) {
                res.render('filme/list.ejs', { msg: "Adicionado com sucesso!", Filmes: docs })
            })
        }
    })
}

function abrirEdita(req, res) {
    diretor.find({}).lean().exec(
        function (e, diretores) {
            roteirista.find({}).lean().exec(
                function (e, roteiristas) {
                    genero.find({}).lean().exec(
                        function (e, generos) {
                            filme.findOne({ _id: req.params.id }).populate('genero').populate('diretor').populate('roteiristas').exec(
                                function (err, filme) {
                                    res.render('filme/edit.ejs', { 'filme': filme, "Diretores": diretores, "Roteiristas": roteiristas, "Generos": generos });
                                });
                        });
                });
        });
}

function edita(req, res) {
    filme.findByIdAndUpdate(req.params.id,
        {
            titulo: req.body.titulo,
            isbn: req.body.isbn,
            sinopse: req.body.sinopse,
            foto: req.file.filename,
            genero: req.body.genero,
            diretor: req.body.diretor,
            roteiristas: req.body.roteiristas
        }, function (err) {
            if (err) {
                filme.find({}).populate('genero').populate('diretor').populate('roteiristas').lean().exec(function (err, docs) {
                    res.render('filme/list.ejs', { msg: "Problema ao editar!", Filmes: docs })
                })
            } else {
                filme.find({}).populate('genero').populate('diretor').populate('roteiristas').lean().exec(function (err, docs) {
                    res.render('filme/list.ejs', { msg: "Editado com sucesso!", Filmes: docs })
                })
            }
        })
}

function deleta(req, res) {
    filme.findByIdAndDelete(req.params.id, function () {
        filme.find({}).populate('genero').populate('diretor').populate('roteiristas').lean().exec(function (err, docs) {
            res.render('filme/list.ejs', { msg: "Removido com sucesso!", Filmes: docs })
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
    getFilmes
}