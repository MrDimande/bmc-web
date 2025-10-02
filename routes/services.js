const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} = require('../controllers/servicesController')

// GET - listar todos
router.get('/', getServices)

// GET - buscar um
router.get('/:id', getServiceById)

// POST - criar
router.post(
  '/',
  [
    body('title').notEmpty().withMessage('Título obrigatório'),
    body('description').notEmpty().withMessage('Descrição obrigatória'),
  ],
  createService
)

// PUT - atualizar
router.put('/:id', updateService)

// DELETE - apagar
router.delete('/:id', deleteService)

module.exports = router
