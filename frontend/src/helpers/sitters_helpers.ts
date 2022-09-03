import { runInAction } from 'mobx'
import { store } from '../store'
import { orma_query } from './api_helpers'
import { wrap_loading } from './is_loading'
import { calcCrow } from './setting_helpers'

export const fetch_sitters = wrap_loading(async () => {
    const { user_info } = await orma_query({
        user_info: {
            id: true,
            lat: true,
            lng: true,
            photo_url: true,
            lastlogin: true,
            user_description: true,
            users: {
                first_name: true,
                last_name: true
            }
        }
    })

    const coords: any = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((args) => { resolve(args.coords) })

    })

    let user_info2 = user_info.map( (el: any) => {
        try {
            
            return {
                ...el,
                _dist: calcCrow(el.lat || 0, el.lng||0, coords.latitude, coords.longitude)
            }
        } catch (error) {
            return el
        }


    })
    
    let sorted = user_info2.sort((a: any,b: any) => {
        return new Date(a.lastlogin).getTime() - new Date(b.lastlogin).getTime()
    }).filter((el: any) => el._dist < store.shared.max_match_dist)
    // store.shared.max_match_dist)
    console.log("max match dist in sitters helper",store.shared.max_match_dist)


    runInAction(() => {
        store.sitters_list.user_info = sorted
    })
})
