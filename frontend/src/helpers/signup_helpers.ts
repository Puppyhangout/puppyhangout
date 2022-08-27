import { orma_mutate } from './api_helpers'
import { wrap_loading } from './is_loading'
import { store } from '../store'
import { show_toast } from './helpers'



export const signup = wrap_loading(async (args?) => {

    if ( store.signup.users[0]?.user_info[0]?.photo_url.length === 0 ){
        show_toast('error', 'upload picture please!')
        return
    }

    if ( store.signup.users[0]?.email.length === 0 ){
        show_toast('error', 'upload email please!')
        return
    }
    
    if ( store.signup.users[0]?.first_name.length < 3 ){
        show_toast('error', 'First name not long enough')
        return
    }

    if ( store.signup.users[0]?.last_name.length < 2 ){
        show_toast('error', 'Last name not long enough')
        return
    }

    if ( store.signup.users[0]?.password.length < 6 ){
        show_toast('error', 'password not long enough')
        return
    }

     // @ts-ignore
    if ( String(store.signup.has_puppy) === 'true' &&  store.signup.users[0]?.puppies?.[0]?.photos?.[0]?.url?.length === 0 ){
        show_toast('error', 'upload puppy photo please!')
        return
    }
    
    if(typeof args !== 'undefined'){
        store.signup.users[0].user_info[0].lat = args.coords.latitude
        store.signup.users[0].user_info[0].lng = args.coords.longitude    
    }

    const response = orma_mutate({
        $operation: 'create',
        users: store.signup.users
    })


    show_toast('success', 'Signup successful!')
    return response
})



// export const signup_update_location = wrap_loading(async (args) => {

// })
