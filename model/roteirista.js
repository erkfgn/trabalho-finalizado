const conexao = require('./conexao')

var roteirista = conexao.Schema({
    nome:{
        type:String
    },
    nacionalidade:{
        type:String
    },
    datanasc:{
        type:Date
    },
    foto:{
        type:String
    }
})

module.exports = conexao.model("roteirista",roteirista)