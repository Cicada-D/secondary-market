import { Router } from 'express'
// import { hash, compare } from 'bcryptjs';
import { query } from './db.js'
import { upload } from './image/pushGoodsImage.js'
import { gsplitUserBody } from './commit.js'

const authRouter = Router()
const token = 1
const password = '123456'
const multer = upload.fields([{ name: 'image', maxCount: 2 }])

// 注册用户
authRouter.post('/register', async (req, res) => {
  try {
    const { username } = req.body
    console.log(req.body)
    // 检查用户名是否已存在
    const existingUser = await query('SELECT * FROM user WHERE username = ?', [username])
    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'Username already exists' })
    }
    // 对密码进行哈希处理
    // const hashedPassword = await hash(password, 10);
    // 将用户插入数据库
    await query('INSERT INTO user (username, password, token) VALUES (?, ?, ?)', [
      username,
      password,
      token
    ])
    const user = await query('SELECT * FROM user WHERE username = ? and password = ?', [
      username,
      password
    ])
    return res.status(201).json({
      message: 'Regist succeefully',
      uid: user[0].uid,
      token: user[0].token
    })
  } catch (error) {
    console.error('Error registering user: ', error)
    res.status(500).json({ error: 'Registration failed' })
  }
})

// 用户登录
authRouter.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    // 检查用户名是否存在
    const user = await query('SELECT * FROM user WHERE username = ?', [username])
    if (user.length === 0) {
      return res.status(401).json({ error: 'Invalid username or password' })
    }
    // 检查密码是否匹配
    // const passwordMatch = await compare(password, user[0].password);
    if (!password) {
      return res.status(401).json({ error: 'Invalid username or password' })
    }
    // console.log(user[0].uid)
    return res.status(201).json({
      message: 'Login succeefully',
      uid: user[0].uid,
      token: user[0].token,
      icon: user[0].image,
      name: user[0].name
    })
  } catch (error) {
    console.error('Error logging in: ', error)
    res.status(500).json({ error: 'Login failed' })
  }
})

// 上传个人信息
authRouter.post('/pushUserDetail', multer, async (req, res) => {
  try {
    // console.log(req.body)
    // console.log(req.files['image'])
    const body = req.body
    console.log('body', body)
    const images = req.files['image']
    console.log(images)
    const newData = gsplitUserBody(body, images)
    const { uid, name, sex, age, image, describe, sit } = newData
    const sql =
      'UPDATE user SET name = ?, sex = ?, age = ?, image = ?, `describe` = ?, site = ? WHERE uid = ?'
    await query(sql, [name, sex, age, image, describe, sit, parseInt(uid)])
    res.status(201).json({ message: 'Create User Successfully', icon: image, name: name })
  } catch (error) {
    console.error('Error registering user: ', error)
    res.status(500).json({ error: 'Registration failed' })
  }
})

//修改个人信息
authRouter.post('/updateUser', multer, async (req, res) => {
  try {
    const body = req.body
    const site = req.body.site
    console.log('body: ', body)
    const images = req.files['image']
    console.log('images: ', images)
    const newData = gsplitUserBody(body, images)
    const { uid, name, sex, age, image, describe } = newData
    console.log('sit: ', site)
    const sql =
      'UPDATE user SET name = ?, sex = ?, age = ?, image = ?, `describe` = ?, site = ? WHERE uid = ?'
    await query(sql, [name, sex, age, image, describe, site, parseInt(uid)])
    res.status(201).json({ message: 'Create User Successfully', image: image })
  } catch (error) {
    console.error('Error registering user: ', error)
    res.status(500).json({ error: 'Registration failed' })
  }
})

//查询个人信息
authRouter.post('/findUserDetail', async (req, res) => {
  try {
    const { uid } = req.body

    // SQL 查询语句，用于查询特定用户的消息
    const sql = 'SELECT name, age, sex, `describe`, site, image, uid, image FROM user WHERE uid = ?'

    // 执行 SQL 查询
    const result = await query(sql, [uid])

    // 返回查询结果
    res.status(200).json({ result })
  } catch (error) {
    console.error('Error fetching messages: ', error)
    // 返回错误响应
    res.status(500).json({ error: 'Failed to fetch messages' })
  }
})
// 361129200204111111
authRouter.post('/pushChangeToken', async (req, res) => {
  try {
    const { uid, name, identityCard } = req.body
    console.log(uid, name, identityCard)
    const sql = 'INSERT INTO changeToken (uid, name, identity) VALUE (?, ?, ?)'
    await query(sql, [uid, name, identityCard])
    res.status(201).json({ message: 'Push successfully' })
  } catch (error) {
    console.error('Error registering user: ', error)
    res.status(500).json({ error: 'Registration failed' })
  }
})
export default authRouter
