import { locationCreate, splitGETURL } from '@/lib/utils'

export async function getGoodsByType_10(gid, type) {
  console.log('gid', gid)
  const getURL = splitGETURL(locationCreate('getGoodsByType'), { gid: gid, type: type })
  const res = await fetch(getURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error('查询失败', { cause: response.status })
      }
      return response.json()
    })
    .then((data) => {
      return data.message
    })
    .catch((error) => {
      console.error(error) // 错误消息
      return []
    })
  //   console.log(res)
  return res
}

//得到当前路由动态匹配的值
