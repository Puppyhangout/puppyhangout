import { Button, TextField } from '@mui/material'
import { action } from 'mobx'
import { observer } from 'mobx-react-lite'
import { is_loading } from '../../helpers/is_loading'
import { signup } from '../../helpers/signup_helpers'
import { store } from '../../store'
import { LoadingButton } from '../loading_button'
import './signup_page.css'

const toBase64 = (file: any) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
    })

export const Signup = observer(() => {
    return (
        <div className='signup-root'>
            <div className='signup-container'>
                <TextField
                    autoComplete='new-password'
                    onKeyPress={e => (e.key === 'Enter' ? signup() : '')}
                    id='outlined-basic'
                    label='Email'
                    variant='outlined'
                    value={store.signup.email}
                    onChange={action((e: any) => (store.signup.email = e.target.value))}
                />
                <TextField
                    autoComplete='new-password'
                    onKeyPress={e => (e.key === 'Enter' ? signup() : '')}
                    id='outlined-basic'
                    label='Password'
                    variant='outlined'
                    type='Password'
                    value={store.signup.password}
                    onChange={action((e: any) => (store.signup.password = e.target.value))}
                />

                {/* <input
                    id='image_uploader'
                    accept='image/*'
                    // capture='camera'
                    // multiple
                    hidden
                    type='file'
                    // onChange={action(async e => {
                    //     const new_pictures = await Promise.all(
                    //         Array.from(e.target.files).map(file => toBase64(file))
                    //     )
                    //     console.log(new_pictures)
                    //     signup_store.set_picture(new_pictures[0])
                    // })}
                /> */}

                {/* <Button
                //  style={{ position: 'absolute', bottom: '5%', right: '10%' }}
                // onClick={() => document.getElementById('image_uploader').click()}
                >
                    <img
                        style={{ objectFit: 'contain', width: '100px', height: '100px' }}
                        src={signup_store.picture || ''}
                        alt='click to add'
                    />
                </Button> */}

                <LoadingButton
                    color='primary'
                    variant='outlined'
                    onClick={() => signup()}
                    loading={is_loading(signup, [])}
                >
                    Signup
                </LoadingButton>
            </div>
        </div>
    )
})
