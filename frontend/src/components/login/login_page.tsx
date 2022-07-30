import { TextField } from '@mui/material'
import { action } from 'mobx'
import { observer } from 'mobx-react-lite'
// @ts-ignore
import logo from '../../assets/logo.png'
import { is_loading } from '../../helpers/is_loading'
import { login } from '../../helpers/login_helpers'
import { store } from '../../store'
import { LoadingButton } from '../loading_button'
import './login_page.css'

export const Login = observer(() => {
    return (
        <div className='login-root'>
            <div className='login-container'>
                <img style={{ marginBottom: '15px' }} width={150} src={logo} alt='Logo'></img>
                <TextField
                    autoComplete='new-password'
                    onKeyPress={e =>
                        e.key === 'Enter' ? login(store.shared.email, store.shared.password) : ''
                    }
                    id='outlined-basic'
                    label='Email'
                    variant='outlined'
                    value={store.shared.email}
                    onChange={action((e: any) => (store.shared.email = e.target.value))}
                />
                <TextField
                    autoComplete='new-password'
                    onKeyPress={e =>
                        e.key === 'Enter' ? login(store.shared.email, store.shared.password) : ''
                    }
                    id='outlined-basic'
                    label='Password'
                    variant='outlined'
                    type='Password'
                    value={store.shared.password}
                    onChange={action((e: any) => (store.shared.password = e.target.value))}
                />
                <LoadingButton
                    color='primary'
                    variant='outlined'
                    onClick={() => login(store.shared.email, store.shared.password)}
                    loading={is_loading(login, [store.shared.email, store.shared.password])}
                >
                    Login
                </LoadingButton>
            </div>
        </div>
    )
})
