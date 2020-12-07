import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticon, MoreVert, SettingsInputAntenna } from '@material-ui/icons';
import SearchIcon from '@material-ui/icons/Search';
import React, { useEffect, useState } from 'react'
import axios from "./axios"
import "./Chat.css"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import db from './firebase';
import firebase from "firebase";
import { useStateValue } from './StateProvider';
import MicIcon from '@material-ui/icons/Mic';
function Chat() {
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const {roomId} =useParams("");
    const [roomName, setRoomName] = useState("");
    const [messages , setMessages] = useState([]);
    const [{user},dispatch] = useStateValue();
    useEffect(()=>{
        if(roomId){
            db.collection("rooms").doc(roomId).onSnapshot(snapshot => setRoomName(snapshot.data().name))
            db.collection("rooms")
            .doc(roomId)
            .collection("messages")
            .orderBy("timestamp",'asc')
            .onSnapshot((snapshot) =>
             setMessages(snapshot.docs.map((doc)=>doc.data())))
        }
    },[roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection("rooms").doc(roomId).collection("messages").add({
          message: input,
          name: user.displayName,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setInput("");
      };
    return (
        <div className='chat'>
            <div className="header">
            <Avatar className="avatar" src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
            <div className="header_info">
                <h3>{roomName}</h3>
    <p>Last seen at {new Date(messages[messages.length -1]?.timestamp?.toDate()).toUTCString()}</p>
            </div>
            <div className="right">
                <IconButton><SearchIcon /></IconButton>
                <IconButton><AttachFile /></IconButton>
                <IconButton><MoreVert /></IconButton>
            </div>
            </div>
            <div className="body">
                {
                    messages.map((message)=>(
                        <p className={`message ${message.name == user.displayName && "receive"} `}>
                    <span className="name">
                        {message.name}
                    </span>
                    {message.message}
                    <span className="timestamp">
                    {new Date(message.timestamp?.toDate()).toUTCString()}
                    </span>
                </p>
                    ))
                }
           </div>
           <div className="footer">
               
               <IconButton><InsertEmoticon /></IconButton>
               <form>
                   <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message" type="text" />
                    <button onClick={sendMessage}  type="submit">Send a message</button>
               </form>
               <IconButton><MicIcon /></IconButton>
           </div>
        </div>
    )
}

export default Chat
