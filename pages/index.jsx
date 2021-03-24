import styles from '../styles/Home.module.css'
import MessageBar from "../components/message-bar/message-bar";
import MessageView from "../components/message-view/message-view";
import UserList from "../components/user-list/user-list";
import socket from "../src/socket/socket";
import { useContext, useRef, useState } from 'react';

export default function Home() {
  const username = useRef(null)
  const [SessionReady, setSessionReady] = useState(false);

  const socketLogHandle = ()=>{
    // const socket1 = connect_auth('hola');
    if(username.current.value){
      socket.auth.username=username.current.value;
      socket.connect();
      setSessionReady(true);
    }else{
      alert('Escriba un nombre de usuario')
    } 
  }
  //---------------------------------
if (typeof window !== 'undefined') {
  const sessionID = localStorage.getItem("sessionID");
  if (sessionID) {
    if(SessionReady==false){
      setSessionReady(true)
    }
    socket.auth = { sessionID };
    socket.connect();
  }
}
socket.on("session", ({ sessionID, userID }) => {
  // attach the session ID to the next reconnection attempts
  socket.auth = { sessionID };
  // store it in the localStorage
  window.localStorage.setItem("sessionID", sessionID);
  // save the ID of the user
  socket.userID = userID;
});

socket.on("connect_error", (err) => {
  if (err.message === "invalid username") {
    localStorage.removeItem('sessionID')
    alert('error al conectarse')
  }
});
  
  return (
    <div>
      {!SessionReady && (
      <div className="select-username">
        <input type="text" ref={username}/><button onClick={socketLogHandle}>Set username</button>
      </div>)}
      <div>
        <UserList/>
      </div>
      <div>
        <MessageView/>
        <MessageBar/>
      </div>
    </div>
  )
}
