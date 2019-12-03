const conexao = require('./conexao')

var genero = conexao.Schema({
    nome:{
        type:String
    },
    filmes:[
        {
            type:conexao.Schema.Types.ObjectId,
            ref:"filme"
        }
    ]
})

module.exports = conexao.model("genero",genero)