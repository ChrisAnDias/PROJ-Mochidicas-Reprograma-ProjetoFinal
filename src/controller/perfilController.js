const PerfilModel = require('../models/perfilModel')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

const createPerfil = async (req, res) => {
  try {
    const authHeader = req.get('authorization')
    if (!authHeader) {
      return res.status(401).send('Sem autorização!')
    }
    const token = authHeader.split(' ')[1]
    await jwt.verify(token, SECRET, async function (erro) {
      if (erro) {
        return res.status(403).send('Senha não autorizada')
      }
      const { nome, país, estado , cidade, idade, genero } = req.body
      const newPerfil = new PerfilModel({
        nome, país, estado , cidade, idade, genero
      })
      const savedPerfil = await newPerfil.save()
      res.status(201).json(savedPerfil)

    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}

const findAllPerfis = async (req, res) => {
  try {
    const authHeader = req.get('authorization')
    if (!authHeader) {
      return res.status(401).send('Sem autorização!')
    }
    const token = authHeader.split(' ')[1]
    await jwt.verify(token, SECRET, async function (erro) {
      if (erro) {
        return res.status(403).send('Senha não autorizada')
      }
      const todosPerfis = await PerfilModel.find()
      res.status(200).json(todosPerfis)
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}

const findPerfilById = async (req, res) => {
  try {
    const authHeader = req.get('authorization')
    if (!authHeader) {
      return res.status(401).send('Sem autorização!')
    }
    const token = authHeader.split(' ')[1]
    await jwt.verify(token, SECRET, async function (erro) {
      if (erro) {
        return res.status(403).send('Senha não autorizada')
      }
      const findPerfil = await PerfilModel.findById(req.params.id)
      res.status(200).json(findPerfil)
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}

const updatePerfil = async (req, res) => { //ajustar essa rota. ta precisando dá duas vezes o send para modificar
  try {
    const authHeader = req.get('authorization')
    if (!authHeader) {
      return res.status(401).send('Sem autorização!')
    }
    const token = authHeader.split(' ')[1]
    await jwt.verify(token, SECRET, async function (erro) {
      if (erro) {
        return res.status(403).send('Senha não autorizada')
      }
      const { nome, idade, estado , cidade, país, genero } = req.body
      const perfilAtualizado = await PerfilModel.findByIdAndUpdate(req.params.id, 
        {
          nome, idade, estado , cidade, país, genero
        })
      res.status(200).json(perfilAtualizado)
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}

const deletePerfil = async (req, res) => {
  try {
    const { id } = req.params
    await PerfilModel.findByIdAndDelete(id)
    const message = `O Perfil com o ${id} foi deletado com sucesso!`
    res.status(200).json({ message })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
    createPerfil, findAllPerfis, updatePerfil, deletePerfil, findPerfilById
}