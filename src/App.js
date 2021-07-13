//import { observer } from 'mobx-react-lite';
import React from 'react';
import './app.css';
import { Login } from './components/login/login_page'
//import { login_store } from './components/login/login_store';

import { Signup } from './components/signup/signup_page'
import { Chats } from './components/chats/Chats'
import { Setting } from './components/setting/setting_page'
import { ChatScreen } from "./components/chats/ChatScreen";
import {Header} from "./Header"
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
    <Header/>
      <Signup/>
    </Route>
    
    <Route exact path="/login">
    <Header/>
      <Login/>
    </Route>

    <Route path="/chat/:person"> 
    <Header/>
      <ChatScreen/>
    </Route>

    <Route exact path="/chats">
    <Header/>
      <Chats/>
    </Route>

    <Route exact path="/setting">
      <Header/>
      <Setting/>
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