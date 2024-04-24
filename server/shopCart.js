import { Router } from 'express'
// import { hash, compare } from 'bcryptjs';
import { query } from './db.js'

const cartRouter = Router()

// 加入购物车
cartRouter.post('/addCart', async (req, res) => {
  try {
    const { uid, gid, name, price, describe, image, createDate, deleDate } = req.body
    const sql =
      'INSERT INTO cart (uid, gid, name, price, `describe`, image, createDate, deleteDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    await query(sql, [uid, gid, name, price, describe, image, createDate, deleDate])
    res.status(201).json({ message: 'Add Goods successfully' })
  } catch (error) {
    console.error('Error adding goods: ', error)
    res.status(500).json({ error: 'Failed to add goods' })
  }
})
// 删除购物车

cartRouter.get('/deleteCart', async (req, res) => {
  try {
    const { uid, gid } = req.body
    const sql = 'DELETE FROM cart WHERE uid = ? AND gid = ?'
    const cart = await query(sql, [uid, gid])
    console.log(cart)
    if (cart.changedRows === 0){
        return res.status(401).json({ message: "Not delete"})
    }
    return res.status(200).json({ message: 'Delete Goods successfully' })
  } catch (error) {
    console.error('Error deleting goods: ', error)
    res.status(500).json({ error: 'Failed to delete goods' })
  }
})
// 查询购物车
cartRouter.get('/getCart', async (req, res) => {
  try {
    const { uid } = req.body
    const sql = 'SELECT * FROM cart WHERE uid = ?'
    const cart = await query(sql, [uid])
    console.log(cart)
    if (cart.changedRows === 0){
        return res.status(401).json({ message: "Not find"})
    }
    return res.status(200).json(cart)
  } catch (error) {
    console.error('Error getting goods: ', error)
    res.status(500).json({ error: 'Failed to get goods' })
  }
})

export default cartRouter
