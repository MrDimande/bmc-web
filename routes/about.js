const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const {
  getAbout,
  createAbout,
  updateAbout,
  deleteAbout,
} = require('../controllers/aboutController')

// GET - info da empresa
router.get('/', getAbout)

// POST - criar info
router.post(
  '/',
  [
    body('email').isEmail().withMessage('Email inválido'),
    body('phone').notEmpty().withMessage('Telefone obrigatório'),
    body('address').notEmpty().withMessage('Endereço obrigatório'),
  ],
  createAbout
)

// PUT - atualizar info
router.put('/:id', updateAbout)

// DELETE - apagar info
router.delete('/:id', deleteAbout)

module.exports = router
