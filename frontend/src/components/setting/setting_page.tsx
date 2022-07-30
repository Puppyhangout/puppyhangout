import { Button, TextField } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { store } from '../../store'
import { action, runInAction } from 'mobx'
import { is_loading } from '../../helpers/is_loading'
import { LoadingButton } from '../loading_button'
import './setting_page.css'

const toBase64 = (file: any) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
    })

export const Setting = observer(() => {
    return (
        <div className='setting-root'>
            <div className='setting-container'>
                <p>Welcome, {store.login.email}</p>
                <p>
                    <br /> Maximum distance:
                    <TextField
                        // onKeyPress={(e: any) => (e.key === 'Enter' ? setting_store.setting() : '')}
                        id='outlined-basic'
                        label='Unit: km'
                        variant='outlined'
                        // onChange={(e: any) => setting_store.set_distance(e.target.value)}
                    />
                </p>
                <p>
                    <br /> Available time:
                    <TextField
                        // onKeyPress={(e: any) => (e.key === 'Enter' ? setting_store.setting() : '')}
                        id='outlined-basic'
                        label=''
                        variant='outlined'
                        // onChange={(e: any) => setting_store.set_distance(e.target.value)}
                    />
                </p>
                <p>
                <br /> Modify profile pic:
                </p>
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
                    onClick={() => setting()}
                    loading={is_loading(setting, [])}
                >
                    Save
                </LoadingButton>
            </div>
        </div>
    )
})
