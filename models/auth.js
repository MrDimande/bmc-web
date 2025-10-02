const express = require('express')
const router = express.Router()
const { register, login } = require('../controllers/authController')

// Rota de registro (apenas para criar o 1º admin, depois podes desativar)
router.post('/register', register)

// Rota de login
router.post('/login', login)

module.exports = router
// Exportar o router
// module.exports = router