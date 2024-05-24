import { locationCreate, splitGETURL } from '@/lib/utils'

// 上传商品
export async function pushGoods(goods, url) {
  const uid = { uid: localStorage.getItem('uid') }

  const formdata = createForm(goods, uid)
  for (let pair of formdata.entries()) {
    console.log(pair[0] + ', ' + pair[1])
  }
  const res = await fetch(locationCreate(url), {
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
  return res
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
  formdata.append('state', '1')
  return formdata
}
//获取特定的商品详情
export async function getGoodsDetail(gid) {
  const getURL = splitGETURL(locationCreate('findGoods'), { gid: gid })
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
      return []
    })

  console.log(res)
  return res
}

export async function changeGoodsDetail(id, good, url) {
  const gid = { gid: id }
  const formdata = createForm(good, gid)
  for (let pair of formdata.entries()) {
    console.log(pair[0] + ', ' + pair[1])
  }
  const res = await fetch(locationCreate(url), {
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
  return res
}
