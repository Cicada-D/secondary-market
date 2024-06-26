import { Router } from 'express'
// import { hash, compare } from 'bcryptjs';
import { query } from './db.js'

const messageRouter = Router()
//上传消息
messageRouter.post('/pushMessage', async (req, res) => {
  try {
    // 从请求主体中解构所需的字段
    const { formId, formName, formIcon, toId, toName, toIcon, message, createTime, gid } = req.body

    // SQL 插入语句
    const sql = `
        INSERT INTO messages (
          formId, formName, formIcon, toId, toName, toIcon, message, createTime, gid
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `

    // 执行 SQL 插入语句
    await query(sql, [formId, formName, formIcon, toId, toName, toIcon, message, createTime, gid])

    // 返回成功响应
    res.status(201).json({ message: 'INSERT successfully' })
  } catch (error) {
    console.error('Error inserting message: ', error)
    // 返回错误响应
    res.status(500).json({ error: 'Insertion failed' })
  }
})

//获取列表消息
messageRouter.post('/getToUser', async (req, res) => {
  try {
    // 从请求主体中解构 uid
    const { uid } = req.body

    // SQL 查询语句，用于查找 toId 与 uid 相同的数据，并根据 createTime 排序
    const sql = `
        SELECT * FROM messages 
        WHERE toId = ? or formId = ?
        ORDER BY createTime DESC
      `

    // 执行 SQL 查询
    const messages = await query(sql, [uid, uid])

    // 用于存储每个 formId 最新的消息
    const latestMessages = []
    const seenFormIds = new Set()

    // 过滤消息，确保每个 formId 只保留一个最新的消息
    for (const message of messages) {
      const sight1 = JSON.stringify(message.formId) + JSON.stringify(message.toId)

      const sight2 = JSON.stringify(message.toId) + JSON.stringify(message.formId)

      if (!seenFormIds.has(sight1) && !seenFormIds.has(sight2)) {
        latestMessages.push(message)
        seenFormIds.add(sight1)
        seenFormIds.add(sight2)
      }
    }

    console.log('latestMessages', latestMessages)

    // 返回查询结果
    res.status(200).json({ result: latestMessages })
  } catch (error) {
    console.error('Error fetching messages: ', error)
    // 返回错误响应
    res.status(500).json({ error: 'Failed to fetch messages' })
  }
})

//获取与选择对象聊天历史
messageRouter.post('/getToUserAllMessage', async (req, res) => {
  try {
    // 从请求主体中解构 uid
    const { uid, mid } = req.body

    console.log('uid: ', uid)
    console.log('mid: ', mid)
    // SQL 查询语句，用于查找 toId 与 uid 相同的数据，并根据 createTime 排序
    const sql1 = `
        SELECT * FROM messages 
        WHERE toId = ? and formId = ?
      `

    // 执行 SQL 查询
    const messagesOne = await query(sql1, [uid, mid])

    const sql2 = `
      SELECT * FROM messages 
      WHERE formId = ? and toId = ?
    `
    const messageTwo = await query(sql2, [uid, mid])

    console.log(messagesOne, messageTwo)

    const messages = [...messagesOne, ...messageTwo]
    console.log(messages)
    // 返回查询结果
    res.status(200).json({ result: messages })
  } catch (error) {
    console.error('Error fetching messages: ', error)
    // 返回错误响应
    res.status(500).json({ error: 'Failed to fetch messages' })
  }
})

export default messageRouter
