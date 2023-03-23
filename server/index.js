const express = require('express')
const app = express()
const cors = require('cors')
const http = require('http').Server(app)
const PORT = 4000
const socketIO = require('socket.io')(http, {
    cors: {
        origin: 'http://localhost:3000',
    },
})

app.use(cors())
let users = []
const typingStatus = {}

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`)

    socket.on('message', (data) => {
        socketIO.emit('messageResponse', data)
    })

    socket.on('typing', ({ socketID, name }) => {
        if (typingStatus[socketID]) {
            clearTimeout(typingStatus[socketID])
        }

        typingStatus[socketID] = setTimeout(() => {
            socket.broadcast.emit('typingResponse', null)
            delete typingStatus[socketID]
        }, 1000)

        socket.broadcast.emit('typingResponse', `${name} is typing...`)
    })

    socket.on('newUser', (data) => {
        users.push(data)
        socketIO.emit('newUserResponse', users)
    })

    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected')
        users = users.filter((user) => user.socketID !== socket.id)
        socketIO.emit('newUserResponse', users)
        socket.disconnect()
    })
})

app.get('/api', (req, res) => {
    res.json({
        message: 'Hello world',
    })
})

http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})
