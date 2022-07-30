import { Button } from '@mui/material'
import { action } from 'mobx'
import { observer } from 'mobx-react-lite'
import './Header.css'
// @ts-ignore
import logo from '../assets/logo.png'
import { store } from '../store'

export const Header = observer(() => {
    return (
        <>
            <div className='header'>
                <h1>
                    <img
                        style={{ marginBottom: '0px' }}
                        width={30}
                        src={logo}
                        alt='Logo'
                        // onClick={action(() => (TinderCards.show_page = true))}
                    ></img>
                    Puppy Hangout
                </h1>
                <p>
                    Do you need a dog sitter? Do you want to hang out with a dog in your
                    neighbourhood? Sign up today!
                </p>
                <Button
                    color='primary'
                    variant='contained'
                    onClick={action(() => (store.shared.tab = 'Login'))}
                >
                    Login
                </Button>

                <Button
                    color='primary'
                    variant='contained'
                    onClick={action(() => (store.shared.tab = 'Signup'))}
                >
                    Signup
                </Button>

                <Button
                    color='primary'
                    variant='contained'
                    onClick={action(() => (store.shared.tab = 'Settings'))}
                >
                    Setting
                </Button>

                <Button
                    color='primary'
                    variant='contained'
                    onClick={action(() => (store.shared.tab = 'Chat'))}
                >
                    Chat
                </Button>
            </div>
        </>
    )
})

export const Footer = observer(() => {
    return (
        <>
            <div className='footer'>
                <p>Copyright Olivia website, Inc. All Rights Researved.</p>
                <Button color='secondary' onClick={action(() => (store.shared.tab = 'Home'))}>
                    Home
                </Button>

                <Button color='secondary' onClick={action(() => (store.shared.tab = 'Contact'))}>
                    Contact
                </Button>

                <Button color='secondary' onClick={action(() => (store.shared.tab = 'About'))}>
                    About
                </Button>
            </div>
        </>
    )
})
