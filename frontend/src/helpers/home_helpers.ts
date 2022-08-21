import { runInAction } from 'mobx'
import { store } from '../store'
import { orma_query } from './api_helpers'
import { wrap_loading } from './is_loading'

export const fetch_puppies = wrap_loading(async () => {
    const { puppies } = await orma_query({
        puppies: {
            id: true,
            name: true,
            breed: true,
            photos: {
                url: true
            },
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
        store.home.puppies = puppies
    })
})
