const okta = require('../lib/okta')

exports.auth = async (req, res) => {
  const { username, password } = req.body
  const user = await okta.auth(username, password)
  req.session.user = user
  res.sendStatus(200)
}

exports.signout = async (req, res) => {
  req.session.destroy()
  res.redirect('/')
}
