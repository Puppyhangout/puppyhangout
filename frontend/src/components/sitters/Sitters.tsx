import { Box } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import TinderCard from 'react-tinder-card'
import { fetch_sitters } from '../../helpers/sitters_helpers'
import { store } from '../../store'
import { blank_photo } from '../signup/signup_page'
import './sitters_page.css'

export const Sitters = observer(() => {
    const [error, setError] = useState<any>(null)
    useEffect(() => {
        const a = async ()=>{
            try{
                await fetch_sitters()
            }
            catch(e){
                console.error(e)
                setError(e)
            } 
        }
        a()
    }, [])
    
    return (
        <div>
            {error && <Box>{error}</Box>}
            {!error && store.sitters_list.user_info.map((abc: any) => (
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
                        style={{ backgroundImage: `url(${abc.photo_url || blank_photo})`,}}
                        className = {'card'}
                    >
                    <h3>{abc.users?.[0]?.first_name}, {Math.round(abc._dist)} km
                    </h3>
                    <h4>
                    {abc?.user_description}
                    </h4>
                    </div>
                </TinderCard>
            ))}
        </div>
    )
})
