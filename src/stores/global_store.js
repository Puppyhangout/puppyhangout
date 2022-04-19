import { makeAutoObservable, toJS } from 'mobx';
import axios from 'axios';

class GlobalState { 
    api_url = window.location.host === 'localhost:3001' ? 'http://localhost:3004/' : 'https://puppychangout.com/'

    constructor() {
        makeAutoObservable(this)
    }


    post = async (url, body) => {
        await axios.post(this.api_url + url, body)
            .catch(err => {
                console.log(err)
            })
    }

}

export const global_store = new GlobalState()
window.global_store = global_store
window.toJS = toJS