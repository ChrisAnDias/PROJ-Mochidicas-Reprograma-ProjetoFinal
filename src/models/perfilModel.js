const mongoose = require('mongoose')

const perfilSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId
  },

  nome: {
    type: String,
    required: true, 
    unique: true, 
  },

  país: {
    type: String,
    required: true
  },

  estado: {
    type: String,
    required: true
  },

  cidade: {
    type: String,
    required: true
  },

  idade: {
    type: Number,
    required: true
  },

  genero: {
    type: String,
    default: "Não Informado."
  }

}, { timestamps: true }) // gera automaticamente as datas de atualizacao e criação

const perfil = mongoose.model('perfil', perfilSchema)

module.exports = perfil