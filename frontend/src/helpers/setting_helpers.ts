import { orma_mutate } from './api_helpers'
import { wrap_loading } from './is_loading'
import { store } from '../store'
import { show_toast } from './helpers'

export const setting = wrap_loading(async () => {
    const response = orma_mutate({
        $operation: 'update',
        users: store.signup.users
    })

    show_toast('success', 'Updating successful!')
    return response
})
