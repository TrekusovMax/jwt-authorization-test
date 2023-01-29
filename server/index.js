require('dotenv').config()
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const router = require('./router/index')

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use('/api', router)

mongoose.set('strictQuery', false)

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
    await mongoose.connect(
      process.env.DB_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      () => console.log('DB connected successfully'),
    )
  } catch (error) {
    console.log(error)
  }
}

start()
