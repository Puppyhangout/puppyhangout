import { Badge } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { fetch_unread_message_count } from '../../helpers/chat_helpers'
import { store } from '../../store'
import './Chat.css'

export const ChatNotificationCounter = observer(() => {
    const fetchUnread = () => {
        console.log("Last visited " + store.chat.last_visited)
        fetch_unread_message_count();
    }
    useEffect(() => {
        const notificationCheckInterval = setInterval(fetchUnread, 1000);
        return () => {
            clearInterval(notificationCheckInterval);
        }
    }, [])
    return (
        <Badge badgeContent={store.chat.unread_message_count} color="primary">Chat&nbsp;&nbsp;&nbsp;</Badge>
    )
})
