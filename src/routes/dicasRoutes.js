//Importações
const express = require('express')
const router = express.Router()
const controller = require('../controller/dicasController')


//Rotas
router.get("/listarDicas", controller.allDicas)
router.get("/dicas/cidade", controller.dicasByCidade)
router.get("/dicas/estado", controller.dicasByEstado)
router.get("/dicas/temporada", controller.dicasByTemporada)
router.post("/dica", controller.createDica)
router.patch("/attdica/:id", controller.updateDicas)
router.delete("/deleteDica/:id", controller.deleteDica)

module.exports = router