const controller = require('../controller/perfilController')
const express = require('express')

const router = express.Router()

router.get("/perfis/", controller.findAllPerfis)
router.get("/perfil/:id", controller.findPerfilById)
router.post("/perfil/criar", controller.createPerfil)
router.patch("/perfil/:id", controller.updatePerfil)
router.delete("/perfil/:id", controller.deletePerfil)

module.exports = router