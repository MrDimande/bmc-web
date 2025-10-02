const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Registrar admin (podes comentar depois de criar o 1º admin)
const register = async (req, res) => {
  try {
    const { username, password } = req.body

    // verificar se já existe
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return res.status(400).json({ error: 'Usuário já existe' })
    }

    // gerar hash da password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({ username, password: hashedPassword })
    await newUser.save()

    res.status(201).json({ message: 'Usuário criado com sucesso' })
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar usuário' })
  }
}

// Login
const login = async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await User.findOne({ username })
    if (!user) {
      return res.status(400).json({ error: 'Credenciais inválidas' })
    }

    // comparar password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ error: 'Credenciais inválidas' })
    }

    // gerar token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    res.json({ token })
  } catch (err) {
    res.status(500).json({ error: 'Erro no login' })
  }
}

module.exports = { register, login }
