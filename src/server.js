const express = require('express')
const nunjucks = require('nunjucks')
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
    // habilita para lidar com parametros no body da requisição
    this.express.use(
      express.urlencoded({
        extended: false
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
