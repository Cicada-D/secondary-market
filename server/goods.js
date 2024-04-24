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
    // console.log(req.body)
    // console.log(req.files['image'])
    const body = req.body
    const images = req.files['image']
    // console.log(images)
    // console.log(gsplitBody(body, images))
    const newData = gsplitBody(body, images)
    const { uid, gName, gDescribe, gImages, gPrice, gType, gState } = newData
    // console.log(gImages)
    const sql =
      'INSERT INTO goods (uid, gName, gDescribe, gImages, gPrice, gType, gState) VALUES (?, ?, ?, ? ,? ,? ,? )'
    await query(sql, [uid, gName, gDescribe, gImages, gPrice, gType, gState])
    res.status(201).json({ message: 'Add Goods successfully' })
  } catch (error) {
    console.error('Error registering user: ', error)
    res.status(500).json({ error: 'Registration failed' })
  }
})

// 添加商品
// goodsRouter.post('/addGoods', async (req, res) => {
//   try {
//     const { uid, gName, gDescribe, gImages, gPrice, gType, gState } = req.body
//     const sql =
//       'INSERT INTO goods (uid, gName, gDescribe, gImages, gPrice, gType, gState) VALUES (?, ?, ?, ? ,? ,? ,? )'
//     await query(sql, [uid, gName, gDescribe, gImages, gPrice, gType, gState])
//     res.status(201).json({ message: 'Add Goods successfully' })
//   } catch (error) {
//     console.error('Error registering user: ', error)
//     res.status(500).json({ error: 'Registration failed' })
//   }
// })

// 修改商品
goodsRouter.post('/updateGoods', async (req, res) => {
  try {
    const { gid, uid, gName, gDescribe, gImages, gPrice, gType, gState } = req.body
    const sql = `
    UPDATE goods 
    SET 
      gName = ?, 
      gDescribe = ?, 
      gImages = ?, 
      gPrice = ?, 
      gType = ?, 
      gState = ? 
    WHERE gid = ? AND uid = ?`

    const count = await query(sql, [gName, gDescribe, gImages, gPrice, gType, gState, gid, uid])
    console.log(count.changedRows)
    if (count.changedRows == 0) {
      res.status(404).json({ message: 'Not have the goods' })
    } else {
      res.status(201).json({ message: 'Update successfully' })
    }
  } catch (error) {
    console.error('Error registering user: ', error)
    res.status(500).json({ error: 'Registration failed' })
  }
})

//删除商品
goodsRouter.post('/deleteGoods', async (req, res) => {
  try {
    const { gid } = req.body
    const sql = 'DELETE FROM goods WHERE gid = ?'
    await query(sql, [gid])
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

// 每次查询10个商品
goodsRouter.get('/getGoodsTen', async (req, res) => {
  try {
    const { gid } = req.query; // 假设你从查询参数中获取 gid
    console.log(gid)
    const sql = 'SELECT * FROM goods WHERE gid > ? ORDER BY gid ASC LIMIT 10'; // 查询比特定 gid 更大的 gid 值的记录，并返回接下来的10个记录
    const goods = await query(sql, [gid]); // 假设 gid 是从查询参数中获取的值
    console.log(goods)
    if (goods.length > 0) {
      return res.status(200).json({ message: goods });
    } else {
      return res.status(404).json({ error: 'No goods found' });
    }
  } catch (error) {
    console.error('Error finding goods: ', error);
    res.status(500).json({ error: 'Failed to find goods' });
  }
});

export default goodsRouter
