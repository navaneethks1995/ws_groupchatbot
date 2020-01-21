import React,{useState, useEffect} from 'react'
import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'

const URL = "ws://localhost:3030";

export default () => {
    
    const [state, setState] = useState({name:'Bob', messages:[]});
    const [name, setName] = useState('Bob')
    const [messages, setMessages] = useState([])

    const ws =  new WebSocket(URL);
    
    const addMessage = message => {
        setMessages([message, ...messages])
    }
    useEffect(() => {
        ws.onopen = () => {
            console.log('connected');
        }

        ws.onmessage = evt => {
            const message = JSON.parse(evt.data);
            addMessage(message);
        }

        ws.onclose = () => {
            console.log('disconnected');
        }
    },[addMessage, ws.onopen, ws.onmessage, ws.onclose]);

    const submitMessage = messagestring => {
        const msg = {name, message:messagestring};
        ws.onopen = () => ws.send(JSON.stringify(msg));
        // ws.send(JSON.stringify(msg));
        addMessage(msg);
    }
    return (
        <div>
        <label htmlFor="name">Name:&nbsp;<input type="text" id={'name'} placeholder="Enter Your Name" value={name} 
        onChange={e => {setName(e.target.value)}}/></label>
        <ChatInput ws={ws} onSubmitMessage={msgstr => submitMessage(msgstr)} />
        {   messages.map((msg, ind) => <ChatMessage key={ind} message={msg.message} name={msg.name} />
            )
        }

    </div>
    )
}
