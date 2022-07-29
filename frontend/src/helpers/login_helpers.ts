import { get_base_url } from './api_helpers'
import { wrap_loading } from './is_loading'
import axios from 'axios'
import { runInAction } from 'mobx'
import { store } from '../store'
import { show_toast } from './helpers'

export const login = wrap_loading(async (email: string, password: string) => {
    try {
        const {
            data: { token, user }
        } = await axios.post(get_base_url(window.location.host) + '/login', {
            email,
            password
        })
        runInAction(() => {
            store.shared.token = token
            store.login.user = user
            store.tab = 'Home'
        })

        localStorage.setItem('token', token)
        localStorage.setItem('email', email)

        show_toast('success', 'Login successful')
    } catch (error: any) {
        console.error(error.response.data)
        show_toast('error', JSON.stringify(error.response.data))
    }
})
