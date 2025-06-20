import { get_base_url, orma_mutate } from './api_helpers'
import { wrap_loading } from './is_loading'
import axios from 'axios'
import { action, runInAction } from 'mobx'
import { store } from '../store'
import { show_toast } from './helpers'
import { fetch_unread_message_count } from './chat_helpers'

export const login = wrap_loading(async (email: string, password: string) => {
    try {

        const {
            data: { token, user }
        } = await axios.post(get_base_url(window.location.host) + '/login', {
            email,
            password
        })
        runInAction(() => {
            console.log("login",user.user_info[0])
            store.shared.token = token
            store.shared.user = user
            store.shared.max_match_dist = user.user_info[0].max_match_dist
            store.shared.tab = 'Home'
            store.chat.last_visited = user.user_info[0].lastcheckmsg
        })

        await orma_mutate({
            $operation: 'update',
            user_info: [{
                user_id: user.id,
                lastlogin: new Date()
            }]
        })

        localStorage.setItem('token', token)
        localStorage.setItem('email', email)

        show_toast('success', 'Login successful')
    } catch (error: any) {
        console.error(error.response.data)
        show_toast('error', JSON.stringify(error.response.data))
    }
})

export const logout = action(() => {
    store.shared.token = ''
    store.shared.user = null
    store.shared.tab = 'Login'
    store.shared.email = ''
    store.shared.password = ''
    store.shared.first_name = ''
    store.shared.max_match_dist = 9999
})
