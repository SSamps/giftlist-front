import React, { useState } from 'react';
import { VALIDATION_MESSAGE_MAX_LENGTH } from '../../../../misc/validation';

interface props {
    submitForm: (body: string) => void;
}

const ListChatForm: React.FC<props> = ({ submitForm }) => {
    const [newMessage, setNewMessage] = useState('');

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
                <textarea
                    className='growingTextInput'
                    value={newMessage}
                    onChange={onChange}
                    placeholder='Type a message'
                    maxLength={VALIDATION_MESSAGE_MAX_LENGTH}
                ></textarea>
                <span className='btn-simple' onClick={() => onSubmit()}>
                    Send
                </span>
            </form>
        </div>
    );
};

export default ListChatForm;
