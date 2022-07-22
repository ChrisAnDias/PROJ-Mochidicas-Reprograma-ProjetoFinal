// Importações
require('dotenv-safe').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('./database/mongooseConnect')
const dicasRoutes = require('./routes/dicasRoutes.js')
const app = express()
//app.uses
app.use(express.json())
app.use(cors())
// banco de dados
mongoose.connect()
//app.uses
app.use(dicasRoutes)
//exportação
module.exports = app
//swageer
const swaggerAutogen = require('swagger-autogen')
const outputFile = './swagger/swagger_output.json'
const endpointsFiles = ['./src/app.js']
swaggerAutogen(outputFile, endpointsFiles)
