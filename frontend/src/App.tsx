import { Button, Grid, Menu, MenuItem, Tab, Tabs, Typography } from '@mui/material'
import './app.css'
import { About } from './components/about/About'
import { Sitters } from './components/sitters/Sitters'
import { Center } from './components/center'
import { Chats } from './components/chats/Chats'
import { Contact } from './pages/Contact'
import { Login } from './components/login/login_page'
import { Setting } from './components/setting/setting_page'
import { Toasts } from './components/toasts'
import { commonTabGroupProps, commonTabProps, title_case } from './helpers/helpers'
import { store } from './store'
import logo from './logo.png'
import { TinderCards } from './components/TinderCards'
import { observer } from 'mobx-react-lite'
import { Signup } from './components/signup/signup_page'
import { action, autorun, toJS } from 'mobx'
import { ChatScreen } from './components/chats/ChatScreen'
import React, { useEffect, useState } from 'react'
import { save_to_local_storage, shared_store_prop } from './helpers/local_storage'
import { logout } from './helpers/login_helpers'

export const App = observer(() => {
    useEffect(() => {
        return autorun(() => {
            save_to_local_storage(shared_store_prop, store.shared)
        })
    }, [])
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
                {/* {store.shared.token.length > 0 && <Tab {...commonTabProps('Settings')} />} */}
                {store.shared.token.length > 0 && <Tab {...commonTabProps('Chat')} onClick={action(() => (store.chat.to_user = null))}/>}
                <Tab {...commonTabProps('Sitters')} />
            </Tabs>
            <div>
                {store.shared.tab === 'Login' && <Login />}

                {store.shared.tab === 'Signup' && <Signup />}
                {store.shared.tab === 'Settings' && <Setting />}
                {store.shared.tab === 'Chat' && (
                    <>{!!store.chat.to_user?.id ? <ChatScreen /> : <Chats />}</>
                )}
                {store.shared.tab === 'Sitters' && <Sitters />}
            </div>

            <Toasts />
            

            <div id="footer">
            <Tabs {...commonTabGroupProps(store, ['shared', 'tab'])}>
            <Tab {...commonTabProps('Home')} />
            <Tab {...commonTabProps('Contact')} />
            <Tab {...commonTabProps('About')} />
            </Tabs>
            </div>
            <div>
            {store.shared.tab === 'Home' && <TinderCards />}
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
                    <MenuItem
                     
                    >
                        <span    onClick={action(() => {
                            console.log('hi')
                            // @ts-ignore
                            store.shared.tab = 'Settings' 
                            setAnchorEl(null)
                        })} style={{ marginLeft: '10px' }}>Settings</span>
                    </MenuItem>
                    <MenuItem onClick={e => logout()}>
                        <span style={{ marginLeft: '10px' }}>Logout</span>
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
