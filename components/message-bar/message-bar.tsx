import React, { useRef, useState } from "react";
import { GetStaticProps} from 'next'
import socket from "../../src/socket/socket";

export interface messageBarProps {
    
}
 
const messageBar: React.SFC<messageBarProps> = () => {
    const messageInput = useRef(null)

    const evenetSubmit = ()=>{
        //@ts-ignore
        if(messageInput.current.value){
            //@ts-ignore
            socket.emit('private message', {content: messageInput.current.value, to: "444aa04ca336f8b9"});
            //@ts-ignore
            messageInput.current.value='';
        }else{
            alert('Escriba algo')
        }  
        
    }
    
    return ( 
    <div>
        <input id="input" autoComplete='off' ref={messageInput}/><button onClick={evenetSubmit}>Send</button>
    </div> 
    );
}

export const getStaticProps: GetStaticProps = async (context) => {
    return {props:{

    }};
}
 
export default messageBar;