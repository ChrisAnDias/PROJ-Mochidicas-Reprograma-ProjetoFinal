//Importações
const express = require('express')
const router = express.Router()
const controller = require('../controller/dicasController')


//Rotas
router.get("/listaDicas", controller.allDicas)
router.post("/dicas", controller.create)
// router.get("/listaDicas/cidade", controller.dicasByCidade)
// router.get("/listaDicas/estado", controller.dicasByEstado)
// router.patch("/attdica/:id", controller.updateDicas)
// router.delete("/deleteDica/:id", controller.deleteCoach)

module.exports = router