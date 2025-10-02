const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/bmcweb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('MongoDB ligado com sucesso')
  } catch (err) {
    console.error('Erro ao ligar ao MongoDB:', err.message)
    process.exit(1)
  }
}

module.exports = connectDB
