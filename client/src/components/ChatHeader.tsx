import React from 'react'

import { useNavigate } from 'react-router-dom'
import Logo from './Logo'
const ChatHeader = () => {
    const navigate = useNavigate()
    const handleLeaveChat = () => {
        localStorage.removeItem('userName')
        navigate('/')
        window.location.reload()
    }
    return (
        <header className='w-full flex justify-between p-4'>
            <p className='text-4xl font-bold'>
                <Logo stroke='#717171' />
                Doodle Chat
            </p>
            <button
                className='bg-red-500 font-bold hover:bg-red-700'
                onClick={handleLeaveChat}
            >
                LEAVE CHAT
            </button>
        </header>
    )
}

export default ChatHeader
