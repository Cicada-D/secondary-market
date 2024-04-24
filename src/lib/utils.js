import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
//获取当前时间
export function getCurrentTime() {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const date = now.getDate()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  const seconds = now.getSeconds()
  const milliseconds = now.getMilliseconds()

  // 构造时间字符串，可以根据需要自定义格式
  const currentTime = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}.${milliseconds}`

  return currentTime
}
//格式化请求地址
export function locationCreate(local) {
  return 'http://localhost:3000/' + local
}

//获取唯一值(雪花算法)
export class Snowflake {
  constructor(workerId, datacenterId, sequence = 0) {
    this.workerId = workerId
    this.datacenterId = datacenterId
    this.sequence = sequence
    this.epoch = 1609459200000 // 默认起始时间戳为 2021-01-01 00:00:00 UTC
    this.workerIdBits = 5
    this.datacenterIdBits = 5
    this.maxWorkerId = -1 ^ (-1 << this.workerIdBits)
    this.maxDatacenterId = -1 ^ (-1 << this.datacenterIdBits)
    this.sequenceBits = 12
    this.workerIdShift = this.sequenceBits
    this.datacenterIdShift = this.sequenceBits + this.workerIdBits
    this.timestampLeftShift = this.sequenceBits + this.workerIdBits + this.datacenterIdBits
    this.sequenceMask = -1 ^ (-1 << this.sequenceBits)
    this.lastTimestamp = -1
  }

  nextId() {
    let timestamp = Date.now() - this.epoch

    if (timestamp === this.lastTimestamp) {
      this.sequence = (this.sequence + 1) & this.sequenceMask
      if (this.sequence === 0) {
        timestamp = this.tilNextMillis(this.lastTimestamp)
      }
    } else {
      this.sequence = 0
    }

    if (timestamp < this.lastTimestamp) {
      throw new Error('时钟回退了')
    }

    this.lastTimestamp = timestamp
    return (
      (timestamp << this.timestampLeftShift) |
      (this.datacenterId << this.datacenterIdShift) |
      (this.workerId << this.workerIdShift) |
      this.sequence
    )
  }

  tilNextMillis(lastTimestamp) {
    let timestamp = Date.now() - this.epoch
    while (timestamp <= lastTimestamp) {
      timestamp = Date.now() - this.epoch
    }
    return timestamp
  }
}

//拼接get请求
export function splitURL(url, data) {
  const queryString = new URLSearchParams(data).toString()
  return `${url}?${queryString}`
}
//拼接前端动态路由
export function splitRouter(url, gid) {
  return `${url}/${gid}`
}

//改变亲求回来的数据 (home里面调用的数据类型)
export function changeGoodsData(goods) {
  const products = []
  for (const item of goods) {
    const newHref = splitRouter('http://localhost:5173/index/goodsDetail', item.gid)
    const newImageSrc = item.gImages ? item.gImages.split(',') : 0
    const newPrice = item.gPrice + '$'
    console.log(item.Price)
    products.push({
      id: item.gid,
      name: item.gName,
      href: newHref,
      imageSrc: !newImageSrc ? null : newImageSrc[0],
      imageAlt: item.gDescribe,
      price: newPrice,
      color: item.gType
    })
  }
  console.log(products)
  return products
}

//改变亲求回来的数据 (商品详情页里面的数据类型)
export function changeGoodsDetail(goods) {
  let images = [
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-01.jpg'
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-02.jpg'
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-03.jpg'
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-04.jpg'
    }
  ]
  if (goods.gImages) {
    const x = goods.gImages.split(',')
    for (const key in x) {
      images[key] = {src: '../'+ x[key]}
      console.log(x[key])
    }
  }

  const product = {
    name: goods.gName,
    description: goods.gDescribe,
    features: [
      { name: '卖家', description: goods.uid },
      { name: '类型', description: goods.gType },
      {
        name: '损耗层度',
        description: goods.gState
      },
      { name: '价格', description: goods.gPrice + '$' }
    ],
    srcs: images
  }
  return product
}
