module.exports = (req, res, next) => {
  // se tiver session e não tiver usuário
  // continua
  if (req.session && !req.session.user) {
    return next()
  }
  return res.redirect('/app/dashboard')
}
