import React, { useState } from 'react';

interface props {
    submitForm: (body: string) => void;
}

const ListChatForm: React.FC<props> = ({ submitForm }) => {
    const [newMessage, setNewMessage] = useState('');

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewMessage(e.target.value);
    };

    const onSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
        e?.preventDefault();
        if (newMessage.length > 0) {
            submitForm(newMessage);
            setNewMessage('');
        }
    };

    return (
        <div className='listChatControlsContainer'>
            <form className='form form-singleInput' onSubmit={onSubmit}>
                <input type='text' value={newMessage} onChange={onChange} placeholder='Type a message'></input>
                <span className='btn-simple' onClick={() => onSubmit()}>
                    Send
                </span>
            </form>
        </div>
    );
};

export default ListChatForm;
