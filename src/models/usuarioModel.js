const mongoose = require('mongoose')

const usuarioSchema = new mongoose.Schema({ 
    nome: { type: String },
    email: { type: String },
    senha: { type: String },
},
    {
        versionKey: false 
    }
)

const usuario = mongoose.model('colaboradoras', usuarioSchema)

module.exports = usuario