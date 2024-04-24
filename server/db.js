// db.js

import { createPool } from 'mysql'

// 创建数据库连接池
const pool = createPool({
//   connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '310309',
  database: 'data'
})

// 封装查询函数
function query(sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err)
      }
      connection.query(sql, values, (err, results) => {
        connection.release()
        if (err) {
          return reject(err)
        }
        resolve(results)
      })
    })
  })
}

// 导出数据库连接池
export {
    query
  };