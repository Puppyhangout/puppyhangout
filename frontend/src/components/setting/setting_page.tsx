import { TextField } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { store } from '../../store'
import './setting_page.css'

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
                {/* <LoadingButton
                    color='primary'
                    variant='outlined'
                    onClick={() => setting_store.setting()}
                    loading={setting_store.get_loading(setting_store.setting)}
                >
                    Apply
                </LoadingButton> */}
            </div>
        </div>
    )
})
