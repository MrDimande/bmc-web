const jwt = require('jsonwebtoken')

function authMiddleware(req, res, next) {
  const token = req.headers['authorization']

  if (!token) {
    return res
      .status(401)
      .json({ error: 'Acesso negado. Token não fornecido.' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'chave_secreta')
    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido.' })
  }
}

module.exports = authMiddleware

