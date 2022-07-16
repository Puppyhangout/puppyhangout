import Chat from "./Chat";
import React from 'react';
import { observer } from "mobx-react-lite"
import './Chat.css'



export const Chats = observer(() => {
    return <>
    <div className="chats">
    <Chat 
    name = "Sarah"
    message="Hey! how are you?"
    timestamp="35 minutes ago"
    profilePic="https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg"/>
    {/* <Chat 
    name = "Ellen"
    message="Hey! how are you?"
    timestamp="35 minutes ago"
    profilePic="https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322868_1100-800x825.jpg"/> */}
    </div>
    
    </>
})

