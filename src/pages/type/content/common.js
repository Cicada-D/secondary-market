import { changeGoodsData, locationCreate, splitGETURL, throttle } from '@/lib/utils'
// 根据类型查询，一次查询num个
export async function getGoodsByType_10(gid, type, num) {
  console.log('gid', gid)
  const getURL = splitGETURL(locationCreate('getGoodsByType'), { gid: gid, type: type, num: num })
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
async function getMoreGoods(box, goods, baseGid, type) {
  // console.log(box)
  // console.log(box.value.getBoundingClientRect())
  // const top = parseInt(box.value.getBoundingClientRect().top)
  if (!box.value) return
  const height = parseInt(window.innerHeight)
  const bottom = parseInt(box.value.getBoundingClientRect().bottom)

  if (bottom < height) {
    const res = await getGoodsByType_10(baseGid.value, type, 12)
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

// 根据输入框查询
export async function getGoodsByTypeAndInput(type, value){
  // console.log(type, value)
  const getURL = splitGETURL(locationCreate('getGoodsByTypeAndInput'), { type: type, inputValue: value })
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

  return res
}
export const getMachGoods = throttle(getMoreGoods, 500)
