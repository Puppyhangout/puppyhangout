import { Badge } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { fetch_unread_message_count } from '../../helpers/chat_helpers'
import { store } from '../../store'
import './Chat.css'

export const ChatNotificationCounter = observer(() => {
    useEffect(() => {
        const notificationCheckInterval = setInterval(fetch_unread_message_count, 1000);
        return () => {
            clearInterval(notificationCheckInterval);
        }
    }, [])
    return (
        <Badge badgeContent={store.chat.unread_message_count} color="primary">Chat&nbsp;&nbsp;&nbsp;</Badge>
    )
})
