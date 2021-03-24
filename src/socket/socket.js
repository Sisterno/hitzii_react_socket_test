import {io} from "socket.io-client";

const url = '172.25.71.208:3031'
const socket = io(url,{
    autoConnect:false,
    // transports:['websocket'],
    auth:{username:"test"}
});
socket.onAny((event, ...args) => {
    console.log(event, args);
  });






export default socket;