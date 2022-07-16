// @ts-nocheck
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './app.css'
import { About } from './components/about/About'
import { Chats } from './components/chats/Chats'
import { ChatScreen } from './components/chats/ChatScreen'
import { Contact } from './components/contact/Contact'
import Dashboard from './components/Dashboard'
import { Login } from './components/login/login_page'
import { Setting } from './components/setting/setting_page'
import { SignUp } from './components/signup/SignUp.js'
import TinderCards from './components/TinderCards'
import { Footer, Header } from './Header'

function App() {
    // const { currentUser } = useContext(AuthContext);
    return (
        <div className='App'>
            <Router>
                <Switch>
                    <Route exact path='/signup'>
                        <Header />
                        <SignUp />
                        <Footer />
                    </Route>

                    <Route exact path='/dashboard'>
                        <Header />
                        <Dashboard />
                        <Footer />
                    </Route>

                    <Route exact path='/login'>
                        <Header />
                        <Login />
                        <Footer />
                    </Route>

                    <Route path='/chat/:person'>
                        <Header />
                        <ChatScreen />
                        <Footer />
                    </Route>

                    <Route exact path='/chats'>
                        <Header />
                        <Chats />
                        <Footer />
                    </Route>

                    <Route exact path='/setting'>
                        <Header />
                        <Setting />
                        <Footer />
                    </Route>

                    <Route exact path='/'>
                        <Header />
                        <TinderCards />
                        <Footer />
                    </Route>
                    {/* <Route exact path="/" component={Home} /> */}

                    <Route exact path='/contact'>
                        <Header />
                        <Contact />
                        <Footer />
                    </Route>

                    <Route exact path='/about'>
                        <Header />
                        <About />
                        <Footer />
                    </Route>
                </Switch>
            </Router>
        </div>
    )
}
export default App
