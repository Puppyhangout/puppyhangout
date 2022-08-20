import { AlertColor } from '@mui/material'
import { observable } from 'mobx'
import { load_from_local_storage, shared_store_prop } from './helpers/local_storage'

export const store = observable({
    toast: {
        toast_content: '',
        toast_severity: 'success' as AlertColor,
        toast_auto_hide_duration: 0,
        toast_is_open: false
    },
    shared: load_from_local_storage(shared_store_prop, {
        tab: 'Login' as 'Login' | 'Signup' | 'Settings' | 'Chat' | 'Contact' | 'About' | 'Sitters' |'Home',
        token: '',
        user: null as any,
        email: '',
        password: ''
    }),
    signup: {
        users: [
            {
                email: '',
                password: '',
                firstname:'',
                lastname:'',
                puppies: [
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
            }
        ]
    },
    home: {
        puppies: []
    },
    sitters_list: {
        user_info: []
    },
    chats: {
        users: [] as any[]
    },
    settings: {
        form: {
            original: {} as any,
            modified: {} as any
        }
    },
    chat: {
        to_user: null as any,
        messages: [] as any[],
        pending_message: ''
    }
})
