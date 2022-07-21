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

    return (
        <div>
            {store.home.puppies.map((puppy: any) => (
                // @ts-ignore
                <TinderCard className='swipe' key={puppy.id} preventSwipe={['up', 'down']}>
                    <div
                        style={{ backgroundImage: `url(${puppy.photos[0].url})` }}
                        className='card'
                    >
                        <h3>{puppy.name}</h3>
                    </div>
                </TinderCard>
            ))}
        </div>
    )
})
