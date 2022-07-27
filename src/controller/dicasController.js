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
      try {
        const { cidade: cidade } = req.query;
        const findCidade = await DicasModel.find({ cidade: cidade });
        res.status(200).json(findCidade);
      } catch (err) {
        res.status(500).send({ message: err.message });
      }
    })
  } catch (err) {
    response.status(500).send({ message: 'Erro no server' })
  }
}

const dicasByEstado = async (req, res) => {
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
      try {
        const { estado: estado } = req.query;
        const findEstado = await DicasModel.find({ estado: estado });
        res.status(200).json(findEstado);
      } catch (err) {
        res.status(500).send({ message: err.message });
      }
    })
  } catch (err) {
    response.status(500).send({ message: 'Erro no server' })
  }
}

const dicasByTemporada = async (req, res) => {
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
      try {
        const { temporada: temporada } = req.query;
        const findTemp = await DicasModel.find({ temporada: temporada });
        res.status(200).json(findTemp);
      } catch (err) {
        res.status(500).send({ message: err.message });
      }
    })
  } catch (err) {
    response.status(500).send({ message: 'Erro no server' })
  }
}


const updateDicas = async (req, res) => {
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
      try {
        const { perfilID, cidade, estado, temporada, dica } = req.body
        const updatedDica = await DicasModel.findByIdAndUpdate(req.params.id,
          {
            perfilID, cidade, estado, temporada, dica
          });
        res.status(200).json(updatedDica);
      } catch (err) {
        res.status(500).send({ message: err.message });
      }
    })
  } catch (err) {
    response.status(500).send({ message: 'Erro no server' })
  }
}

const deleteDica = async (req, res) => {
  try {
    const authHeader = req.get('authorization')

    if (!authHeader) {
      return res.status(401).send('Sem autorização')
    }

    const token = authHeader.split(' ')[1]

    await jwt.verify(token, SECRET, async function (err) {

      if (err) {
        return res.status(403).send('Senha não autorizada')
      }
    })
    const { id } = req.params;
    const findByIdAndDelete = await DicasModel.findByIdAndDelete(id)

    if (findByIdAndDelete == null) {
      return res.status(404).json({ message: `Dica de ID ${id} não foi encontrada. ` });
    }

    await findByIdAndDelete.remove()

    res.status(200).json({ message: `Dica de ID ${id} foi deletada.` })

  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}


module.exports = {
  createDica,
  allDicas,
  dicasByCidade,
  dicasByEstado,
  dicasByTemporada,
  updateDicas,
  deleteDica
}