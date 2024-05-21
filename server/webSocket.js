import { WebSocket, WebSocketServer } from 'ws'

const wss = new WebSocketServer({ port: 3001 })

wss.on('connection', (ws, req) => {
  console.log('New WebSocket connection')

  const urlParams = new URLSearchParams(req.url.split('?')[1])
  const username = urlParams.get('username')

  ws.username = username

  ws.on('message', (message) => {
    const msg = JSON.parse(message)
    console.log('前端传来的值:', msg)
    let count = 0

    //将发来的数据发布到接收方
    wss.clients.forEach((client) => {
      const username = client.username
      console.log('client: ', username)
      count++
      if (client.readyState === WebSocket.OPEN) {
        if (username == msg.toId) {
          console.log('alksdjklasdj')
          client.send(JSON.stringify(msg))
        }
      }
    })
    console.log('count: ', count)
  })

  ws.on('close', () => {
    console.log('WebSocket connection closed')
  })

  ws.on('error', (error) => {
    console.error('WebSocket error:', error)
  })
})

console.log('WebSocket server is listening on ws://localhost:3001')
