import express from 'express'
// import { urlencoded, json } from 'body-parser';
// import routes from './routes.js'
import bodyParser from 'body-parser'
import authRouter from './users.js'
import goodsRouter from './goods.js'
import cartRouter from './shopCart.js'
import orderRouter from './order.js'

import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
// import { upload } from './image/pushGoodsImage.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

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

// app.post('/upload', upload.fields([
//   {name: 'name', maxCount: 10},
//   {name: 'images', maxCount: 4}
// ]), (req, res) => {
//   if (!req.files || req.files.length === 0) {
//     return res.status(400).send('未上传文件');
//   }
//   console.log(req.files['images'])
//   console.log("   ")
//   console.log(req.body['name'])

//   res.send('文件已上传');
// });

// 使用路由
app.use('/', authRouter)

app.use('/', goodsRouter)

app.use('/', cartRouter)
app.use('/', orderRouter)

// 设置静态文件目录，可以让客户端访问上传的图片

app.use('../public', express.static(path.join(__dirname, '../public')))

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
