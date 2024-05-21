import { Router } from 'express'
// import { hash, compare } from 'bcryptjs';
import { query } from './db.js'

const authRouter = Router()
const token = 1
const password = '123456'

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
    res.status(201).json({ message: 'User registered successfully', token: '1' })
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
    return res
      .status(201)
      .json({ message: 'Login succeefully', uid: user[0].uid, token: user[0].token, icon: user[0].icon, name: user[0].name })
  } catch (error) {
    console.error('Error logging in: ', error)
    res.status(500).json({ error: 'Login failed' })
  }
})

//修改个人信息
authRouter.post('/updateUser', async (req, res) => {
  try {
    const { uid, name, image, sex, age, describe } = req.body
    const sql =
      'UPDATE user SET name = ?, image = ?, sex = ?, age = ?, `describe` = ? WHERE uid = ?'
    const user = await query(sql, [name, image, sex, age, describe, uid])
    if (user.changedRows == 0) {
      res.status(404).json({ message: 'Not have the goods' })
    } else {
      res.status(201).json({ message: 'Update successfully' })
    }
  } catch (error) {
    console.error('Error registering user: ', error)
    res.status(500).json({ error: 'Registration failed' })
  }
})

authRouter.post('/findUserDetail', async (req, res) => {
  try {
    const { uid } = req.body;

    // SQL 查询语句，用于查询特定用户的消息
    const sql = `
      SELECT * FROM user WHERE uid = ? 
    `;

    // 执行 SQL 查询
    const result = await query(sql, [uid]);

    // 返回查询结果
    res.status(200).json({ result });
  } catch (error) {
    console.error('Error fetching messages: ', error);
    // 返回错误响应
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
})

export default authRouter
