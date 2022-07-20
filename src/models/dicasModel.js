//Importações
const mongoose = require('mongoose')
const dicasSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId
    },

    cidade: {
        type: String,
        required: true,
    },

    estado: {
        type: String,
        required: true,
    },

    temporada: {
        type: String,
        required: true,
    },

    dica: {
        type: String,
        required: true,
    },
//{timestamps: true}
})

const Model = mongoose.model('dicas', dicasSchema)
//Exportações
module.exports = Model
