import { locationCreate, splitGETURL } from '@/lib/utils'
export function sortMessage(message) {
  // console.log('message', message)
  // 使用 sort 方法对数组进行排序
  message.sort((a, b) => {
    // 将 createTime 属性转换为数字进行比较
    return parseInt(a.createTime) - parseInt(b.createTime)
  })

  // 返回排序后的数组
  return message
}
//将消息发送到数据库中
export async function pushMessage(message) {
  const res = await fetch(locationCreate('pushMessage'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(message)
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('发送消息失败!', { cause: 0 })
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
//获取列表信息
export async function getToUser(uid) {
  const res = await fetch(locationCreate('getToUser'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ uid })
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('查找失败!', { cause: 0 })
      }
      return response.json()
    })
    .then((data) => {
      return data
    })
    .catch((error) => {
      console.error(error) // 错误消息
      return error.cause
    })

  // console.log(res)
  return res
}

//获取选取对象的所有聊天历史
export async function getToUserAllMessage(uid) {
  const res = await fetch(locationCreate('getToUserAllMessage'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ uid })
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('查找失败!', { cause: 0 })
      }
      return response.json()
    })
    .then((data) => {
      return data
    })
    .catch((error) => {
      console.error(error) // 错误消息
      return error.cause
    })
  return res
}

//获取聊天中的订单信息
export async function getGoodOrder(uid, gid){
  console.log(uid, gid)
  const getURL = splitGETURL(locationCreate('findShoppingCart'), { uid: uid })
  const res = await fetch(getURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error('查询失败')
      }
      return response.json()
    })
    .then((data) => {
      return data.data
    })
    .catch(() => {
      return []
    })
 
  return res
}

