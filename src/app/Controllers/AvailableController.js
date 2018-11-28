const moment = require('moment')
const { Appointment } = require('../models')
const { Op } = require('sequelize')

class AvailableController {
  async index(req, res) {
    // req.query = pega os parametros por queryString
    const date = moment(parseInt(req.query.date))
    const appointments = await Appointment.findAll({
      where: {
        providerId: req.params.provider,
        date: {
          [Op.between]: [
            date.startOf('day').format(),
            date.endOf('day').format()
          ]
        }
      }
    })

    // definindo nosso range de horas disponives
    const schedule = [
      '8:00',
      '9:00',
      '10:00',
      '11:00',
      '12:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00'
    ]
    // retirando as horas indisponivel antesriro a hora atual
    const available = schedule.map(time => {
      const [hour, minute] = time.split(':')

      // cira uma data com hora para cada hora 2018-01-01 08:00
      const value = date
        .hour(hour)
        .minute(minute)
        .second(0)

      // retonando um obj com varias info
      return {
        time,
        value: value.format(),
        available:
          value.isAfter(moment()) &&
          !appointments.find(a => moment(a.date).format('HH:mm') === time)
      }
    })
    return res.render('available/index', { available })
  }
}

module.exports = new AvailableController()
