import React from 'react'

interface Props {
    text: string
    name: string
    id: string
    socketID: string
}
const ChatBody = ({ messages }: { messages: Props[] }) => {
    return (
        <div className='message__container px-4 py-6'>
            {messages.map((message) =>
                message.name === localStorage.getItem('userName') ? (
                    <div className='message__chats' key={message.id}>
                        <p className='sender__name mt-2 mb-1'>You</p>
                        <div className='message__sender '>
                            <p className='bg-slate-200 inline py-1 px-2 rounded-xl'>
                                {message.text}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className='message__chats' key={message.id}>
                        <p>{message.name}</p>
                        <div className='message__recipient'>
                            <p>{message.text}</p>
                        </div>
                    </div>
                )
            )}
        </div>
    )
}

export default ChatBody
