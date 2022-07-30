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
        tab: 'Login' as 'Login' | 'Signup' | 'Settings' | 'Chat' | 'Contact' | 'About' | 'Home',
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
        to_user_id: null,
        messages: [] as any[],
        pending_message: ''
    }
})
