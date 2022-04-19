import { get_loader_for_class_instance, setup_async_loaders } from '../../helpers/async_loaders';
import { global_store } from '../../stores/global_store';
import { database, auth, onAuthStateChanged, createUserWithEmailAndPassword } from "../../firebase.js";
import { collection, doc, setDoc, getDoc, query } from "firebase/firestore"; 


const { makeAutoObservable } = require("mobx");
class signup {
    constructor() {
        setup_async_loaders(this)
        makeAutoObservable(this)
        const token = localStorage.getItem('token') || ''
        const username = localStorage.getItem('username') || ''
        const email = localStorage.getItem('toemailken') || ''
        const picture = localStorage.getItem('picture') || ''
        const password = localStorage.getItem('password') || ''
        if (token.slice(0,2) === 'ey' && username) {
            this.token = token
            this.username = username
            this.email=email
            this.picture=picture
            this.password=password
        }
    }
    get_loading = (class_function, ...args) => get_loader_for_class_instance(this, class_function, ...args)
    
    show_page = false
    username = ''
    password = ''
    picture = ''
    email=''

    set_username = (str) => this.username = str
    set_password = (str) => this.password = str
    set_picture = (str) => this.picture = str
    set_email = (str) => this.email = str

    signup = async () => {
        const citiesRef = collection(database, "people");

        await setDoc(doc(citiesRef, "SF"), {
        name: "San Francisco", url: "CA" });
        // try {
        //     const { data: signup_response } = await 
        //     global_store.post('signup', { 
        //         username: this.username, 
        //         password: this.password,
        //         picture: this.picture
        //     })
        //     localStorage.setItem('username', this.username)
        //     console.log(signup_response)
        //     window.alert(signup_response)

        // } catch (error) {
        //     console.error(error.response.data)
        // }
        // const auth = getAuth();
        createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
            // Signed in 
            localStorage.setItem('username', this.username)
            // window.alert(signup_response)
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
        
    }

    logout = () => {
        localStorage.clear()
        this.set_token('')
    }

}

export const signup_store = new signup()
window.signup_store = signup_store