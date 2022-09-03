import { runInAction } from 'mobx'
import { clone } from 'ramda'
import { store } from '../store'
import { orma_mutate, orma_query } from './api_helpers'
import { show_toast } from './helpers'
import { wrap_loading } from './is_loading'

export const setLocation = wrap_loading(async (args) => {
    const response = orma_mutate({
        $operation: 'update',
            user_info: [{
                user_id: store.shared.user?.id,
                lat: args.coords.latitude,
                lng: args.coords.longitude
            }]
        
    })

    show_toast('success', 'Success!')
    return response
})

function toRad(Value: number) {
    return Value * Math.PI / 180
}

export function calcCrow(lat1: number, lon1: number, lat2: number, lon2: number) {
    var R = 6371 // km
    var dLat = toRad(lat2 - lat1)
    var dLon = toRad(lon2 - lon1)
    var lat1 = toRad(lat1)
    var lat2 = toRad(lat2)

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    var d = R * c
    return d
}



// for everyone in database 
//     if everyone has location: 
//         dist = calcCrow(everyone.lat1, everyone.lon1, cur_user.lat1, cur_user.lon1)



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
                photo_url: true,
                user_description: true,
                user_description2: true,
                max_match_dist: true
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
            store.shared.max_match_dist = users.user_info.max_match_dist
        })
    }
})
