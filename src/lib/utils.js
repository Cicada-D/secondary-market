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
export function splitGETURL(url, data) {
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

//     {
//         id: '1',
//         name: '长袖',
//         style: '黑色',
//         describe: '保暖很厚',
//         price: '$123',
//         imgSrc: 'https://tailwindui.com/img/ecommerce-images/checkout-page-02-product-01.jpg',
//     },
//改变亲求回来的数据(type里面调用)
export function changeGoodsDataType(goods) {
  console.log('goods', goods)
  const products = []
  for (const item of goods) {
    const newHref = splitRouter('http://localhost:5173/index/goodsDetail', item.gid)
    const newImageSrc = item.gImages ? item.gImages.split(',') : 0
    const newPrice = item.gPrice + '$'
    // console.log(item.gPrice)
    products.push({
      id: item.gid,
      name: item.gName,
      href: newHref,
      imageSrc: !newImageSrc ? null : '../' + newImageSrc[0],
      describe: item.describe,
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
      images[key] = { src: '../' + x[key] }
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

// {
//   id: '1',
//   name: '长袖',
//   style: '黑色',
//   describe: '保暖很厚',
//   price: '$123',
//   imgSrc: 'https://tailwindui.com/img/ecommerce-images/checkout-page-02-product-01.jpg',
// },
//修改订单展示数据
export function changeAllOrderData(goods) {
  const res = []
  console.log(goods)
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

  for (const item of goods.data) {
    // console.log(item)

    const date = new Date(parseInt(item.createDate))

    // 获取年月日
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0') // 月份从 0 开始，所以要加 1
    const day = String(date.getDate()).padStart(2, '0')

    // 格式化后的年月日
    const formattedDate = `${year}-${month}-${day}`
    console.log('year', year)

    if (item.image != null) {
      images[0].src = '../' + item.image.split(',')[0]
    }

    const x = {
      id: item.gid,
      name: item.name,
      style: item.type,
      describe: item.describe,
      price: '$' + item.price,
      imgSrc: images[0].src,
      createTime: formattedDate
    }
    res.push(x)
  }
  // console.log(res)
  return res
}

//修改salepending获取的数据
export function changesalePending(goods) {
  const res = []
  // console.log(goods)
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

  for (const item of goods) {
    // console.log(item)
    let formattedDate = ''
    let gdescribe = item.gDescribe
    if (item.createDate != null) {
      const date = new Date(parseInt(item.createDate))

      // 获取年月日
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0') // 月份从 0 开始，所以要加 1
      const day = String(date.getDate()).padStart(2, '0')

      // 格式化后的年月日
      formattedDate = `${year}-${month}-${day}`
    }
    // console.log('1:',item.images)
    if (item.gImages != null) {
      images[0].src = '../' + item.gImages.split(',')[0]
    }
    // console.log('year', year)

    if (item.gDescribe.length > 50) {
      gdescribe = item.gDescribe.slice(0, 50) + '...'
    }
    const x = {
      id: item.gid,
      name: item.gName,
      style: item.gType,
      describe: gdescribe,
      gDescribe: item.gDescribe,
      price: '$' + item.gPrice,
      imgSrc: images[0].src,
      createTime: formattedDate
    }
    res.push(x)
  }
  // console.log(res)
  return res
}

//防抖包装
export function debounce(fn, wait) {
  let time
  // let state
  return (...args) => {
    clearTimeout(time)
    time = setTimeout(async () => {
      await fn(...args)
      // console.log('state', state)
    }, wait)
  }
}
