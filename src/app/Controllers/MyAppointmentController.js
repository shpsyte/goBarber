const { User, Appointment } = require('../models')
const moment = require('moment')
const { Op } = require('sequelize')

class MyAppointmentController {
  async index(req, res) {
    const { id } = req.session.user

    const appoitments = await Appointment.findAll({
      include: [{ model: User, as: 'user' }],
      where: {
        providerId: id,
        date: {
          [Op.between]: [
            moment()
              .startOf('day')
              .format(),
            moment()
              .endOf('day')
              .format()
          ]
        }
      }
    })

    const available = appoitments.map(appoint => {
      // User.findByPk(appoint.userId).then(res => {

      // })
      return {
        appoint,
        date: moment(appoint.date).format('HH:mm')
      }
      // console.log('Usuário', user)
    })

    return res.render('appointments/list', { available })
  }
}
module.exports = new MyAppointmentController()
