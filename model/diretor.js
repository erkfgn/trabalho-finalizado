const conexao = require('./conexao')

var diretor = conexao.Schema({
    nome:{
        type:String
    },
    data_nasc:{
        type:Date
    },
    idade:{
        type:Number
    },
    foto:{
        type:String
    }
})

module.exports = conexao.model("diretor",diretor)