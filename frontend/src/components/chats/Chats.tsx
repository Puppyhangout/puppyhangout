import { Avatar, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { action } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { fetch_messages, fetch_users_im_talking_to } from '../../helpers/chat_helpers'
import { store } from '../../store'
import './Chat.css'

export const Chats = observer(() => {
    useEffect(() => {
        fetch_users_im_talking_to()
    }, [])
    store.chat.last_visited = new Date()
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Profile Pic</TableCell>
                    <TableCell>Name</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {store.chats.users?.map(user => (
                    <TableRow
                        key={user.id}
                        onClick={action(() => {
                            store.chat.to_user = user
                        })}
                    >
                        <TableCell>
                            <Avatar src={user.user_info?.[0]?.photo_url}></Avatar>
                        </TableCell>
                        <TableCell>{user.first_name + ' ' + user.last_name}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
})
