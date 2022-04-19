//import { observer } from 'mobx-react-lite';
import React from 'react';
import './app.css';
import { Login } from './components/login/login_page'
import { Signup } from './components/signup/signup_page'
import { Chats } from './components/chats/Chats'
import { Setting } from './components/setting/setting_page'
import { ChatScreen } from "./components/chats/ChatScreen";
import { Header} from "./Header"
import { Footer} from "./Footer"
import { Contact } from "./components/contact/Contact";
import { About } from "./components/about/About";
import TinderCards  from './components/TinderCards';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";



function App() {

return (
<div className="App">
<Router>
  <Switch> 
    <Route exact path="/signup">
    <Header/><Signup/><Footer/>
    </Route>
    
    <Route exact path="/login">
    <Header/><Login/><Footer/>
    </Route>

    <Route path="/chat/:person"> 
    <Header/><ChatScreen/><Footer/>
    </Route>

    <Route exact path="/chats">
    <Header/><Chats/><Footer/>
    </Route>

    <Route exact path="/setting">
    <Header/><Setting/><Footer/>
    </Route>

    <Route exact path="/">
    <Header/><TinderCards /><Footer/>
    </Route>

    <Route exact path="/contact">
      <Header/>
      <Contact/>
      <Footer/>
    </Route>

    <Route exact path="/about">
      <Header/>
      <About/>
      <Footer/>
    </Route>

  </Switch>
</Router>






</div>
);
}
export default App;







/*
export const color_palette = {
  blue: '#007ad9',
  green: '#34a835'
}




const App = observer(() => {

  return (
    <>
    {login_store.show_page && <Login />}
    {signup_store.show_page && <Signup />}
    {setting_store.show_page && <Setting />}
    {message_store.show_page && <Message />}
    {!signup_store.show_page && !login_store.show_page && <OldPage />}
    </>
     //login_store.token  // || true

       //? <MainPage />
       //: <Login />

  )

})

export default App*/