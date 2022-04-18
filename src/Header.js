import React from 'react';
import { Button } from "@material-ui/core"
import { action } from "mobx"
import { observer } from "mobx-react-lite"
import { login_store } from "./components/login/login_store"
import { Chats } from './components/chats/Chats'
import { signup_store } from "./components/signup/signup_store"
import { setting_store } from "./components/setting/setting_store"
import TinderCards  from './components/TinderCards';
import logo from './logo.png';
import { Link} from "react-router-dom";

export const Header = observer(() => {
    return <>
        <div className="header">
            <h1>Puppy Hangout <img style={{ marginBottom: '0px' }} width={50} src={logo} alt="Logo"></img></h1>
            {/* <h1>Puppy Hangout</h1> */}
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

<Link to="/setting">
<Button color='primary' variant='contained'
onClick={action(() => setting_store.show_page = true)}>Setting</Button>
</Link>


<Link to="/chats">
<Button color='primary' variant='contained'
onClick={action(() => Chats.show_page = true)}>MSG</Button>
</Link>  

<Link to="/">
<Button color='primary' variant='contained'
onClick={action(() => TinderCards.show_page = true)}>Main</Button>
</Link>  

        </div>

    </>
})