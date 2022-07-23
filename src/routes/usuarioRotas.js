const express = require('express')
const router = express.Router()
const controller = require('../controller/usuarioController')

router.post('/usuarios/', controller.create)
router.get('/usuarios/', controller.getAll)
router.delete('/usuarios/:id', controller.deleteById)
router.post('/usuarios/login', controller.login)

module.exports = router