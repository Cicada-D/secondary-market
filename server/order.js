import { Router } from 'express';
// import { hash, compare } from 'bcryptjs';
import { query } from './db.js';

const orderRouter = Router();

// 创建订单
// orderRouter.post('/orderCreate', async (req, res) => {
//   try {

//   } catch (error) {
//     console.error('Error registering user: ', error);
//     res.status(500).json({ error: 'Registration failed' });
//   }
// });
// 删除订单
export default orderRouter;