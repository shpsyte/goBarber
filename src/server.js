const express = require('express')
const nunjucks = require('nunjucks')
// lida com path do servidor
const path = require('path')
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

    // set a view engine no express;
    this.express.set('view engine', 'njk')
  }

  routes() {}
}

// exporta o modulo
module.exports = new App().express
