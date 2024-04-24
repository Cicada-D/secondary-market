import { locationCreate, splitURL } from '@/lib/utils'

// 上传商品
export async function pushGoods(goods, router) {
  const uid = { uid: localStorage.getItem('uid') }

  const formdata = createForm(goods, uid)

  const res = await fetch(locationCreate(router), {
    method: 'POST',

    body: formdata
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('添加失败')
      }
      return response.json()
    })
    .then((data) => {
      console.log(data.message)
    })
    .catch((error) => {
      console.error(error.message) // 错误消息
    })
  console.log(res)
}
//转换成formdata格式
const createForm = (data, args) => {
  const formdata = new FormData()
  if (args) {
    data = { ...data, ...args }
  }
  // console.log(data)
  if (data.image) {
    for (const item of data.image) {
      formdata.append('image', item)
    }
  }
  for (const key in data) {
    formdata.append(key, data[key])
  }
  return formdata
}
//获取特定的商品详情
export async function getGoodsDetail(url, gid) {
  const getURL = splitURL(url, { gid: gid })
  console.log(getURL)
  const res = await fetch(getURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error('查询失败')
      }
      return response.json()
    })
    .then((data) => {
      return data.message
    })
    .catch((error) => {
      console.error(error.message) // 错误消息
    })

  console.log(res)
  return res
}
