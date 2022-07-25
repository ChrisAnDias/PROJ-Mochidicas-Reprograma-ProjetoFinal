// Importações
require('dotenv-safe').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('./database/mongooseConnect')
const dicasRoutes = require('./routes/dicasRoutes.js')
const usuarioRoutes = require('./routes/usuarioRotas')
const perfilRoutes = require("./routes/perfilRoutes")
const app = express()
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger/swagger_output.json');
//app.uses
app.use(express.json())
app.use(cors())
app.use('/documents', swaggerUi.serve, swaggerUi.setup(swaggerFile));
// banco de dados
mongoose.connect()
//app.uses
app.use("/", dicasRoutes)
app.use("/", usuarioRoutes)
app.use("/", perfilRoutes)
//exportação
module.exports = app    

