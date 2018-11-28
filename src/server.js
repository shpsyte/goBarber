const express = require('express')
const nunjucks = require('nunjucks')
// importa a session
const session = require('express-session')
// importa o file session
const FileStore = require('session-file-store')(session)
// lida com msg para o usuario
const flash = require('connect-flash')

// lida com path do servidor
const path = require('path')
// importa nosso arquivo de rotas
const routes = require('./routes')

class App {
  constructor() {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'

    this.middlewares()
    this.views()
    this.routes()
  }

  middlewares() {
    // habilita o connect flasg - msg para usuario
    this.express.use(flash())
    // habilita para lidar com parametros no body da requisição
    this.express.use(
      express.urlencoded({
        extended: false
      })
    )

    // configuracao do session
    this.express.use(
      session({
        name: 'root',
        secret: 'MyAppSecret', // Cria um senha para nossa criptografia
        resave: true,
        store: new FileStore({
          path: path.resolve(__dirname, '..', 'tmp', 'sessions')
        }),
        saveUninitialized: true
      })
    )
  }

  views() {
    // configura o nunjucks
    nunjucks.configure(path.resolve(__dirname, 'app', 'views'), {
      watch: this.isDev,
      express: this.express,
      autoescape: true
    })

    // Configura o express para server arquivos publicos e estátios para nossa aplicação
    this.express.use(express.static(path.resolve(__dirname, 'public')))

    // set a view engine no express;
    this.express.set('view engine', 'njk')
  }

  routes() {
    this.express.use(routes)
  }
}

// exporta o modulo
module.exports = new App().express
