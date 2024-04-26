import { locationCreate, splitGETURL } from '@/lib/utils'

async function createOrder(goodsDetail) {
  console.log()
  //   console.log(gid)
  //   console.log(mid)
  const res = await fetch(locationCreate('orderCreate'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(goodsDetail)
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('添加订单失败!')
      }
      return response.json()
    })
    .then((data) => {
      console.log(data.message)
    })
    .catch((error) => {
      console.error(error) // 错误消息
    })

  return res
}

async function deletGoods(gid) {
  const res = await fetch(locationCreate('deleteGoods'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ gid })
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('商品下架失败!')
      }
      return response.json()
    })
    .then((data) => {
      console.log(data.message)
    })
    .catch((error) => {
      console.error(error) // 错误消息
    })

  return res
}
export async function buy(goods, mid, router) {
  console.log(goods)
  // eslint-disable-next-line no-unused-vars
  const { createDate, gDescribe, gImages, gName, gPrice, gState, gType, gid, uid } = goods
  const goodsDetail = { mid, gid, gName, gImages, gPrice, gDescribe, gState, gType }

  try {
    // 先执行创建订单操作
    const orderResult = await createOrder(goodsDetail, router)
    console.log('Order created:', orderResult)

    // 然后执行删除商品操作
    const deleteResult = await deletGoods(gid)
    console.log('Goods deleted:', deleteResult)
    if (!orderResult && !deleteResult) {
      router.push({ name: 'home' })
      return
    }
    alert('购买失败!')
    // 这里可以根据需要处理订单创建和商品删除的结果
  } catch (error) {
    console.error('Error:', error)
  }
}

export async function findAllOrder(uid) {
    const res =  await fetch(locationCreate('findAllOrder'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ uid })
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('添加订单失败!')
      }
      return response.json()
    })
    .then((result) => {
      console.log(result)
      return result
    })
    .catch((error) => {
      console.error(error) // 错误消息
    })
    return res
}

//查询待出售的订单
export async function getSalePending(uid){
  const body = {
    uid: uid,
    state: '1'
  }
  console.log('body', body)
  const geturl = splitGETURL(locationCreate('findGoodsByUidAndState'), body)
  const res =  await fetch(geturl)
    .then((response) => {
      if (!response.ok) {
        throw new Error('添加订单失败!')
      }
      return response.json()
    })
    .then((result) => {
      console.log(result)
      return result
    })
    .catch((error) => {
      console.error(error) // 错误消息
    })
    return res
}