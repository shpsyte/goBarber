// Vamos importar a pasta para que o arquivo index.js seja importado e configure nosso model
const { User } = require('../models')

class UserController {
  create(req, res) {
    return res.render('auth/signup')
  }

  // caminho para salvar os dados do usuario no banco
  // vamos deixar o metodo asyncrono
  async store(req, res) {
    const { filename: avatar } = req.file
    // Os dadso do usuário está dentro do req.body e como os nome são iguais
    // ele ira preencher um obj do tipo User com os campos preenchidos

    // usando o spredd para criar um novo objeto e alterando o campo avatar
    await User.create({ ...req.body, avatar })

    return res.redirect('/')
  }
}

module.exports = new UserController()
