import { makeAutoObservable, toJS } from 'mobx';
import axios from 'axios';

class GlobalState { 
    api_url = 'https://hatzoloh-backend.herokuapp.com/'

    constructor() {
        makeAutoObservable(this)
    }


    send_message = async (phone_number, message) => {
        await axios.post(this.api_url, { phone_number, message })
            .catch(err => {
                console.log(err)
            })
    }

}

export const global_store = new GlobalState()
window.global_store = global_store
window.toJS = toJS