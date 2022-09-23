import { runInAction } from 'mobx'
import { forceCleanupTimerToRunNowForTests } from 'mobx-react-lite/dist/utils/reactionCleanupTracking'
import { store } from '../store'
import { orma_query } from './api_helpers'
import { wrap_loading } from './is_loading'
import { calcCrow } from './setting_helpers'

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
                    photo_url: true,
                    lat: true,
                    lng: true,
                    lastlogin: true
                }
            }
        }
    })
    console.log("pupp",puppies)
    const coords: any = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((args) => { 
            resolve(args.coords) },
            (e)=>console.error(e)
            )
    })
    console.log(coords)
    let user_info2 = puppies.map( (el: any) => {
        try {
            console.log("lat",el.users[0].user_info[0].lat)
            return {
                ...el,
                _dist: calcCrow(el.users[0].user_info[0].lat || 0, el.users[0].user_info[0].lng||0, coords.latitude, coords.longitude)
            }
        } catch (error) {
            return el
        }
    })


    let sorted = user_info2.sort((a: any,b: any) => {
        return new Date(a.users[0].user_info[0].lastlogin).getTime() - new Date(b.users[0].user_info[0].lastlogin).getTime()
    }).filter((el: any) => el._dist < store.shared.max_match_dist)
    


    console.log("Sorted",sorted)

    runInAction(() => {
        store.puppies_list.puppies = sorted
    })

    runInAction(() => {
        store.home.puppies = sorted
    })
})
