import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import TinderCard from 'react-tinder-card'
import { fetch_puppies } from '../helpers/home_helpers'
import { store } from '../store'
import { blank_photo } from './signup/signup_page'
import './TinderCards.css'

export const TinderCards = observer(() => {
    useEffect(() => {
        fetch_puppies()
    }, [])

    return (
        <div>
            {store.puppies_list.puppies.map((pup: any) => (
                // @ts-ignore
                <TinderCard
                    onSwipe={direction => {
                        if (['up', 'right'].includes(direction)) {
                            store.chat.to_user = pup.users[0]
                            store.shared.tab = 'Chat'
                        }
                    }}
                    className='swipe'
                    key={pup.id}
                    preventSwipe={['up', 'down']}
                >
                    <div
                        style=
                        {{
                            backgroundImage: `url(${pup.photos[0].url || blank_photo})`                        
                        }}
                
                        className='card'
                    >
                        <h3>{pup.name},  {Math.round(pup._dist)} km </h3>
                    </div>
                </TinderCard>
            ))}
        </div>
    )
})
