import { Button, Menu, MenuItem, Tab, Tabs, Typography } from '@mui/material'
import axios from "axios"
import { action, autorun, toJS } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import './app.css'
import { About } from './components/about/About'
import { Center } from './components/center'
import { ChatNotificationCounter } from './components/chats/ChatNotificationCounter'
import { Chats } from './components/chats/Chats'
import { ChatScreen } from './components/chats/ChatScreen'
import { Guide } from './components/guide/Guide'
import { Login } from './components/login/login_page'
import { Setting } from './components/setting/setting_page'
import { Signup } from './components/signup/signup_page'
import { Sitters } from './components/sitters/Sitters'
import { TinderCards } from './components/TinderCards'
import { Toasts } from './components/toasts'
import { get_base_url } from './helpers/api_helpers'
import { commonTabGroupProps, commonTabProps } from './helpers/helpers'
import { save_to_local_storage, shared_store_prop } from './helpers/local_storage'
import { logout } from './helpers/login_helpers'
import logo from './logo.png'
import { Contact } from './pages/Contact'
import { store } from './store'

export const App = observer(() => {
    const verifyEmail = async (search: string) => {
        let searchArray:string[] = search.split("&jwtToken=");
        if (searchArray.length > 1) {
            const jwtToken : string = searchArray[1];
            const verifyEmailUrl : string = get_base_url(window.location.host) +`/api/verify_email/${searchArray[0]}`;
            try {
                const res = await axios.get(verifyEmailUrl, { headers: { authorization: jwtToken } });
                alert(res.data);
            } catch (err: any) {
                // if err.response.data is of type string, show it
                // otherwise, check if err.response.data.message exists. If it does, show it.
                // otherwise, show a generic error
                alert(err && err.response && typeof err.response.data === "string" ? err.response.data : err.response.data && err.response.data.message ? err.response.data.message : "A server-side error occurred. Please try again later.");
            }
        } 
    }

    
    useEffect(() => {
        const search: string = window.location.search;
        if (search && search.includes("?token=")) {
            // if url contains '?token=', we attempt to verify one's email on page load
            verifyEmail(search);
        }

        return autorun(() => {
            save_to_local_storage(shared_store_prop, store.shared)
        })
    }, [])
    console.log("Called App.tsx")

    return (
        <Center>
            <Typography variant={'h4'} align={'left'} fontFamily ={'Monospace'} >
            <img style={{ marginLeft: '5px', marginBottom: '-5px', marginRight: '15px'}} width={35} src={logo} alt='Logo'>
                
            </img>
            Puppy Hangout
            </Typography>

            
            <Tabs {...commonTabGroupProps(store, ['shared', 'tab'])}>
            <AppToolbar/>
                {store.shared.token.length === 0 && <Tab {...commonTabProps('Signup')} />}
                {store.shared.token.length === 0 && <Tab {...commonTabProps('Login')} />}
                {store.shared.token.length > 0 && <Tab {...commonTabProps('Settings')} />}
                {store.shared.token.length > 0 && 
                    <Tab 
                        value='Chat' 
                        label={<ChatNotificationCounter />}
                        onClick={action(() => (store.chat.to_user = null))}
                    />
                }
                <Tab {...commonTabProps('Puppies')} />
                <Tab {...commonTabProps('Sitters')} />
            </Tabs>
            <div>
                {store.shared.tab === 'Login' && <Login />}
                {store.shared.tab === 'Signup' && <Signup />}
                {store.shared.tab === 'Settings' && <Setting />}
                {store.shared.tab === 'Chat' && (
                    <>{!!store.chat.to_user?.id ? <ChatScreen /> : <Chats />}</>
                )}
                {store.shared.tab === 'Puppies' && <TinderCards />}
                {store.shared.tab === 'Sitters' && <Sitters />}
            </div>
            <Toasts />
            
            <div id="footer">
            <Tabs {...commonTabGroupProps(store, ['shared', 'tab'])}>
            <Tab {...commonTabProps('Guide')} />
            <Tab {...commonTabProps('Contact')} />
            <Tab {...commonTabProps('About')} />    
            </Tabs>
            </div>

            <div>
            {store.shared.tab === 'Guide' && <Guide />}
            {store.shared.tab === 'Contact' && <Contact />}
            {store.shared.tab === 'About' && <About />}
            </div>
        </Center>
    )
})

const AppToolbar = observer(() => {
    const [anchorEl, setAnchorEl] = useState(null)
    const path = [store.shared.tab]

    return (
        <>
            <div>
                <Button
                    aria-controls='simple-menu'
                    aria-haspopup='true'
                    // @ts-ignore
                    onClick={event => setAnchorEl(event.currentTarget)}
                >
                    {store.shared.user?.first_name}
                </Button>
                <Menu
                    id='simple-menu'
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                >
                    <MenuItem>
                        <span onClick={action(() =>  {
                            // @ts-ignore
                            store.shared.tab = 'Settings' 
                            setAnchorEl(null)
                        })} style={{ marginLeft: '5px' }}>Settings</span>
                    </MenuItem>
                    <MenuItem onClick={e => logout()}>
                        <span style={{ marginLeft: '5px' }}>Logout</span>
                    </MenuItem>
                </Menu>
            </div>
        </>
    )
})

// @ts-ignore
window.store = store
// @ts-ignore
window.toJS = toJS
