import React, { useState } from 'react';
import { VALIDATION_MESSAGE_MAX_LENGTH } from '../../../../misc/validation';
import AutoGrowTextField from '../../../misc/AutoGrowTextField';

interface props {
    submitForm: (body: string) => void;
}

const ListChatForm: React.FC<props> = ({ submitForm }) => {
    const [newMessage, setNewMessage] = useState('');

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewMessage(e.target.value);
    };

    const onSubmit = (e?: React.FormEvent<HTMLFormElement | HTMLTextAreaElement>) => {
        e?.preventDefault();
        if (newMessage.length > 0) {
            submitForm(newMessage);
            setNewMessage('');
        }
    };

    return (
        <div className='listChatControlsContainer'>
            <form className='form form-singleInput' onSubmit={onSubmit}>
                <AutoGrowTextField
                    maxLength={VALIDATION_MESSAGE_MAX_LENGTH}
                    onChange={onChange}
                    onSubmit={onSubmit}
                    placeholder='Type a message'
                    value={newMessage}
                ></AutoGrowTextField>
                <span className='btn-simple' onClick={() => onSubmit()}>
                    Send
                </span>
            </form>
        </div>
    );
};

export default ListChatForm;
