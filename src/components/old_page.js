import React from 'react';
import { Button } from "@material-ui/core"
import { action } from "mobx"
import { observer } from "mobx-react-lite"
import { login_store } from "./login/login_store"
import { Chats } from './chats/Chats'
import { signup_store } from "./signup/signup_store"

import { setting_store } from "./setting/setting_store"
import TinderCards  from './TinderCards';
//import { Link,useHistory } from "react-router-dom";
import { Link} from "react-router-dom";

export const OldPage = observer(() => {
    return <>
        <div className="header">
            <h1>Puppy Hangout</h1>
            <p>Do you need a dog sitter? Do you want to hang out with a dog in your neighbourhood? Sign up today!
            </p>

<Link to="/login">            
            <Button color='primary' variant='contained'
                    onClick={action(() => login_store.show_page = true)}>Login</Button>
</Link>


<Link to="/signup">
                <Button color='primary' variant='contained'
                    onClick={action(() => signup_store.show_page = true)}>Signup</Button>
</Link>
                <Button color='primary' variant='contained'
                    onClick={action(() => setting_store.show_page = true)}>Setting</Button>

<Link to="/chats">
            
                <Button color='primary' variant='contained'
                onClick={action(() => Chats.show_page = true)}>Messages</Button>
</Link>  

        </div>
            <div className="Column2" style={{ "backgroundColor": "ivory" }}>
                <div className="container">                   
                <TinderCards />
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