const conexao = require('./conexao')

var aluguel = conexao.Schema({
    valor:{
        type:String
    },
    prazo:{
        type:String
    },
    filme:{
        type:conexao.Schema.Types.ObjectId,
        ref: "filme"
    }
})

module.exports = conexao.model("aluguel",aluguel)