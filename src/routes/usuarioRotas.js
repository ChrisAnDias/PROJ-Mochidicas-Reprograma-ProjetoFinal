const express = require('express')
const router = express.Router()
const controller = require('../controller/usuarioController')

router.get('/usuarios/', controller.getAll)
router.post('/usuarios/criar', controller.create)
router.delete('/usuarios/:id', controller.deleteById)
router.post('/usuarios/login', controller.login)

module.exports = router