//import { observer } from 'mobx-react-lite';
import React, { useContext } from "react";
import './app.css';
import { Login } from './components/login/login_page'
import { SignUp } from './components/signup/SignUp.js'
import { Chats } from './components/chats/Chats'
import { Setting } from './components/setting/setting_page'
import { ChatScreen } from "./components/chats/ChatScreen";
import { Contact } from "./components/contact/Contact";
import { About } from "./components/about/About";
import TinderCards  from './components/TinderCards';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { Header, Footer } from "./Header"
import Dashboard from "./components/Dashboard";
// import { Link } from "react-router-dom";
// import { AuthProvider } from "./components/Auth";
// import Home from "./components/Home";
function App() {
  // const { currentUser } = useContext(AuthContext);
return (
<div className="App">
  <Router>
  <Switch> 
    <Route exact path="/signup">
    <Header/>
    <SignUp/>    
    <Footer/>
    </Route>

    <Route exact path="/dashboard">
    <Header/>
    <Dashboard/>    
    <Footer/>
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
    {/* <Route exact path="/" component={Home} /> */}

    <Route exact path="/contact">
    <Header/><Contact/><Footer/>
    </Route>

    <Route exact path="/about">
    <Header/><About/><Footer/>
    </Route>

  </Switch>
  </Router>
</div>
);
}
export default App;



