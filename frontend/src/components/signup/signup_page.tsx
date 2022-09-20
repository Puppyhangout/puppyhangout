import { Button, FormControl, InputLabel, MenuItem, Select, TextField, useForkRef, Checkbox } from '@mui/material'
import { action, runInAction } from 'mobx'
import { observer } from 'mobx-react-lite'
import { is_loading } from '../../helpers/is_loading'
import { signup } from '../../helpers/signup_helpers'
import { store } from '../../store'
import { LoadingButton } from '../loading_button'
import './signup_page.css'

export const blank_photo = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'


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
                    value={store.signup.has_puppy}
                    label="Do you have a dog?"
                    onChange={action(
                        (e: any) => {
                            if (e.target.value === 'true') {
                                // @ts-ignore
                                store.signup.users[0].puppies =  [
                                    {
                                        name: '',
                                        breed: '',
                                        size: '',
                                        photos: [
                                            {
                                                url: ''
                                            }
                                        ]
                                    }
                                ]
                            } else {
                                //@ts-ignore
                                delete store.signup.users[0].puppies
                            }
                            store.signup.has_puppy = e.target.value
                        }
                    )}
                >
                <MenuItem value={String(true)}>Yes</MenuItem>
                <MenuItem value={String(false)}>No</MenuItem>
                </Select>
                </FormControl>                

                <TextField
                    onKeyPress={e => (e.key === 'Enter' ? signup() : '')}
                    id='outlined-basic'
                    label='Email'
                    variant='outlined'
                    value={store.signup.users[0].email}
                    onChange={action((e: any) => (store.signup.users[0].email = e.target.value))}
                />

                <TextField
                    onKeyPress={e => (e.key === 'Enter' ? signup() : '')}
                    id='outlined-basic'
                    label='First Name'
                    variant='outlined'
                    value={store.signup.users[0].first_name}
                    onChange={action((e: any) => (store.signup.users[0].first_name = e.target.value))}
                />

                <TextField
                    onKeyPress={e => (e.key === 'Enter' ? signup() : '')}
                    id='outlined-basic'
                    label='Last Name'
                    variant='outlined'
                    value={store.signup.users[0].last_name}
                    onChange={action((e: any) => (store.signup.users[0].last_name = e.target.value))}
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

                <TextField
                    onKeyPress={e => (e.key === 'Enter' ? signup() : '')}
                    id='outlined-multiline-static'
                    label='User Description'
                    variant='outlined'
                    type="textarea" 
                    multiline
                    rows={5}
                    defaultValue="                           Have you had pets? What's your sitting experience?"
                    value={store.signup.users[0]?.user_info[0]?.user_description}
                    onChange={action((e: any) => (store.signup.users[0].user_info[0].user_description = e.target.value))}
                />

                {String(store.signup.has_puppy) === 'true' && 
                <TextField
                    onKeyPress={e => (e.key === 'Enter' ? signup() : '')}
                    id='outlined-basic'
                    label='Puppy Name'
                    variant='outlined'
                    // @ts-ignore
                    value={store.signup.users[0].puppies[0].name}
                    onChange={action(
                        // @ts-ignore
                        (e: any) => (store.signup.users[0].puppies[0].name = e.target.value)
                    )}
                />      
                }

                
                
                {String(store.signup.has_puppy) === 'true' && 
                <TextField
                    onKeyPress={e => (e.key === 'Enter' ? signup() : '')}
                    id='outlined-basic'
                    label='Puppy Breed'
                    variant='outlined'
                     // @ts-ignore
                    value={store.signup.users[0].puppies[0].breed}
                    onChange={action(
                         // @ts-ignore
                        (e: any) => (store.signup.users[0].puppies[0].breed = e.target.value)
                    )}
                />
                    }

                {String(store.signup.has_puppy) === 'true' && 
                <TextField
                    onKeyPress={e => (e.key === 'Enter' ? signup() : '')}
                    id='outlined-basic'
                    label='Puppy Size'
                    variant='outlined'
                     // @ts-ignore
                    value={store.signup.users[0].puppies[0].size}
                    onChange={action(
                         // @ts-ignore
                        (e: any) => (store.signup.users[0].puppies[0].size = e.target.value)
                    )}
                />}

                <p>sitter's photo</p>
                <Button onClick={() => document.getElementById('image_uploader')?.click()}>
                    <img
                        style={{ objectFit: 'contain', width: '100px', height: '100px' }}
                        src={
                            store.signup.users[0]?.user_info[0]?.photo_url || blank_photo
                        }
                        alt='click to add'
                    />
                </Button>

                {String(store.signup.has_puppy) === 'true' && 
                <>
                <p>puppy's photo</p> 
                <Button onClick={() => document.getElementById('image_uploader2')?.click()}>
                    <img
                        style={{ objectFit: 'contain', width: '100px', height: '100px' }}
                        src={
                             // @ts-ignore
                            store.signup.users[0]?.puppies?.[0]?.photos?.[0]?.url || blank_photo
                        }
                        alt='click to add'
                    />
                </Button>
                </>
                }

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
                            store.signup.users[0].user_info[0].photo_url =
                                new_pictures[0] as string
                        })
                    })}
                />

                <input
                    id='image_uploader2'
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
                             // @ts-ignore
                            store.signup.users[0].puppies[0].photos[0].url =
                                new_pictures[0] as string
                        })
                    })}
                />


                <LoadingButton
                    color='primary'
                    variant='outlined'
                    onClick={() => navigator.geolocation.getCurrentPosition(
                        (args) => { signup(args) },
                        () => signup()
                        )}
                    loading={is_loading(signup, [])}
                >
                    Signup
                </LoadingButton>
            </div>
        </div>
    )
})
