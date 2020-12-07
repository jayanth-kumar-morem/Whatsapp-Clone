import './App.css';
import Sidebar from "./Sidebar"
import Chat from "./Chat"
import { useEffect, useState } from 'react';
import Pusher from "pusher-js"
import axios from "./axios"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import Login from "./Login"
import { useStateValue } from './StateProvider';
function App() {
  const [{user}, dispatch] = useStateValue()
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    axios.get("/messages/sync")
    .then(response =>{
      setMessages(response.data);
    });
  }, [])


  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app_body">
 
        <Router>
        <Sidebar />
         <Switch>
          <Route path="/rooms/:roomId" >
              <Chat />
          </Route>
          </Switch>
        </Router>
        
      </div>
      )}
      
    </div>
  );
}

export default App;
