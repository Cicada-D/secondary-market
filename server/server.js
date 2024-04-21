import express from 'express'
// import { urlencoded, json } from 'body-parser';
import routes from './routes.js'
import bodyParser from 'body-parser'
const app = express()
const PORT = 3000

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method'
  )
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE')
  res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE')
  next()
})

// 使用路由
app.use('/', routes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
