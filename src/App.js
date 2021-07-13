//import { observer } from 'mobx-react-lite';
import React from 'react';
import './app.css';
import { Login } from './components/login/login_page'
//import { login_store } from './components/login/login_store';

import { Signup } from './components/signup/signup_page'
import { Chats } from './components/chats/Chats'
import { ChatScreen } from "./components/chats/ChatScreen";
//import { signup_store } from './components/signup/signup_store'

//import { Setting } from './components/setting/setting_page'
//import { setting_store } from './components/setting/setting_store';

import { OldPage } from './components/old_page';

import {BrowserRouter as Router, Switch, Route} from "react-router-dom";



function App() {

return (
<div className="App">
<Router>
  <Switch> 
    <Route exact path="/signup">
      <Signup/>
    </Route>
    
    <Route exact path="/login">
      <Login/>
    </Route>

    <Route path="/chat/:person"> 
      <ChatScreen/>
    </Route>

    <Route exact path="/chats">
      <Chats/>
    </Route>

    <Route exact path="/">
      <OldPage/>
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