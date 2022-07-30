import { runInAction } from 'mobx'
import { clone } from 'ramda'
import { store } from '../store'
import { orma_query } from './api_helpers'
import { wrap_loading } from './is_loading'

export const refresh_settings = wrap_loading(async () => {
    const { users } = await orma_query({
        users: {
            id: true,
            email: true,
            first_name: true,
            last_name: true,
            phone: true,
            password: true,
            user_info: {
                id: true,
                photo_url: true
            },
            $limit: 1,
            $where: {
                $eq: [
                    'id',
                    {
                        $escape: store.shared.user?.id
                    }
                ]
            }
        }
    })

    if (users.length > 0) {
        runInAction(() => {
            store.settings.form.original = { users: users }
            store.settings.form.modified = { users: clone(users) }
        })
    }
})
