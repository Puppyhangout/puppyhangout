import { runInAction } from 'mobx'
import { store } from '../store'
import { orma_mutate, orma_query } from './api_helpers'
import { wrap_loading } from './is_loading'

export const get_users_by_id_query = (user_ids: any[]) => {
    return {
        users: {
            first_name: true,
            last_name: true,
            user_info: {
                photo_url: true
            },
            $where: {
                $in: ['id', user_ids.map(el => ({ $escape: el }))]
            }
        }
    }
}

export const fetch_messages = wrap_loading(async () => {
    const from_user_id = store.shared.user?.id
    const { messages } = await orma_query({
        messages: {
            id: true,
            message: true,
            from_user_id: true,
            to_user_id: true,
            from_user: {
                $from: 'users',
                $foreign_key: ['from_user_id'],
                id: true,
                email: true,
                user_info: {
                    photo_url: true
                }
            },
            users: {
                $from: 'users',
                $foreign_key: ['to_user_id'],
                id: true,
                email: true,
                user_info: {
                    photo_url: true
                }
            },
            $where: {
                $or: [
                    { $eq: ['from_user_id', { $escape: from_user_id }] },
                    { $eq: ['to_user_id', { $escape: from_user_id }] }
                ]
            }
        }
    })
    runInAction(() => {
        console.log(messages)
        store.chat.messages = messages
    })
})


export const fetch_unread_message_count = wrap_loading(async () => {
    const to_user_id = store.shared.user?.id
    const { unread_messages } = await orma_query({
        messages: {
            id: true,
            from_user_id: true,
            created_at: true,
            $where: {
                $or: [
                    { $eq: ['to_user_id', { $escape: to_user_id }] },
                    //{ $gt: ['created_at', {$escape: store.chat.last_visited}]}
                ]
            }
        }
    })
   
    runInAction(() => {
        console.log(unread_messages)
        store.chat.unread_message_count = unread_messages?.length
    })
})

export const send_message = wrap_loading(async () => {
    const { messages } = await orma_mutate({
        $operation: 'create',
        messages: [
            {
                message: store.chat.pending_message,
                from_user_id: store.shared.user?.id,
                to_user_id: store.chat.to_user?.id
            }
        ]
    })
    runInAction(() => {
        store.chat.messages = messages
    })
})

export const fetch_users_im_talking_to = wrap_loading(async () => {
    const from_user_id = store.shared.user?.id

    const { messages } = await orma_query({
        messages: {
            from_user_id: true,
            to_user_id: true,
            $where: {
                $or: [
                    { $eq: ['from_user_id', { $escape: from_user_id }] },
                    { $eq: ['to_user_id', { $escape: from_user_id }] }
                ]
            },
            $group_by: ['from_user_id', 'to_user_id']
        }
    })

    const user_ids = messages.flatMap((message: any) => {
        return [message.from_user_id, message.to_user_id]
    })

    const user_ids_im_talking_to = [...new Set(user_ids)].filter(el => el !== from_user_id)

    const { users } = await orma_query(get_users_by_id_query(user_ids_im_talking_to))

    runInAction(() => {
        store.chats.users = users
    })
})
