const Usuarios = require('../models/usuarioModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

const create = (req, res) => {
    const senhaHash = bcrypt.hashSync(req.body.senha, 10) 
    req.body.senha = senhaHash 
    const usuario = new Usuarios(req.body)
    usuario.save(function (err) {
        if (err) {
            res.status(500).send({ message: err.message })
        }
        res.status(201).send(usuario)
    })
}

const getAll = (req, res) => {
    Usuarios.find(function (err, usuario) {
        if (err) {
            res.status(500).send({ message: err.message })
        }
        res.status(200).send(usuario)
    })
}

const deleteById = async (req, res) => {
    try {
        const { id } = req.params
        await Usuarios.findByIdAndDelete(id) 
        const message = `Usuário com o ID ${id} foi deletado com sucesso!`
        res.status(200).json({ message }) 
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }

}

const login = (req, res) => { 
    Usuarios.findOne({ email: req.body.email }, function (error, usuario){
        if (error) {
            return res.status(500).send({message: 'Erro interno'})
        }
        if (!usuario) {
            return res.status(400).send(`Não existe usuario com o email ${req.body.email}`)
        }
        const senhaValida = bcrypt.compareSync(req.body.senha, usuario.senha)
        if (!senhaValida) {
            return res.status(403).send('Senha incorreta')
        }
        const token = jwt.sign({ email: req.body.email }, SECRET)
        return res.status(200).send(token)
    })
}

module.exports = {
    create,
    getAll,
    deleteById,
    login
}