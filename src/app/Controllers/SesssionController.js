const { User } = require('../models')

class SesssionController {
  async create(req, res) {
    return res.render('auth/signin')
  }

  async store(req, res) {
    // desconstrucao de variaves
    const { email, password } = req.body

    // procura um usuario com o email
    const user = await User.findOne({ where: { email } })

    if (!user) {
      // handle error to usuario
      req.flash('error', 'Usuário não encontrado')
      return res.redirect('/')
    }

    // checa se a senha é igual no banco de daod
    if (!(await user.checkPassword(password))) {
      req.flash('error', 'Senha incorreta')
      return res.redirect('/')
    }

    // salva o usuário na sessao, estamos criando uma variavel session.user
    req.session.user = user

    // se entrar aqui é pq o usuario foi encontrado com a senha correta
    return res.redirect('/app/dashboard')
  }

  destroy(req, res) {
    // destroy a session e limpa os cookies
    req.session.destroy(() => {
      res.clearCookie('root')
      return res.redirect('/')
    })
  }
}
module.exports = new SesssionController()
