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
        password: ''
    },
    signup: {
        email: '',
        password: ''
    }
})
