const conexao = require('./conexao')

var filme = conexao.Schema({
    titulo:{
        type:String
    },
    sinopse:{
        type:String
    },
    foto:{
        type:String
    },
    genero:{
        type:conexao.Schema.Types.ObjectId,
        ref: "genero"
    },
    diretor:{
        type:conexao.Schema.Types.ObjectId,
        ref: "diretor"
    },
    roteiristas:[{
        type:conexao.Schema.Types.ObjectId,
        ref: "roteirista"
    }]
})

module.exports = conexao.model("filme",filme)