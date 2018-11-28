const express = require('express')
const routes = express.Router()
// importa o midle de autenticacao
const authMiddleware = require('./app/middlewares/auth')
// importa o midle de verificacao se esta logado
const guestMiddleware = require('./app/middlewares/guest')
// importa o arquivo de configuração do Multer
const multerConfig = require('./config/multer')
// importa o multer passando o arquivo de configuração
const upload = require('multer')(multerConfig)
// chama o userController onde tem a rota para signup
const UserController = require('./app/Controllers/UserController')
// importa o SessionController responsavel pela autenticacao
const SesssionController = require('./app/Controllers/SesssionController')
// importa o controller do dashboard
const DashboardController = require('./app/Controllers/DashboardController')
// importando o controller FileController
const FileController = require('./app/Controllers/FileController')
// importa o controller para appontimen
const AppointmentController = require('./app/Controllers/AppointmentController')
// Modulo AvailableController
const AvailableController = require('./app/Controllers/AvailableController')

routes.use((req, res, next) => {
  res.locals.flashSuccess = req.flash('success')
  res.locals.flashError = req.flash('error')
  return next()
})
// Rota padrão para arquivos
routes.get('/files/:file', FileController.show)

// Definido a rota para signup do usuario!
routes.get('/signup', guestMiddleware, UserController.create)
// upload para files
routes.post('/signup', upload.single('avatar'), UserController.store)

// Definindo a rota para sigin
routes.get('/', guestMiddleware, SesssionController.create)
routes.post('/signin', SesssionController.store)

// definido a rota para logout
routes.get('/app/logout', SesssionController.destroy)

// define que todas as rotas que iniciarem por /app vao chamar o middleware antes
// de prosseguir
routes.use('/app', authMiddleware)
routes.get('/app/dashboard', DashboardController.index)
routes.get('/app/appointments/new/:provider', AppointmentController.create)
routes.post('/app/appointments/new/:provider', AppointmentController.store)

routes.get('/app/avaiable/:provider', AvailableController.index)

module.exports = routes
