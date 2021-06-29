import React, {useState} from 'react'
import TinderCard from "react-tinder-card";
import './TinderCards.css';


function TinderCards() {
    const [people,setPeople]=useState([
        {
            name:'olya',
            url:'https://upload.wikimedia.org/wikipedia/commons/9/94/My_dog.jpg'  },
        {
            name:'asdf',
            url:'https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg'
        }
    ]);


    return (
        <div>
            
            {people.map(person=>(
            <TinderCard
            className="swipe"
            key={person.name}
                preventSwipe={["up","down"]}>

            <div style={{ backgroundImage:`url(${person.url})`}} className="card">
                <h3>{person.name}</h3>
            </div>
            </TinderCard>
            ))}

        </div>
    );
}

export default TinderCards;