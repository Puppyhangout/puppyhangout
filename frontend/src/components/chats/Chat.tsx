import React from 'react'
import './Chat.css'
import { Avatar } from '@mui/material'

function Chat({ name, message, profilePic, timestamp }: any) {
    return (
        <div className='chat'>
            <Avatar className='chat_image' alt={name} src={profilePic} />
            <div className='chat_details'>
                <h2>{name}</h2>
                <p>{message}</p>
            </div>
            <p className='chat_timestamp'>{timestamp}</p>
        </div>
    )
}

export default Chat
