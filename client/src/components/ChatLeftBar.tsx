import { DefaultEventsMap } from '@socket.io/component-emitter'
import React from 'react'
import { Socket } from 'socket.io-client'

interface Props {
    socketID: string
    name: string
    id: string
}
const ChatLeftBar = ({
    socket,
}: {
    socket: Socket<DefaultEventsMap, Props>
}) => {
    const [users, setUsers] = React.useState<Props[]>([])
    React.useEffect(() => {
        socket.on('newUserResponse', (data) => {
            setUsers(data)
        })
    }, [socket, users])

    return (
        <div className='h-full w-full p-2'>
            <h4 className='border-b-2 border-gray-300 transform -rotate-1'>
                ACTIVE USERS
            </h4>
            <div className='chat__users'>
                {users.map((user) => (
                    <p key={user.socketID} className=''>
                        {user.name}
                    </p>
                ))}
            </div>
        </div>
    )
}

export default ChatLeftBar
