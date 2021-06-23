import { global_store } from '../../stores/global_store'
import axios from 'axios'
import { get_loader_for_class_instance, setup_async_loaders } from '../../helpers/async_loaders';
const { makeAutoObservable } = require("mobx");
class Login {
    constructor() {
        setup_async_loaders(this)
        makeAutoObservable(this)
        const token = localStorage.getItem('token') || ''
        const username = localStorage.getItem('username') || ''
        if (token.slice(0,2) === 'ey' && username) {
            this.token = token
            this.username = username
        }
    }
    get_loading = (class_function, ...args) => get_loader_for_class_instance(this, class_function, ...args)
    
    username = ''
    password = ''
    token = ''

    set_username = (str) => this.username = str
    set_password = (str) => this.password = str
    set_token = (str) => this.token = str

    login = async () => {
        try {
            // const { data: login_response } = await axios.get(global_store.api_url + 'login', { params: { username: this.username, password: this.password } })
            const token = 'this is a token'
            this.set_token(token)
            localStorage.setItem('token', token)
            localStorage.setItem('username', this.username)
            console.log(token)

        } catch (error) {
            console.error(error.response.data)
        }
    }

    logout = () => {
        localStorage.clear()
        this.set_token('')
    }

}

export const login_store = new Login()
window.login_store = login_store