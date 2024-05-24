import { changeGoodsData, locationCreate, splitGETURL, debounce } from '@/lib/utils'

//进入首页展示多少个商品
export async function getGoods_10(gid, uid, num) {
  const getURL = splitGETURL(locationCreate('getGoodsTen'), { gid: gid, uid: uid, num: num })
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
    // eslint-disable-next-line no-unused-vars
    .catch((error) => {
      // console.error(error.status) // 错误消息
      return []
    })
  // console.log(res)
  return res
}

async function getMoreGoods(box, goods, baseGid, uid) {
  const bottom = parseInt(box.value.getBoundingClientRect().bottom)
  // const top = parseInt(box.value.getBoundingClientRect().top)
  const height = parseInt(window.innerHeight)

  if (bottom < height) {
    const res = await getGoods_10(baseGid.value, uid, 12)
    if (res.length == 0) {
      return 0
    }
    goods.value.push(...changeGoodsData(res))
    baseGid.value = goods.value[goods.value.length - 1].id
    console.log('goods', goods.value.length)
    console.log('base', baseGid.value)
    // console.log('true!!!!!!!!!!')
    return 1
  }
  return 2
}
export const getMachGoods = debounce(getMoreGoods, 500)
// 上传个人信息

export async function pushUserDetail(data, url) {
  const uid = { uid: localStorage.getItem('uid') }

  const formdata = createForm(data, uid)
  console.log(formdata)
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
      console.log(data)
      localStorage.setItem('image', data.image)
      return 1
    })
    .catch((error) => {
      console.error(error.message) // 错误消息
    })
  return res
}

// 查询个人信息
export async function findUserDetail(uid, url) {

  const res = await fetch(locationCreate(url), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({uid: uid})
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('添加失败')
      }
      return response.json()
    })
    .then((data) => {
      console.log(data)
      return data.result[0]
    })
    .catch((error) => {
      console.error(error.message) // 错误消息
    })
  return res
}


const createForm = (data, args) => {
  const formdata = new FormData()
  if (args) {
    data = { ...data, ...args }
  }
  console.log(data)
  if (data.image) {
    formdata.append('image', data.image)
  }
  for (const key in data) {
    formdata.append(key, data[key])
  }
  
  return formdata
}
