import { locationCreate } from "@/lib/utils"

//登录
export async function Login(user, router) {
  const { username, password } = user
  console.log(username, password)
    
  const res = await fetch(locationCreate('login'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('登录失败')
      }
      return response.json()
    })
    .then((data) => {
      console.log(data.message) // 登录成功消息
      console.log(data)
      localStorage.setItem('token', data.token)
      localStorage.setItem('uid', data.uid)
      localStorage.setItem('name', data.name)
      localStorage.setItem('icon', data.icon)
      router.push({ name:'home'})
      return 1
    })
    .catch(() => {
      // console.error(error.message) // 错误消息
      return 0
    })

    // console.log(router)
    return res
}
//注册
export async function Register(user, router) {
  const { username } = user
  console.log(username)
    
  const res = await fetch(locationCreate('register'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username })
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('登录失败')
      }
      return response.json()
    })
    .then((data) => {
      console.log(data.message) // 登录成功消息
      localStorage.setItem('token', data.token)
      localStorage.setItem('uid', data.uid)
      router.push({ name:'pushUserDetail'})
      return 1
    })
    .catch(() => {
      // console.error(error.message) // 错误消息
      return 0
    })

    // console.log(router)
    return res
}


