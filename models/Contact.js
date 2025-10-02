const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      match: [/^\S+@\S+\.\S+$/, 'Email inválido'],
    },
    message: {
      type: String,
      required: true,
      minlength: 5,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Contact', ContactSchema)
