import { locationCreate } from '@/lib/utils'

//确定购物车里面的订单
async function pushCart(data) {
  // console.log(data[0])
  const res = await fetch(locationCreate('orderCreateCart'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ data: data, uid: localStorage.getItem('uid') })
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('创建订单失败！')
      }
      return response.json()
    })
    .then((data) => {
      console.log(data)
      return 1
    })
    .catch((error) => {
      console.error(error.message) // 错误消息
    })
  return res
}

//将确定的购物车订单去除
async function deleteGoodsFromCart(gid) {
  const res = await fetch(locationCreate('deleteGoods'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ gid })
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('商品下架失败!', { cause: 0 })
      }
      return response.json()
    })
    .then((data) => {
      console.log(data.message)
      return 1
    })
    .catch((error) => {
      console.error(error) // 错误消息
      return error.cause
    })
  return res
}

//提交订单后先确定订单后面删除商品
export async function cartOrder(data) {
  const num = Object.keys(data).length
  if (num === 0) {
    return 0
  } else {
    const res = await pushCart(data)
    if (res === 1) {
      for (const item of data) {
        // console.log("item", item)
        const gid = item.id
        const res = await deleteGoodsFromCart(gid)
        if (res === 1) {
          continue
        } else {
          console.log('删除商品失败!')
          break
        }
      }
    } else console.log('确定订单失败!')
  }
}
