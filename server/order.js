import { Router } from 'express'
// import { hash, compare } from 'bcryptjs';
import { query } from './db.js'

const orderRouter = Router()

// 创建订单
orderRouter.post('/orderCreate', async (req, res) => {
  try {
    const {mid, gid, gName, gImages, gPrice, gDescribe, gState, gType, state} = req.body
    const uid = mid
    const now = Date.now()
    const sql = 'INSERT INTO orders (uid, gid, name, image, price, `describe`, state, type, createDate, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    await query(sql, [uid, gid, gName, gImages, gPrice, gDescribe, gState,gType, now, state])

    res.status(201).json({ message: 'INSERT successfully' })
  } catch (error) {
    console.error('Error registering user: ', error)
    res.status(500).json({ error: 'Registration failed' })
  }
})
// 根据 uid 查找

orderRouter.post('/findAllOrder', async (req, res) => {
  try {
    const { uid } = req.body;
    console.log(uid)
    const sql = 'SELECT * FROM orders WHERE uid = ?';
    const result =  await query(sql, [uid]);
    
    res.status(200).json({ data: result });
  } catch (error) {
    console.error('Error deleting order by uid: ', error);
    res.status(500).json({ error: 'Failed to delete order' });
  }
});

// 根据 uid 和 gid 删除订单
orderRouter.post('/deleteOrderByUidAndGid', async (req, res) => {
  try {
    const { uid, gid } = req.body;
    const sql = 'DELETE FROM orders WHERE uid = ? AND gid = ?';
    await query(sql, [uid, gid]);
    
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order by uid and gid: ', error);
    res.status(500).json({ error: 'Failed to delete order' });
  }
});

// 查询特定商品
orderRouter.get('/findGoodsByUidAndState', async (req, res) => {
  try {
    const { uid, state } = req.query;
    console.log('uid, state', uid, state);

    // 根据 uid 和 state 查询商品
    const sql = 'SELECT * FROM goods WHERE uid = ? AND state = ?';
    const goods = await query(sql, [uid, state]);

    if (goods.length > 0) {
      return res.status(200).json({ data: goods });
    } else {
      return res.status(404).json({ error: 'Goods not found for the specified uid and state' });
    }
  } catch (error) {
    console.error('Error finding goods: ', error);
    res.status(500).json({ error: 'Failed to find goods' });
  }
});

export default orderRouter
