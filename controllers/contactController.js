const Contact = require('../models/contact')
const { validationResult } = require('express-validator')

// GET - informações de contacto (podes depois mover p/ BD se quiseres)
const getContact = (req, res) => {
  res.json({
    email: 'info@bmc-web.com',
    phone: '+258 87 858 9146',
    address: 'Av. Julius Nyerere, Cidade de Maputo, Moçambique',
  })
}

// POST - gravar mensagem no MongoDB
const sendMessage = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const { name, email, message } = req.body
    const newMessage = new Contact({ name, email, message })
    await newMessage.save()
    res.status(201).json(newMessage)
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar mensagem.' })
  }
}

// GET - listar todas as mensagens
const getMessages = async (req, res) => {
  try {
    const messages = await Contact.find()
    res.json(messages)
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar mensagens.' })
  }
}

// GET - buscar mensagem por ID
const getMessageById = async (req, res) => {
  try {
    const message = await Contact.findById(req.params.id)
    if (!message) {
      return res.status(404).json({ error: 'Mensagem não encontrada.' })
    }
    res.json(message)
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar mensagem.' })
  }
}

// DELETE - apagar mensagem por ID
const deleteMessage = async (req, res) => {
  try {
    const message = await Contact.findByIdAndDelete(req.params.id)
    if (!message) {
      return res.status(404).json({ error: 'Mensagem não encontrada.' })
    }
    res.json({ message: 'Mensagem removida com sucesso.' })
  } catch (err) {
    res.status(500).json({ error: 'Erro ao remover mensagem.' })
  }
}

module.exports = {
  getContact,
  sendMessage,
  getMessages,
  getMessageById,
  deleteMessage,
}
