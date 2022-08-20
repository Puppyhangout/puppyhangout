import { runInAction } from 'mobx'
import { store } from '../store'
import { orma_query } from './api_helpers'
import { wrap_loading } from './is_loading'

export const fetch_sitters = wrap_loading(async () => {
    const { user_info } = await orma_query({
        user_info: {
            id: true,
            location: true,
            photo_url: true,
            users: {
                first_name: true,
                last_name: true,
                user_info: {
                    photo_url: true
                }
            }
        }
    })
    runInAction(() => {
        store.sitters_list.user_info = user_info
    })
})
