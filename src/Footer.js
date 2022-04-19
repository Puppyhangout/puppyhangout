import React from 'react';
import { Button } from "@material-ui/core"
import { action } from "mobx"
import { observer } from "mobx-react-lite"
import { About } from './components/about/About'
import { Link} from "react-router-dom";
import { Contact } from "./components/contact/Contact";
import TinderCards  from './components/TinderCards';
import './app.css';

export const Footer = observer(() => {
    return <>
        <div className="footer">
        <p>Copyright Olivia website, Inc. All Rights Researved.</p>
<Link to="/">
<Button color='secondary' variant='light'
onClick={action(() => TinderCards.show_page = true)}>Home</Button>
</Link>  

<Link to="/contact">
<Button color='secondary' variant='light'
onClick={action(() => Contact.show_page = true)}>Contact</Button>
</Link>


<Link to="/about">
<Button color='secondary' variant='light'
onClick={action(() => About.show_page = true)}>About</Button>
</Link>  
        </div>
    </>
})