const Service = require('../models/Service')
const { validationResult } = require('express-validator')

// GET - listar todos os serviços
const getServices = async (req, res) => {
  try {
    const services = await Service.find()
    res.json(services)
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar serviços.' })
  }
}

// GET - buscar serviço por ID
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
    if (!service) {
      return res.status(404).json({ error: 'Serviço não encontrado.' })
    }
    res.json(service)
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar serviço.' })
  }
}

// POST - criar novo serviço
const createService = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const { title, description } = req.body
    const newService = new Service({ title, description })
    await newService.save()
    res.status(201).json(newService)
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar serviço.' })
  }
}

// PUT - atualizar serviço
const updateService = async (req, res) => {
  try {
    const { id } = req.params
    const updatedService = await Service.findByIdAndUpdate(id, req.body, {
      new: true,
    })
    if (!updatedService) {
      return res.status(404).json({ error: 'Serviço não encontrado.' })
    }
    res.json(updatedService)
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar serviço.' })
  }
}

// DELETE - apagar serviço
const deleteService = async (req, res) => {
  try {
    const { id } = req.params
    const service = await Service.findByIdAndDelete(id)
    if (!service) {
      return res.status(404).json({ error: 'Serviço não encontrado.' })
    }
    res.json({ message: 'Serviço removido com sucesso.' })
  } catch (err) {
    res.status(500).json({ error: 'Erro ao remover serviço.' })
  }
}

module.exports = {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
}
