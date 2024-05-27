import { locationCreate, splitGETURL } from '@/lib/utils'
import { pushMessage } from '@/pages/chat/component/common'
//创建未完成的订单
async function createOrder(goodsDetail) {
  // console.log()
  const res = await fetch(locationCreate('orderCreate'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(goodsDetail)
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('添加订单失败!', { cause: 0 })
      }
      return response.json()
    })
    .then((data) => {
      // console.log(data.message)
      return data
    })
    .catch((error) => {
      console.error(error) // 错误消息
      return error.cause
    })

  return res
}
//删除商品
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
        throw new Error('商品下架失败!', { cause: 0 })
      }
      return response.json()
    })
    .then((data) => {
      // console.log(data.message)
      return data
    })
    .catch((error) => {
      console.error(error) // 错误消息
      return error.cause
    })

  return res
}
export async function buy(goods, mid, router) {
  console.log(goods)
  const { gDescribe, gImages, gName, gPrice, gState, gType, gid } = goods
  const goodsDetail = { mid, gid, gName, gImages, gPrice, gDescribe, gState, gType }

  // const orderResult = await createOrder(goodsDetail, router)
  // console.log(orderResult)
  try {
    // 先执行创建订单操作
    const orderResult = await createOrder(goodsDetail, router)
    console.log('Order created:', orderResult)
    if (orderResult != 0) {
      const deleteResult = await deletGoods(gid)
      // console.log('Goods deleted:', deleteResult)
      if (deleteResult != 0) {
        router.push({ name: 'home' })
        return
      } else {
        alert('购买失败')
      }
    }
    // 然后执行删除商品操作

    alert('购买失败!')
    // 这里可以根据需要处理订单创建和商品删除的结果
  } catch (error) {
    console.error('Error:', error)
  }
}
//查询所有订单
export async function findAllOrder(uid) {
  const res = await fetch(locationCreate('findAllOrder'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ uid })
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('查询订单失败!', { cause: 0 })
      }
      return response.json()
    })
    .then((result) => {
      // console.log(result)
      return result
    })
    .catch((error) => {
      console.error(error) // 错误消息
      return error.cause
    })
  return res
}

//查询待出售的货物
export async function getSalePending(uid) {
  const body = {
    uid: uid,
    state: '1'
  }
  // console.log('body', body)
  const geturl = splitGETURL(locationCreate('findGoodsByUidAndState'), body)
  const res = await fetch(geturl)
    .then((response) => {
      if (!response.ok) {
        throw new Error('查询待出售货物失败!', { cause: 0 })
      }
      return response.json()
    })
    .then((result) => {
      // console.log(result)
      return result
    })
    .catch((error) => {
      console.error(error) // 错误消息
      // console.log(error.cause)
      return error.cause
    })
  // console.log(res)
  return res
}
//查询已完成的订单
export async function getCompeletOrder(uid) {
  const url = splitGETURL(locationCreate('findOrderByStart'), { uid: uid })
  const res = await fetch(url)
    .then((response) => {
      if (!response.ok) {
        return new Error('查询已完成订单失败!', { cause: 0 })
      }
      return response.json()
    })
    .then((result) => {
      // console.log(result)
      return result
    })
    .catch((error) => {
      console.error(error) // 错误消息
      return error.cause
    })
  return res
}
//查询未完成订单
export async function getUnfiledOrder(uid) {
  const url = splitGETURL(locationCreate('getUnfiledOrder'), { uid: uid })
  const res = await fetch(url)
    .then((response) => {
      if (!response.ok) {
        return new Error('查询未完成订单失败!', { cause: 0 })
      }
      return response.json()
    })
    .then((result) => {
      // console.log(result)
      return result
    })
    .catch((error) => {
      console.error(error) // 错误消息
      return error.cause
    })
  return res
}

//加入购物车
export async function pushCart(goods, mid, router, toId) {
  const { gDescribe, gImages, gName, gPrice, gState, gType, gid } = goods
  const goodsDetail = { mid, gid, gName, gImages, gPrice, gDescribe, gState, gType }
  // console.log()
  await fetch(locationCreate('pushCart'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(goodsDetail)
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('添加订单失败!', { cause: 0, state: response.status })
      }
      // console.log("toId: ", toId)
      chatSeller(mid, toId, router, gid)
      return response.json()
    })
    .then((data) => {
      // console.log(data.message)
      return data
    })
    .catch(() => {
      router.push({name: 'shoppingCart'})
      return 0
    })
}
// 获取用户（卖家）详细信息
export async function getUserDetail(uid) {
  const res = await fetch(locationCreate('findUserDetail'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ uid: uid })
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('查询用户信息失败!', { cause: 0 })
      }
      return response.json()
    })
    .then((data) => {
      // console.log(data.message)
      return data
    })
    .catch((error) => {
      console.error(error) // 错误消息
      return error.cause
    })

  return res
}

//发送一次消息，建立连接的同时提醒对方
async function chatSeller(formId, toId, router, gid) {
  console.log('formId', formId)
  console.log('toId', toId)
  const createTime = Date.now()
  const res = await getUserDetail(toId)
  console.log('res: ', res.result[0])
  const toUser = res.result[0]
  const valueMessage = {
    formId: formId,
    formName: localStorage.getItem('name'),
    formIcon: localStorage.getItem('icon'),

    toId: toUser.uid,
    toName: toUser.name,
    toIcon: toUser.image,

    message: '我想和你交流一下',
    createTime: createTime,
    gid: gid
  }
  console.log("valueMessage: ", valueMessage)
  await pushMessage(valueMessage)
  router.push({ name: 'shoppingCart' })
}
