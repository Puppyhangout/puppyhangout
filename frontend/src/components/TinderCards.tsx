import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import TinderCard from 'react-tinder-card'
import { fetch_puppies } from '../helpers/home_helpers'
import { store } from '../store'
import './TinderCards.css'

export const TinderCards = observer(() => {
    useEffect(() => {
        fetch_puppies()
    }, [])
    console.log(store.home.puppies);
    return (
        <div>
            {store.home.puppies.slice(0,4).map((pup: any) => (
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
                        style={{ backgroundImage: `url(${pup.photos[0].url})` }}
                        className='card'
                    >
                        <h3>{pup.name}, {pup.breed}</h3>
                    </div>
                </TinderCard>
            ))}
        </div>
    )
})
