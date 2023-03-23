import { DefaultEventsMap } from '@socket.io/component-emitter'
import React, { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Socket } from 'socket.io-client'

const Home = ({
    socket,
}: {
    socket: Socket<DefaultEventsMap, DefaultEventsMap>
}) => {
    const navigate = useNavigate()
    const [userName, setUserName] = useState('')

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        localStorage.setItem('userName', userName)
        socket.emit('newUser', { name: userName, socketID: socket.id })
        navigate('/chat')
    }
    return (
        <div className='absolute left-1/2 top-1/2 transform -translate-x-1/2 h-[400px] -translate-y-1/2 flex flex-col justify-center'>
            <h2 className='text-2xl mb-10 font-bold'>Sign in to Doodle Chat</h2>
            <form className='' onSubmit={handleSubmit}>
                <label className='block' htmlFor='username'>
                    Username
                </label>
                <input
                    type='text'
                    minLength={5}
                    name='username'
                    id='username'
                    className='username__input'
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <button className='ml-4 bg-green-700 px-4'>SIGN IN</button>
            </form>
        </div>
    )
}

export default Home
