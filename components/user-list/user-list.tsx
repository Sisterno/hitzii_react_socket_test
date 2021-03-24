import { useState } from "react";
import socket from "../../src/socket/socket";

export interface UserListProps {
    
}
interface massagesIU {
  content:string
  from:string
  fromSelf:boolean
  to:string
}
interface userObject {
    userID: string,
    username: string,
    connected: boolean,
    messages?: Array<massagesIU>
    self?:boolean
}
 
const UserList: React.SFC<UserListProps> = () => {
    const [Users, setUsers] = useState([]);
    socket.on("users", (users:Array<userObject>) => {
      console.log(users)
      users.map((user:userObject) => {
        user.messages?.map((message) => {
          //@ts-ignore
          message.fromSelf = message.from === socket.userID;
        });
        for (let i = 0; i < Users.length; i++) {
          const existingUser:userObject = Users[i];
          if (existingUser.userID === user.userID) {
            existingUser.connected = user.connected;
            existingUser.messages = user.messages;
            return;
          }
        }
        //@ts-ignore
        user.self = user.userID === socket.userID;
        
      });
      
      
      // put the current user first, and sort by username
      users.sort((a:userObject, b:userObject) => {
        if (a.self) return -1;
        if (b.self) return 1;
        if (a.username < b.username) return -1;
        return a.username > b.username ? 1 : 0;
      });
      //@ts-ignore
      setUsers(users)
    });
    // const handleSelectUser = 
    return (<>
        {Users.map((User:userObject)=>{
          return <div className='ChatUser' onClick={()=>{
            console.log(User.userID)
          }} key={User.userID}> <span>{User.username}</span></div> 
        }) }
    </>);
}
 
export default UserList;