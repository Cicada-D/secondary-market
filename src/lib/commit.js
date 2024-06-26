import { splitGETURL } from './utils'

export async function getGoods_10(gid, url) {
  const getURL = splitGETURL(url, { gid: gid })
  const res = await fetch(getURL).then((response)=>{
    if(!response.ok){
        throw new Error('查询失败')
    }
    return response.json()
  }).then((data) => {
    return data.message
  }).catch((error) => {
    console.error(error.message) // 错误消息
  })
  console.log(res)
  return res
}

//得到当前路由动态匹配的值
