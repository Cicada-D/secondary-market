// import { Router } from 'express'
// import { register, login } from './users.js'
// const router = Router()

// // 注册路由
// router.post('/register', (req, res) => {

//   const { username, password } = req.body
//   const result = register(username, password)
//   res.status(result.status).json({ message: result.message})
// })

// // 登录路由
// router.post('/login', (req, res) => {
//   // console.log(req.body)

//   const { username, password } = req.body
//   const result = login(username, password)
//   res.status(result.status).json({ message: {token:1} })
// })

// export default router
