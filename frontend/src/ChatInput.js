import React, {useState} from 'react'
import PropTypes from 'prop-types'

const ChatInput = ({onSubmitMessage}) => {

    const [message, setMessage] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        onSubmitMessage(message);
        setMessage('');
    }

    return (
        <form action="." onSubmit={e => handleSubmit(e)}>
            <input type="text" placeholder="Enter Message.." value={message} onChange={e => setMessage(e.target.value)} />
            <input type="submit" value="Send" />
        </form>
    )
}

ChatInput.propTypes = {
    onSubmitMessage: PropTypes.func.isRequired
}

export default ChatInput
