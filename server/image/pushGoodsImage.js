import multer from 'multer'
import path from 'path'
// import util from 'util'
// 设置 Multer 中间件，配置文件上传目录
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/') // 将文件保存到 ../public 目录中
  },
  filename: function (req, file, cb) {
    // 生成随机文件名，保持文件的唯一性
    const fileName =
      Date.now() + '-' + Math.round(Math.random() * 1e9) + path.extname(file.originalname)
    cb(null, fileName)
  }
})

const upload = multer({ storage: storage })

export { upload }
