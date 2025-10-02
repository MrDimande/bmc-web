const About = require('../models/About')
const { validationResult } = require('express-validator')

// GET - buscar info da empresa
const getAbout = async (req, res) => {
  try {
    const about = await About.findOne()
    if (!about) {
      return res.status(404).json({ error: 'Informações não encontradas.' })
    }
    res.json(about)
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar informações.' })
  }
}

// POST - criar info da empresa
const createAbout = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  try {
    const { email, phone, address } = req.body
    const newAbout = new About({ email, phone, address })
    await newAbout.save()
    res.status(201).json(newAbout)
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar informações.' })
  }
}

// PUT - atualizar info da empresa
const updateAbout = async (req, res) => {
  try {
    const { id } = req.params
    const updatedAbout = await About.findByIdAndUpdate(id, req.body, {
      new: true,
    })
    if (!updatedAbout) {
      return res.status(404).json({ error: 'Informações não encontradas.' })
    }
    res.json(updatedAbout)
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar informações.' })
  }
}

// DELETE - apagar info da empresa
const deleteAbout = async (req, res) => {
  try {
    const { id } = req.params
    const about = await About.findByIdAndDelete(id)
    if (!about) {
      return res.status(404).json({ error: 'Informações não encontradas.' })
    }
    res.json({ message: 'Informações removidas com sucesso.' })
  } catch (err) {
    res.status(500).json({ error: 'Erro ao remover informações.' })
  }
}

module.exports = { getAbout, createAbout, updateAbout, deleteAbout }
