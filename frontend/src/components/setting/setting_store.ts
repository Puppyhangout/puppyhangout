// @ts-nocheck
import { get_loader_for_class_instance, setup_async_loaders } from '../../helpers/async_loaders'
import { global_store } from '../../stores/global_store'
import { makeAutoObservable } from 'mobx'
class Setting {
    constructor() {
        setup_async_loaders(this)
        makeAutoObservable(this)
        const token = localStorage.getItem('token') || ''
        const username = localStorage.getItem('username') || 'username'
        if (token.slice(0, 2) === 'ey' && username) {
            this.token = token
            this.username = username
        }
    }
    get_loading = (class_function, ...args) =>
        get_loader_for_class_instance(this, class_function, ...args)

    show_page = false
    username = ''
    password = ''
    distance = ''
    token = ''

    set_username = str => (this.username = str)
    set_password = str => (this.password = str)
    set_distance = str => (this.distance = str)
    set_token = str => (this.token = str)

    setting = async () => {
        this.show_page = false
        try {
            const { data: setting_response } = await global_store.post('setting', {
                distance: this.distance,
                password: this.password
            })
            const token = 'this is a token'
            this.set_token(token)
            localStorage.setItem('token', token)
            localStorage.setItem('username', this.username)
            console.log(setting_response)
        } catch (error) {
            console.error(error.response.data)
        }
    }

    logout = () => {
        localStorage.clear()
        this.set_token('')
    }
}

export const setting_store = new Setting()
window.setting_store = setting_store
