module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define('Appointment', {
    date: DataTypes.DATE
  })

  // faz a ligação entre as tabelas
  Appointment.associate = models => {
    Appointment.belongsTo(models.User, { as: 'user', foreignKey: 'userId' })
    Appointment.belongsTo(models.User, {
      as: 'provider',
      foreignKey: 'providerId'
    })
  }

  return Appointment
}
