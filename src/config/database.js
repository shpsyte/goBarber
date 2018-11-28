// arquivo de configuração do Banco de Dados
module.exports = {
  dialect: 'mysql',
  host: '127.0.0.1',
  port: '3306',
  username: 'barber',
  password: 'barber',
  database: 'gonodemodulo2',
  operatorAliases: false,
  define: {
    timestamps: true
    // underscored: true,
    // underscoredAll: true
  }
}
