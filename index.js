const express = require('express') // Importar o framework Express
const path = require('path') // Importar o módulo path
const cors = require('cors') // Importar o middleware CORS
const authRoutes = require('./routes/auth') // Importar as rotas de autenticação

// Importar as rotas
const aboutRoutes = require('./routes/about')
const contactRoutes = require('./routes/contact')
const servicesRoutes = require('./routes/services')

// Importar middlewares personalizados
const errorMiddleware = require('./middlewares/errorMiddleware')
const loggerMiddleware = require('./middlewares/loggerMiddleware')

const app = express()
const port = process.env.PORT || 3000 // Usar a porta 3000 se não estiver definida

// Middlewares globais
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Usar middlewares personalizados (ordem importa!)
app.use(loggerMiddleware) // deve vir antes das rotas

// Usar as rotas importadas
app.use('/about', aboutRoutes) // Rotas sobre a empresa
app.use('/contact', contactRoutes) // Rotas de contacto
app.use('/services', servicesRoutes) // Rotas de serviços
app.use('/api/auth', authRoutes) // Rotas de autenticação

// Servir páginas estáticas da pasta "views"
app.use(express.static(path.join(__dirname, 'views')))

// Rota principal que serve o arquivo index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'))
})

// 404 handler - Rota não encontrada
app.use((req, res) => res.status(404).json({ error: 'Rota não encontrada' }))

// Error handler personalizado (deve ser o último)
app.use(errorMiddleware)

// Iniciar o servidor na porta especificada
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
