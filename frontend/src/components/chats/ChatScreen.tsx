import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'

import './ChatScreen.css'
import { Avatar } from '@mui/material'

export const ChatScreen = observer(() => {
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([
        {
            name: 'Ellen',
            image: 'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg',
            message: 'Whats up'
        },
        {
            name: 'Ellen',
            image: 'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg',
            message: 'Hows it going?'
        },
        {
            message: 'Hey Ellen'
        }
    ])

    const handleSend = e => {
        e.preventDefaut()
        setMessages([...messages, { message: input }])
        setInput('')
    }

    return (
        <>
            <div className='chatScreen'>
                <p>You matched with Ellen on </p>
                {messages.map(message => (
                    <div className='chatScreen_message'>
                        <Avatar
                            className='chatScreen_image'
                            alt={message.name}
                            src={messages.image}
                        />
                        <p className='chatScreen_text'>{message.message} </p>
                    </div>
                ))}
                <div className='chatScreen_input'>
                    <form>
                        <input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            className='chatScreen_inputField'
                            placeholder='type a message'
                            type='text'
                        />
                        <button
                            onClick={handleSend}
                            type='submit'
                            className='chatScreen_inputButton'
                        >
                            SEND
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
})
