import React from 'react'
import ChatLeft from './ChatLeftBar'
import ChatBody from './ChatBody'
import ChatFooter from './ChatFooter'
import { Socket } from 'socket.io-client'
import { DefaultEventsMap } from '@socket.io/component-emitter'
import ChatHeader from './ChatHeader'

interface Props {
    text: string
    name: string
    id: string
    socketID: string
}

const ChatPage = ({
    socket,
}: {
    socket: Socket<DefaultEventsMap, DefaultEventsMap>
}) => {
    const [messages, setMessages] = React.useState<Props[]>([])
    const [isTyping, setIsTyping] = React.useState<null | string>(null)

    React.useEffect(() => {
        socket.on('messageResponse', (data: Props) =>
            setMessages([...messages, data])
        )

        socket.on('typingResponse', (data: string | null) => {
            setIsTyping(data)
        })
    }, [socket, messages])

    return (
        <div
            className='grid grid-cols-12 grid-rows-3 h-screen'
            style={{ gridTemplateRows: '1fr 12fr 1fr' }}
        >
            <div className='col-span-12 mb-2'>
                <ChatHeader />
            </div>
            <div className='col-span-3 col-start-1 h-full box mr-2'>
                <ChatLeft socket={socket} />
            </div>
            <div className='col-span-9 h-full overflow-y-scroll box p-1 mb-10 ml-2'>
                <ChatBody messages={messages} />
            </div>
            <div className='col-span-9 col-start-4 relative border '>
                <div className='message__status absolute -top-4 font-bold'>
                    {isTyping && <p>{isTyping}</p>}
                </div>
                <ChatFooter socket={socket} />
            </div>
        </div>
    )
}

export default ChatPage
