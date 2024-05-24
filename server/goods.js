// routes/products.js

import { Router } from 'express'
// import { hash, compare } from 'bcryptjs';
import { query } from './db.js'
import { upload } from './image/pushGoodsImage.js'
import { gsplitBody } from './commit.js'

const goodsRouter = Router()

const multer = upload.fields([{ name: 'image', maxCount: 4 }])

// 添加商品
goodsRouter.post('/addGoods', multer, async (req, res) => {
  try {
    const body = req.body
    const images = req.files['image']
    const now = Date.now()
    const newData = gsplitBody(body, images)
    const { uid, gName, gDescribe, gImages, gPrice, gType, gState, state } = newData
    const sql =
      'INSERT INTO goods (uid, gName, gDescribe, gImages, gPrice, gType, gState, state, createDate ) VALUES (?, ?, ?, ? ,? ,? , ?, ?, ?)'
    await query(sql, [uid, gName, gDescribe, gImages, gPrice, gType, gState, state, now])
    res.status(201).json({ message: 'Add Goods Successfully' })
  } catch (error) {
    console.error('Error registering user: ', error)
    res.status(500).json({ error: 'Registration failed' })
  }
})

// 修改商品
goodsRouter.post('/updateGoods', multer, async (req, res) => {
  try {
    const body = req.body
    const images = req.files['image']
    const now = Date.now()
    const newData = gsplitBody(body, images)
    console.log(newData)
    const { gName, gDescribe, gImages, gPrice, gType, gState, state } = newData
    const sql = 'UPDATE goods SET gName = ?, gDescribe = ?, gImages = ?, gPrice = ?, gType = ?, gState = ? ,state = ? ,createDate = ? WHERE gid = ?'
    const sql1 = 'UPDATE orders SET price = ? WHRER gid = ?'
    const res = await query(sql, [gName, gDescribe, gImages, gPrice, gType, gState, state, now, parseInt(body.gid)])
    const res1 = await query(sql, [gPrice, parseInt(body.gid)])
    // console.log(count.changedRows)
    // if (count.changedRows == 0) {
    //   res.status(404).json({ message: 'Not have the goods' })
    // } else {
    //   res.status(201).json({ message: 'Update successfully' })
    // }
  } catch (error) {
    console.error('Error registering user: ', error)
    res.status(500).json({ error: 'Registration failed' })
  }
})

//删除商品
goodsRouter.post('/deleteGoods', async (req, res) => {
  try {
    const { gid } = req.body
    console.log(gid)
    const sql = 'DELETE FROM goods WHERE gid = ?'
    await query(sql, [gid])
    return res.status(201).json({ message: 'Delete successfully' })
  } catch (error) {
    console.error('Error registering user: ', error)
    res.status(500).json({ error: 'Registration failed' })
  }
})
//删除来自购物车的商品
goodsRouter.post('/deleteGoodsFromCart', async (req, res) => {
  try {
    const { gid } = req.body
    console.log('gid', gid)
    // 构建带有相同数量占位符的字符串，例如: "?, ?, ?, ?"
    const placeholders = gid.map(() => '?').join(', ')

    // 准备 SQL 语句
    const sql = `DELETE FROM goods WHERE gid IN (${placeholders})`
    console.log('sql', sql)
    
    await query(sql, [...gid])
    return res.status(201).json({ message: 'Delete successfully' })
  } catch (error) {
    console.error('Error registering user: ', error)
    res.status(500).json({ error: 'Registration failed' })
  }
})

// 查询特定商品
goodsRouter.get('/findGoods', async (req, res) => {
  try {
    const { gid } = req.query
    console.log(gid)
    const sql = 'SELECT * FROM goods WHERE gid = ?'
    const good = await query(sql, [gid])
    if (good.length > 0) {
      return res.status(201).json({ message: good })
    } else {
      return res.status(400).json({ error: 'Goods not find' })
    }
  } catch (error) {
    console.error('Error registering user: ', error)
    res.status(500).json({ error: 'Registration failed' })
  }
})

// 每次查询num个商品
goodsRouter.get('/getGoodsTen', async (req, res) => {
  try {
    const { gid, uid, num } = req.query // 假设你从查询参数中获取 gid
    console.log(gid)
    const sql = 'SELECT * FROM goods WHERE gid > ? AND uid NOT IN (?) ORDER BY gid ASC LIMIT ?' // 查询比特定 gid 更大的 gid 值的记录，并返回接下来的10个记录
    const goods = await query(sql, [gid, uid, parseInt(num)]) // 假设 gid 是从查询参数中获取的值
    console.log(goods)
    if (goods.length > 0) {
      return res.status(200).json({ message: goods })
    } else {
      return res.status(204).json({ message: [] })
    }
  } catch (error) {
    console.error('Error finding goods: ', error)
    res.status(500).json({ error: 'Failed to find goods' })
  }
})

//根据类型判断查询内容
goodsRouter.get('/getGoodsByType', async (req, res) => {
  try {
    const { type, gid, num } = req.query // 从查询参数中获取 type 和 gid
    console.log(type, gid)

    // 构建 SQL 查询语句，根据 type 和 gid 来查询对应的商品
    let sql = 'SELECT * FROM goods'
    const params = []

    if (type === '二手车' || type === '二手数码' || type === '二手服装' || type === '其它') {
      sql += ' WHERE gType = ?'
      params.push(type)
    }

    if (gid) {
      sql += ' AND gid > ?'
      params.push(gid)
    }
    if (num) {
      sql += ' ORDER BY gid ASC LIMIT ?'
      params.push(parseInt(num))
    }

    const goods = await query(sql, params) // 执行查询
    console.log(goods)

    if (goods.length > 0) {
      return res.status(200).json({ message: goods })
    } else {
      return res.status(204).json({ message: [] })
    }
  } catch (error) {
    console.error('Error finding goods: ', error)
    res.status(500).json({ error: 'Failed to find goods' })
  }
})
export default goodsRouter
