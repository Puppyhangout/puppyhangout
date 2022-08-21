import { Button, TextField } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { store } from '../../store'
import { action, runInAction } from 'mobx'
import { is_loading } from '../../helpers/is_loading'
import { LoadingButton } from '../loading_button'
import './setting_page.css'
import { save_form } from '../../helpers/form'
import { refresh_settings } from '../../helpers/setting_helpers'
import { toBase64 } from '../signup/signup_page'
import { useEffect, useState } from 'react'

export const Setting = observer(() => {

    const [user_location, setLocation] = useState<Geolocation | null>(null);
    console.log(user_location);
    useEffect(() => {
        refresh_settings()
    }, [])

    const user = store.settings.form.modified.users?.[0]
    return (
        <div className='setting-root'>
            <div className='setting-container'>
                <p>Welcome, {store.settings.form.original.users?.[0]?.email}</p>

                <TextField
                    label='First Name'
                    value={user?.first_name || ''}
                    onChange={action((e: any) => (user.first_name = e.target.value))}
                />

                <TextField
                    label='Last Name'
                    value={user?.last_name || ''}
                    onChange={action((e: any) => (user.last_name = e.target.value))}
                />
                <TextField
                    label='Email'
                    value={user?.email || ''}
                    onChange={action((e: any) => (user.email = e.target.value))}
                />
                <TextField
                    label='Phone'
                    value={user?.phone || ''}
                    onChange={action((e: any) => (user.phone = e.target.value))}
                />

                {/* <p>
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
                </p> */}

                <p>
                    <br /> Modify profile pic:
                </p>
                <Button onClick={() => document.getElementById('image_uploader')?.click()}>
                    <img
                        style={{ objectFit: 'contain', width: '100px', height: '100px' }}
                        src={
                            user?.user_info?.[0].photo_url ||
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
                            if (!user.user_info) {
                                user.user_info = [{}]
                            }

                            user.user_info[0].photo_url = new_pictures[0] as string
                        })
                    })}
                />

                <LoadingButton
                    color='primary'
                    variant='outlined'
                    onClick={() => save_form(store.settings.form, refresh_settings)}
                    loading={is_loading(save_form, [store.settings.form, refresh_settings])}
                >
                    Save
                </LoadingButton>



                

                <LoadingButton
                    color='primary'
                    variant='outlined'
                    onClick={() => navigator.geolocation.getCurrentPosition((args) => { setLocation(args) })}
                    loading={is_loading(save_form, [store.settings.form, refresh_settings])}
                >
                    Save location
                </LoadingButton>
                <p>
                {/* {user_location && user_location.cords.latitude} */}
                </p>
            </div>
        </div>
    )
})
