module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    // a variavel res.locals deixa a variavael disponivel em toda a view
    // res.locals fica disponível para toda engine nunjucks
    res.locals.user = req.session.user

    return next()
  }

  return res.redirect('/')
}
