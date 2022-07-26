//importações
const DicasModel = require('../models/dicasModel')
const PerfilModel = require('../models/perfilModel')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const SECRET = process.env.SECRET

//connect()

const createDica = async (req, res) => {
  try {
    const authHeader = req.get('authorization')
    if (!authHeader) {
      return res.status(401).send('Sem autorização!')
    }
    const token = authHeader.split(' ')[1]
    await jwt.verify(token, SECRET, async function (erro) {
      if (erro) {
        return res.status(403).send('Senha não autorizada!')
      }
      const { perfilID, cidade, estado, temporada, dica } = req.body

      if (!perfilID) {
        return res.status(400).json({ message: 'O Perfil é obrigatório' })
      }

      const findPerfil = await PerfilModel.findById(perfilID)

      if (!findPerfil) {
        return res.status(404).json({ message: 'Perfil não encontrado' })
      }
      const newDica = new DicasModel({
        perfil: perfilID,
        cidade, estado, temporada, dica
      })

      const dicaSalva = await newDica.save()

      res.status(200).json(dicaSalva)
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}

const allDicas = async (req, res) => {
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
      const dicasAll = await DicasModel.find()
      res.status(200).json(dicasAll)
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};

const dicasByCidade = async (req, res) => {
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

      let cidadeReq = req.query.cidade
      let cidadeFilt = DicasModel.filter((dica) =>
        dica.cidade.includes(cidadeReq),
      )
      if (cidadeFilt.length > 0) {
        res.status(200).send(cidadeFilt)
      } else {
        res.status(404).send({ message: 'Cidade não encontrado' })
      }
    })
  } catch (err) {
    response.status(500).send({ message: 'Erro no server' })
  }
}

module.exports = {
  createDica,
  allDicas,
  dicasByCidade
}