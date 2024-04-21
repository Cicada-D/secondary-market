
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
      localStorage.setItem('token', data.message.token)
      router.push({ name:'home'})
    })
    .catch((error) => {
      console.error(error.message) // 错误消息
    })

    // console.log(router)
    console.log(res)
}
//注册
export function Sign(user) {
  const { telephone } = user
  console.log(telephone)
}


function locationCreate(local){
    return 'http://localhost:3000/' + local
}
