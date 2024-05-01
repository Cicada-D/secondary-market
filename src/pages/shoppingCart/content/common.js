import { splitGETURL,locationCreate } from "@/lib/utils"

export async function getShoppingCart(uid) {
    console.log('uid', uid)
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
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {
        // console.error(error.status) // 错误消息
        return []
      })
    // console.log(res)
    return res
  }