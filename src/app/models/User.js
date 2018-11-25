const bcrypt = require('bcryptjs')

// exporta um arquivo Model do tipo User
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      avatar: DataTypes.STRING,
      password: DataTypes.VIRTUAL, // SO EXITSE NA APLICAÇÃO
      passwordHash: DataTypes.STRING,
      provider: DataTypes.BOOLEAN
    },
    {
      // nome da table
      tableName: 'users',
      // dispara um eventos antes de alguma ação, veja documentação do Sequelize
      hooks: {
        beforeSave: async user => {
          if (user.password) {
            user.passwordHash = await bcrypt.hash(user.password, 8)
          }
        }
      }
    }
  )

  // Method 2 via the .hook() method (or its alias .addHook() method)
  // User.hook('beforeSave', async (user, options) => {
  //   if (user.password) {
  //     user.passwordHash = await bcrypt.hash(user.password, 8)
  //   }
  // })

  return User
}
