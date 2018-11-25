const express = require('express')
const routes = express.Router()
// importa o arquivo de configuração do Multer
const multerConfig = require('./config/multer')
// importa o multer passando o arquivo de configuração
const upload = require('multer')(multerConfig)
// chama o userController onde tem a rota para signup
const UserController = require('./app/Controllers/UserController')

// Definido a rota para signup do usuario!
routes.get('/signup', UserController.create)

// upload para files
routes.post('/signup', upload.single('avatar'), UserController.store)

module.exports = routes
