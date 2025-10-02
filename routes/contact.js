const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const {
  getContact,
  sendMessage,
  getMessages,
  getMessageById,
  deleteMessage,
} = require('../controllers/contactController')

// GET - informações de contacto fixas (ou da BD, se quiseres)
router.get('/', getContact)

// GET - listar todas as mensagens recebidas
router.get('/messages', getMessages)

// GET - obter mensagem específica por ID
router.get('/messages/:id', getMessageById)

// POST - enviar mensagem (com validação)
router.post(
  '/messages',
  [
    body('name').notEmpty().withMessage('Nome é obrigatório'),
    body('email').isEmail().withMessage('Email inválido'),
    body('message').notEmpty().withMessage('Mensagem é obrigatória'),
  ],
  sendMessage
)

// DELETE - remover mensagem por ID
router.delete('/messages/:id', deleteMessage)

module.exports = router
