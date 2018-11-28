const { User, Appointment } = require('../models')

class AppointmentController {
  async create(req, res) {
    // Busca o proivider conforme o parametro enviado pela rota
    const provider = await User.findByPk(req.params.provider)

    // redireciona para a view
    return res.render('appointments/create', { provider })
  }

  async store(req, res) {
    const { id } = req.session.user
    const { provider } = req.params
    const { date } = req.body

    await Appointment.create({
      userId: id,
      providerId: provider,
      date
    })

    return res.redirect('/app/dashboard')
  }
}

module.exports = new AppointmentController()
