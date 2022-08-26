import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import TinderCard from 'react-tinder-card'
import { fetch_sitters } from '../../helpers/sitters_helpers'
import { store } from '../../store'
import { blank_photo } from '../signup/signup_page'
import '../TinderCards.css'

export const Sitters = observer(() => {
    useEffect(() => {
        fetch_sitters()
    }, [])

    return (
        <div>
            {store.sitters_list.user_info.map((abc: any) => (
                // @ts-ignore
                <TinderCard
                    onSwipe={direction => {
                        if (['up', 'right'].includes(direction)) {
                            store.chat.to_user = abc.users[0]
                            store.shared.tab = 'Chat'
                        }
                    }}
                    className='swipe'
                    key={abc.id}
                    preventSwipe={['up', 'down']}
                >
                    <div
                        style={{ backgroundImage: `url(${abc.photo_url || blank_photo})` }}
                        className='card'
                    >
                        <h3>{abc.users[0].first_name},{abc.location}</h3>
                    </div>
                </TinderCard>
            ))}
        </div>
    )
})
