import React, { useEffect, useState } from 'react'
import "./Sidebar.css"
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IconButton,Avatar } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from "./SidebarChat"
import db from "./firebase"
import { useStateValue } from './StateProvider';
function Sidebar() {
    const [{user},dispatch]=useStateValue();
    const [rooms, setRooms] = useState([]);
    const [seed, setSeed] = useState("");
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, []);
    useEffect(() => {
       const unsubscribe = db.collection("rooms").onSnapshot((snapshot) =>
          setRooms(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
        return () => {
          unsubscribe();
        };
      }, []);
    
    return (
        <div className="sidebar">
            <div className='header' >
            <Avatar src={user?.photoURL} />
                <div className="right">
                <IconButton >
                    <ChatIcon /> 
                    </IconButton>
                    <IconButton >
                    <DonutLargeIcon /> 
                    </IconButton>
                    <IconButton >
                    <MoreVertIcon /> 
                    </IconButton>
                </div>
            </div>
            <div className="search">
                <div className="searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or Start a New Chat"/>
                </div>
            </div>
            <div className="chats">
            <SidebarChat addNewChat={1} />
                {rooms.map(room =>(
                         <SidebarChat key={room.id} id={room.id} name={room.data.name} />
                ))}
            </div>
        </div>
    )
}

export default Sidebar
