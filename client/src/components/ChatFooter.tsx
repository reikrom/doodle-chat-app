import React, { useState } from 'react'
import { DefaultEventsMap } from '@socket.io/component-emitter'
import { Socket } from 'socket.io-client'

const ChatFooter = ({
    socket,
}: {
    socket: Socket<DefaultEventsMap, DefaultEventsMap>
}) => {
    const [message, setMessage] = useState('')
    const handleTyping = () =>
        socket.emit('typing', {
            socketID: socket.id,
            name: localStorage.getItem('userName'),
        })

    const handleSendMessage = (e: any) => {
        e.preventDefault()
        if (message.trim() && localStorage.getItem('userName')) {
            socket.emit('message', {
                text: message,
                name: localStorage.getItem('userName'),
                id: `${socket.id}${Math.random()}`,
                socketID: socket.id,
            })
        }
        setMessage('')
    }
    return (
        <div className=' w-full'>
            <form className='flex' onSubmit={handleSendMessage}>
                <input
                    type='text'
                    placeholder='Write message'
                    className='w-full h-12 p-4'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleTyping}
                />
                <button className='bg-green-900 py-4 px-8 hover:bg-green-700'>
                    SEND
                </button>
            </form>
        </div>
    )
}

export default ChatFooter
