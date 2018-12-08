const { User } = require('../models')

class DashboardController {
  // metodo index
  async index(req, res) {
    // buscamos todos os provider pelo arquivos User usando sequelize
    const providers = await User.findAll({ where: { provider: true } })

    return res.render('dashboard', { providers })
  }
}

// exportamos o modulo para quem quiser consumir
module.exports = new DashboardController()
