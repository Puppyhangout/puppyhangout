import { Button, FormControl, InputLabel, MenuItem, Select, TextField, useForkRef } from '@mui/material'
import { action, runInAction } from 'mobx'
import { observer } from 'mobx-react-lite'
import { is_loading } from '../../helpers/is_loading'
import { signup } from '../../helpers/signup_helpers'
import { store } from '../../store'
import { LoadingButton } from '../loading_button'
import './signup_page.css'

export const toBase64 = (file: any) =>
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
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Do you have a dog?</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={store.signup.users[0].puppies[0].size}
                    label="Do you have a dog?"
                    onChange={action(
                        (e: any) => (store.signup.users[0].puppies[0].size = e.target.value)
                    )}
                >
                    <MenuItem value={'10'}>Yes</MenuItem>
                    <MenuItem value={'20'}>No</MenuItem>
                </Select>
                </FormControl>                

                <TextField
                    autoComplete='new-password'
                    onKeyPress={e => (e.key === 'Enter' ? signup() : '')}
                    id='outlined-basic'
                    label='Email'
                    variant='outlined'
                    value={store.signup.users[0].email}
                    onChange={action((e: any) => (store.signup.users[0].email = e.target.value))}
                />

                <TextField
                    autoComplete='new-password'
                    onKeyPress={e => (e.key === 'Enter' ? signup() : '')}
                    id='outlined-basic'
                    label='First Name'
                    variant='outlined'
                    value={store.signup.users[0].firstname}
                    onChange={action((e: any) => (store.signup.users[0].firstname = e.target.value))}
                />

                <TextField
                    autoComplete='new-password'
                    onKeyPress={e => (e.key === 'Enter' ? signup() : '')}
                    id='outlined-basic'
                    label='Last Name'
                    variant='outlined'
                    value={store.signup.users[0].lastname}
                    onChange={action((e: any) => (store.signup.users[0].lastname = e.target.value))}
                />

                <TextField
                    autoComplete='new-password'
                    onKeyPress={e => (e.key === 'Enter' ? signup() : '')}
                    id='outlined-basic'
                    label='Password'
                    variant='outlined'
                    type='Password'
                    value={store.signup.users[0].password}
                    onChange={action((e: any) => (store.signup.users[0].password = e.target.value))}
                />

                {store.signup.users[0].puppies[0].size =='10' && 
                <TextField
                    autoComplete='new-password'
                    onKeyPress={e => (e.key === 'Enter' ? signup() : '')}
                    id='outlined-basic'
                    label='Puppy Name'
                    variant='outlined'
                    value={store.signup.users[0].puppies[0].name}
                    onChange={action(
                        (e: any) => (store.signup.users[0].puppies[0].name = e.target.value)
                    )}
                />      
                }

                
                
                {store.signup.users[0].puppies[0].size =='10' && 
                <TextField
                    autoComplete='new-password'
                    onKeyPress={e => (e.key === 'Enter' ? signup() : '')}
                    id='outlined-basic'
                    label='Puppy Breed'
                    variant='outlined'
                    value={store.signup.users[0].puppies[0].breed}
                    onChange={action(
                        (e: any) => (store.signup.users[0].puppies[0].breed = e.target.value)
                    )}
                />
                    }

                {store.signup.users[0].puppies[0].size =='10' && 
                <TextField
                    autoComplete='new-password'
                    onKeyPress={e => (e.key === 'Enter' ? signup() : '')}
                    id='outlined-basic'
                    label='Puppy Size'
                    variant='outlined'
                    value={store.signup.users[0].puppies[0].size}
                    onChange={action(
                        (e: any) => (store.signup.users[0].puppies[0].size = e.target.value)
                    )}
                />}

                <Button onClick={() => document.getElementById('image_uploader')?.click()}>
                    <img
                        style={{ objectFit: 'contain', width: '100px', height: '100px' }}
                        src={
                            store.signup.users[0]?.puppies[0]?.photos[0].url ||
                            'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
                        }
                        alt='click to add'
                    />
                </Button>

                <input
                    id='image_uploader'
                    accept='image/*'
                    // capture='environment'
                    // multiple
                    hidden
                    type='file'
                    onChange={action(async (e: any) => {
                        const new_pictures = await Promise.all(
                            Array.from(e.target.files).map(file => toBase64(file))
                        )
                        console.log(new_pictures)
                        runInAction(() => {
                            store.signup.users[0].puppies[0].photos[0].url =
                                new_pictures[0] as string
                        })
                    })}
                />

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
