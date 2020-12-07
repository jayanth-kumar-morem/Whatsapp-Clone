import { Avatar, ListItemAvatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import "./SidebarChat.css"
import db from "./firebase"
import { Link } from 'react-router-dom'
function SidebarChat(props) {
    const [seed, setSeed] = useState("");
    const [messages,setMessages]= useState([]);
    useEffect(()=>{
        if(props.id){
            db.collection("rooms").doc(props.id).collection("messages").orderBy("timestamp","desc")
            .onSnapshot((snapshot)=> setMessages(snapshot.docs.map((doc)=>doc.data())))
        }
    })
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [props.id]);
    const createChat =() => {
        const roomName = prompt("Please enter room name");
        if(roomName){
            db.collection("rooms").add({
                name:roomName,
            })
        }
    }
    return !props.addNewChat ? (
        <Link to={`/rooms/${props.id}`}>
          <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
            <div className="info">
              <h2>{props.name}</h2>
    <p>{messages[0]?.message}</p>
            </div>
          </div>
        </Link>
      ) : (
        <div onClick={createChat} className="sidebarChat">
          <h2 className="addnewchat"> Add New Chat</h2>
        </div>
        
      );
    };


export default SidebarChat
