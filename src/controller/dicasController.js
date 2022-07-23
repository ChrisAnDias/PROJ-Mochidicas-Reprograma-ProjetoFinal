//importações
const dicasModel = require('../models/dicasModel')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const SECRET = process.env.SECRET

//connect()

const regCriaDicas = async (req, res) => {

  const { email, password } = req.body

  if (!email || !password) {
    return res.status(422).send({
      message: 'Invalid payload',
    });
  }

  const encryptedPassword = await bcrypt.hash(req.body.password, 10);

  req.body.password = encryptedPassword;
  const novaDica = new dicasModel(req.body);

  try {
    await novaDica.save();

    res.status(201).send({
      message: "Dica cadastrada com sucesso!",
      dica: novaDica,
    });
  } catch (err) {
    res.status(424).send({ message: err.message })
  }
};

const allDicas = async (req, res) => {
  dicasModel.find((err, dica) => {
    if (err) {
      return res.status(424).send({ message: err.message });
    }
    res.status(200).send(dicasModel);
  });
};

module.exports = {
  regCriaDicas, 
  allDicas
}