import { Tab, Tabs, Typography } from '@mui/material'
import './app.css'
import { About } from './components/about/About'
import { Center } from './components/center'
import { Chats } from './components/chats/Chats'
import { Contact } from './pages/Contact'
import { Login } from './components/login/login_page'
import { Setting } from './components/setting/setting_page'
import { Toasts } from './components/toasts'
import { commonTabGroupProps, commonTabProps } from './helpers/helpers'
import { store } from './store'
import { TinderCards } from './components/TinderCards'
import { observer } from 'mobx-react-lite'
import { Signup } from './components/signup/signup_page'
import { action, toJS } from 'mobx'
import { ChatScreen } from './components/chats/ChatScreen'

export const App = observer(() => {
    return (
        <Center>
            <Typography variant={'h4'}>Puppy Hangout</Typography>

            <Tabs {...commonTabGroupProps(store, ['tab'])}>
                {store.shared.token.length === 0 && <Tab {...commonTabProps('Signup')} />}
                {store.shared.token.length === 0 && <Tab {...commonTabProps('Login')} />}
                <Tab {...commonTabProps('Home')} />
                <Tab {...commonTabProps('Settings')} />
                <Tab
                    {...commonTabProps('Chat')}
                    onClick={action(() => (store.chat.to_user_id = null))}
                />
                <Tab {...commonTabProps('Contact')} />
                <Tab {...commonTabProps('About')} />
            </Tabs>
            <div>
                {store.tab === 'Login' && <Login />}
                {store.tab === 'Home' && <TinderCards />}
                {store.tab === 'Signup' && <Signup />}
                {store.tab === 'Settings' && <Setting />}
                {store.tab === 'Chat' && (
                    <>{!!store.chat.to_user_id ? <ChatScreen /> : <Chats />}</>
                )}
                {store.tab === 'Contact' && <Contact />}
                {store.tab === 'About' && <About />}
            </div>
            <Toasts />
        </Center>
    )
})

// @ts-ignore
window.store = store
// @ts-ignore
window.toJS = toJS
