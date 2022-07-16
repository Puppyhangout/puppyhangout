// @ts-nocheck
import { useState } from 'react'
import TinderCard from 'react-tinder-card'
import './TinderCards.css'

// const q1 = (doc(database, "people","iIhylbtKRP4LA6SITVJo"));
function TinderCards() {
    const [people, setPeople] = useState([
        // {name: q1.name,
        // url: q1.url},
        //peope,setPeople
        {
            name: 'Lucky',
            url: 'https://upload.wikimedia.org/wikipedia/commons/9/94/My_dog.jpg'
        },
        {
            name: 'Dora',
            url: 'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg'
        }
    ])

    // useEffect is a piece of code that runs based on a condition
    // useEffect(() => {
    //     setPeople(
    //         name:database.collection('people').name
    //     )
    //     // database
    //     // .collection('people')
    //     // .onSnapshot(snapshot => (
    //     //     //send a new document everytime the database change
    //     //     //snapshot.docs give all three of those ..?
    //     //     //doc.data is name and url
    //     //     setPeople(snapshot.docs.map(doc=>doc.val()))
    //     // ))
    // },[]);

    return (
        <div>
            {people.map(person => (
                <TinderCard className='swipe' key={person.name} preventSwipe={['up', 'down']}>
                    <div style={{ backgroundImage: `url(${person.url})` }} className='card'>
                        <h3>{person.name}</h3>
                    </div>
                </TinderCard>
            ))}
        </div>
    )
}

export default TinderCards
