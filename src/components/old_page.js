import { Button } from "@material-ui/core"
import { action } from "mobx"
import { observer } from "mobx-react-lite"
import { login_store } from "./login/login_store"
import { signup_store } from "./signup/signup_store"
import { message_store } from "./message/message_store"
import { setting_store } from "./setting/setting_store"

export const OldPage = observer(() => {
    return <>
        <div className="header">
            <h1>Puppy Hangout</h1>
            <p>Do you need a dog sitter? Do you want to hang out with a dog in your neighbourhood? Sign up today!
            </p>
        </div>

        <div className="row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
            <div className="Column1" style={{ backgroundColor: "lavenderblush" }}>

                <Button color='primary' variant='contained'
                    onClick={action(() => login_store.show_page = true)}>Login</Button>


                <Button color='primary' variant='contained'
                    onClick={action(() => signup_store.show_page = true)}>Signup</Button>

                <Button color='primary' variant='contained'
                    onClick={action(() => setting_store.show_page = true)}>Setting</Button>

                <Button color='primary' variant='contained'
                    onClick={action(() => message_store.show_page = true)}>Messages</Button>





            </div>
            <div className="Column2" style={{ "backgroundColor": "ivory" }}>
                <div className="container">
                    <img src="https://www.segerios.com/wp-content/uploads/2016/08/Innocent-Black-Labrador-Retriever-Dog-Image.jpg" alt="dog1" height="450" width="400" />

                    <div className="bottom-left">
                        <p>Luna</p>
                        <p>2km</p>
                        <p>Does anyone want to keep my dog this weekend? </p>
                    </div>
                </div>
                <i className="fas fa-angle-left"
                    style={{ position: 'relative', float: 'left', width: '8em', overflow: 'hidden', fontSize: '20px', color: '#2196F3' }}
                ></i>
                <i className="fas fa-heart"
                    style={{ position: 'relative', float: 'left', width: '8em', overflow: 'hidden', fontSize: '20px', color: '#2196F3' }}></i>
            </div>
        </div>

        <div className="footer">
            <p>Copyright Olivia website, Inc. All Rights Researved.</p>
            <ul>
                <li><a href="default.asp">Home</a></li>
                <li><a href="contact.asp">Contact</a></li>
                <li><a href="about.asp">About</a></li>
            </ul>
        </div>
    </>
})