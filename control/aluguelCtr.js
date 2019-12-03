var aluguel = require('../model/aluguel')
var filme = require('../model/filme')

//middleware para buscar alugueis
function getAlugueis(req, res, next) {
    aluguel.find({}).lean().exec(function (err, docs) {
        req.alugueis = docs
        next()
    })
}

function listar(req, res) {
    aluguel
        .find({})
        .populate('filme')
        .lean()
        .exec(function (err, docs) {
            res.render('aluguel/list.ejs', { "Alugueis": docs })
        })
}

function filtrar(req, res) {
    filme.findOne({ titulo: new RegExp(req.body.pesquisa, 'i') }).lean().exec(function (err, resposta) {
        console.log(resposta)
        if (resposta == null) {
            aluguel
                .find({})
                .populate('filme')
                .lean()
                .exec(function (err, docs) {
                    res.render('aluguel/list.ejs', { "Alugueis": docs, msg: "Nada encontrado!" })

                })
        } else {
            aluguel
                .find({ filme: resposta._id })
                .populate('filme')
                .lean()
                .exec(function (err, docs) {
                    res.render('aluguel/list.ejs', { "Alugueis": docs })
                })
        }
    });
}

function abrirAdiciona(req, res) {
    filme
        .find({})
        .lean()
        .exec(function (e, filmes) {
            console.log(filmes)
            res.render("aluguel/add.ejs", { "Filmes": filmes })
        });
}

function adiciona(req, res) {

    var novoAluguel = new aluguel({
        filme: req.body.filme,
        valor: req.body.valor,
        prazo: req.body.prazo
    })
    novoAluguel.save(function (err) {
        if (err) {
            aluguel.find({}).populate('filme').lean().exec(function (err, docs) {
                res.render('aluguel/list.ejs', { msg: "Problema ao salvar!", Alugueis: docs })
            })
        } else {
            aluguel.find({}).populate('filme').lean().exec(function (err, docs) {
                res.render('aluguel/list.ejs', { msg: "Adicionado com sucesso!", Alugueis: docs })
            })
        }
    })
}

function abrirEdita(req, res) {
    
        aluguel.findById(req.params.id, function (err, aluguel) {
            filme.find({}).lean().exec(
                function (e, filmes) {
                    res.render('aluguel/edit.ejs', { 'aluguel': aluguel, "Filmes": filmes });
                });
        })
}

function edita(req, res) {
    aluguel.findByIdAndUpdate(req.params.id,
        {
            filme: req.body.filme,
            valor: req.body.valor,
            prazo: req.body.prazo
        }, function (err) {
            if (err) {
                aluguel.find({}).populate('filme').lean().exec(function (err, docs) {
                    res.render('aluguel/list.ejs', { msg: "Problema ao editar!", Alugueis: docs })
                })
            } else {
                aluguel.find({}).populate('filme').lean().exec(function (err, docs) {
                    res.render('aluguel/list.ejs', { msg: "Editado com sucesso!", Alugueis: docs })
                })
            }
        })
}

function deleta(req, res) {
    aluguel.findByIdAndDelete(req.params.id, function () {
        aluguel.find({}).populate('filme').lean().exec(function (err, docs) {
            res.render('aluguel/list.ejs', { msg: "Removido com sucesso!", Alugueis: docs })
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
    getAlugueis
}