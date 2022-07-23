//importações
const DicasModel = require('../models/dicasModel')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const SECRET = process.env.SECRET

//connect()

const create = async (req, res) => {
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
      //const { coachId, name, type, abilities, description } = req.body 
      const { dicaId, cidade, estado, temporada, dica } = req.body 

      if (!dicaId) {
        return res.status(400).json({ message: 'O ID é obrigatório' })
      }

      const findDica = await DicasModel.findById(dicaId)

      if (!findDica) {
        return res.status(404).json({ message: 'Id não encontrada' })
      }
      })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}
  // const { email, password } = req.body

  // if (!email || !password) {
  //   return res.status(422).send({
  //     message: 'Invalid payload',
  //   });
  // }

  // const encryptedPassword = await bcrypt.hash(req.body.password, 10);

  // req.body.password = encryptedPassword;
  // const novaDica = new DicasModel(req.body);

  // try {
  //   await novaDica.save();

  //   res.status(201).send({
  //     message: "Dica cadastrada com sucesso!",
  //     dica: novaDica,
  //   });
  // } catch (err) {
  //   res.status(424).send({ message: err.message })
  // }

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

  // dicasModel.find((err, dica) => {
  //   if (err) {
  //     return res.status(424).send({ message: err.message });
  //   }
  //   res.status(200).send(dicasModel);
  // });
};

module.exports = {
  create, 
  allDicas
}