import { get_loader_for_class_instance, setup_async_loaders } from '../../helpers/async_loaders';
import { global_store } from '../../stores/global_store';
const { makeAutoObservable } = require("mobx");
class signup {
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
    
    show_page = false
    username = ''
    password = ''
    picture = ''

    set_username = (str) => this.username = str
    set_password = (str) => this.password = str
    set_picture = (str) => this.picture = str

    signup = async () => {
        // this.show_page = false
        try {
            const { data: signup_response } = await global_store.post('signup', { 
                username: this.username, 
                password: this.password,
                picture: this.picture
            })
            localStorage.setItem('username', this.username)
            console.log(signup_response)

        } catch (error) {
            console.error(error.response.data)
        }
    }

    logout = () => {
        localStorage.clear()
        this.set_token('')
    }

}

export const signup_store = new signup()
window.signup_store = signup_store