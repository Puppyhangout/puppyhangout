import { AlertColor } from '@mui/material'
import { observable } from 'mobx'

export const store = observable({
    tab: 'Login' as 'Login' | 'Signup' | 'Settings' | 'Chat' | 'Contact' | 'About' | 'Home',
    toast: {
        toast_content: '',
        toast_severity: 'success' as AlertColor,
        toast_auto_hide_duration: 0,
        toast_is_open: false
    },
    shared: {
        token: ''
    },
    login: {
        email: '',
        password: '',
        user: null as any
    },
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
    chat: {
        to_user_id: null,
        messages: [] as any[],
        pending_message: ''
    }
})
