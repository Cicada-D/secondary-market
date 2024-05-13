import { Router } from 'express'
// import { hash, compare } from 'bcryptjs';
import { query } from './db.js'

const orderRouter = Router()

// 创建未完成订单
orderRouter.post('/orderCreate', async (req, res) => {
  try {
    const { mid, gid, gName, gImages, gPrice, gDescribe, gState, gType } = req.body
    const uid = mid
    const now = Date.now()
    const start = 1,
      end = 0
    const sql =
      'INSERT INTO orders (uid, gid, name, image, price, `describe`, state, type, createDate, start, end) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    await query(sql, [uid, gid, gName, gImages, gPrice, gDescribe, gState, gType, now, start, end])

    res.status(201).json({ message: 'INSERT successfully' })
  } catch (error) {
    console.error('Error registering user: ', error)
    res.status(500).json({ error: 'Registration failed' })
  }
})
//加入购物车
orderRouter.post('/pushCart', async (req, res) => {
  try {
    const { mid, gid, gName, gImages, gPrice, gDescribe, gState, gType } = req.body
    const uid = mid
    const now = Date.now()
    const start = 0,
      end = 0
    const sql =
      'INSERT INTO orders (uid, gid, name, image, price, `describe`, state, type, createDate, start, end) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    await query(sql, [uid, gid, gName, gImages, gPrice, gDescribe, gState, gType, now, start, end])

    res.status(201).json({ message: 'INSERT successfully' })
  } catch (error) {
    console.error('Error registering user: ', error)
    res.status(500).json({ error: 'Registration failed' })
  }
})
//从购物车加入订单
orderRouter.post('/orderCreateCart', async (req, res) => {
  try {
    const { data, uid } = req.body
    var currentTimeMillis = new Date().getTime()

    // 将毫秒数转换为 0 到 99 之间的数字
    var end = currentTimeMillis % 100
    for (const item of data) {
      // console.log('item', item)
      const { id } = item
      const sql = `UPDATE orders SET end = ?, start = 1 WHERE uid = ? AND gid = ?`
      await query(sql, [end, uid, id])
    }
    res.status(201).json({ message: 'Successfully' })
    // console.log('uid', uid)

    // const {mid, gid, gName, gImages, gPrice, gDescribe, gState, gType} = req.body
    // const uid = mid
    // const now = Date.now()
    // const start = 1, end = 0
    // const sql = 'INSERT INTO orders (uid, gid, name, image, price, `describe`, state, type, createDate, start, end) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    // await query(sql, [uid, gid, gName, gImages, gPrice, gDescribe, gState,gType, now, start, end])

    // res.status(201).json({ message: 'INSERT successfully' })
  } catch (error) {
    console.error('Error registering user: ', error)
    res.status(500).json({ error: 'Registration failed' })
  }
})
// 根据 uid 查找当前用户所有的订单(除了购物车里面的订单)
orderRouter.post('/findAllOrder', async (req, res) => {
  try {
    const { uid } = req.body
    console.log(uid)
    const sql = 'SELECT * FROM orders WHERE uid = ? AND start != 0'
    const result = await query(sql, [uid])

    res.status(200).json({ data: result })
  } catch (error) {
    console.error('Error deleting order by uid: ', error)
    res.status(500).json({ error: 'Failed to delete order' })
  }
})

//查询用户已完成的订单
orderRouter.get('/findOrderByStart', async (req, res) => {
  try {
    const { uid } = req.query
    console.log(uid)
    const sql = 'SELECT * FROM orders WHERE uid = ? AND start = 2'
    const result = await query(sql, [uid])

    res.status(200).json({ data: result })
  } catch (error) {
    console.error('Error deleting order by uid: ', error)
    res.status(500).json({ error: 'Failed to delete order' })
  }
})
//查询用户未完成的订单
orderRouter.get('/getUnfiledOrder', async (req, res) => {
  try {
    const { uid } = req.query
    console.log(uid)
    const sql = 'SELECT * FROM orders WHERE uid = ? AND start = 1'
    const result = await query(sql, [uid])

    res.status(200).json({ data: result })
  } catch (error) {
    console.error('Error deleting order by uid: ', error)
    res.status(500).json({ error: 'Failed to delete order' })
  }
})

// 根据 uid 和 gid 删除订单
orderRouter.post('/deleteOrderByUidAndGid', async (req, res) => {
  try {
    const { uid, gid } = req.body
    const sql = 'DELETE FROM orders WHERE uid = ? AND gid = ?'
    await query(sql, [uid, gid])

    res.status(200).json({ message: 'Order deleted successfully' })
  } catch (error) {
    console.error('Error deleting order by uid and gid: ', error)
    res.status(500).json({ error: 'Failed to delete order' })
  }
})

// 查询用户待出售的商品
orderRouter.get('/findGoodsByUidAndState', async (req, res) => {
  try {
    const { uid, state } = req.query
    console.log('uid, state', uid, state)

    // 根据 uid 和 state 查询商品
    const sql = 'SELECT * FROM goods WHERE uid = ? AND state = ?'
    const goods = await query(sql, [uid, state])

    res.status(200).json({ data: goods })
  } catch (error) {
    // console.error('Error finding goods: ', error)
    res.status(500).json({ error: 'Failed to find goods' })
  }
})

//查询购物车里面的内容
orderRouter.get('/findShoppingCart', async (req, res) => {
  try {
    const { uid } = req.query
    console.log(uid)
    const sql = 'SELECT * FROM orders WHERE uid = ? AND start = 0'
    const result = await query(sql, [uid])

    res.status(200).json({ data: result })
  } catch (error) {
    console.error('Error deleting order by uid: ', error)
    res.status(500).json({ error: 'Failed to delete order' })
  }
})

export default orderRouter
