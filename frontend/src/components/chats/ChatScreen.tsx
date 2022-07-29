import { observer } from 'mobx-react-lite'

import { Avatar, Button, TextField } from '@mui/material'
import { action } from 'mobx'
import { useEffect } from 'react'
import { fetch_messages, send_message } from '../../helpers/chat_helpers'
import { store } from '../../store'
import './ChatScreen.css'

export const ChatScreen = observer(() => {
    useEffect(() => {
        fetch_messages()
    }, [])
    return (
        <>
            <div className='chatScreen'>
                <p>You matched with Ellen on </p>
                {store.chat.messages.map(message => (
                    <div className='chatScreen_message'>
                        <Avatar
                            className='chatScreen_image'
                            alt={message.message}
                            src={
                                message.from_user_id === store.login.user?.id
                                    ? store.login.user.user_info?.[0].photo_url
                                    : message.users?.[0]?.photo_url
                            }
                        />
                        <p className='chatScreen_text'>{message.message} </p>
                    </div>
                ))}
                <div className='chatScreen_input'>
                    <TextField
                        value={store.chat.pending_message}
                        onChange={action((e: any) => (store.chat.pending_message = e.target.value))}
                        placeholder='Type a message...'
                    />

                    <Button onClick={send_message} type='submit' className='chatScreen_inputButton'>
                        SEND
                    </Button>
                </div>
            </div>
        </>
    )
})
