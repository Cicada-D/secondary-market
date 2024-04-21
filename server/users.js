const users = [{ username: '15270089213', password: '123456' }]

export function register(username, password) {
  const existingUser = users.find((user) => user.username === username)
  if (existingUser) {
    return { status: 400, message: '该用户名已被注册' }
  }

  const newUser = { username, password }
  users.push(newUser)
  return { status: 201, message: '注册成功' }
}

export function login(username, password) {
  const user = users.find((user) => user.username === username && user.password === password)
  if (!user) {
    return { status: 401, message: '用户名或密码错误' }
  }

  return { status: 200, message: '登录成功' }
}
