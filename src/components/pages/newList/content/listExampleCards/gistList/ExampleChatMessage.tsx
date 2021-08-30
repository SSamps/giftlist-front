import React from 'react';

interface props {
    message: string;
    author: string;
    date: string;
    type: 'currentUser' | 'otherUser';
}

export const ExampleChatMessage: React.FC<props> = ({ message, author, date, type }) => {
    return (
        <div className={`messageContainerOuter messageContainerOuter-${type}`}>
            <div className='messageContainerInner'>
                <div className='message-label'>
                    {type === 'currentUser' ? 'You' : author} <span className='systemMessage-tag'>{date}</span>
                </div>
                <div className={`message message-${type}`}>{message}</div>
            </div>
        </div>
    );
};

export default ExampleChatMessage;
