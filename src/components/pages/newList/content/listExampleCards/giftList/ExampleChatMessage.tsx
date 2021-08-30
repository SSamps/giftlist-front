import React from 'react';

interface props {
    message: string;
    author: string;
    date: string;
    type: 'currentUser' | 'otherUser';
}

export const ExampleChatMessage: React.FC<props> = ({ message, author, date, type }) => {
    return (
        <div className={`exampleMessageOuter exampleMessageOuter-${type}`}>
            <div className='exampleMessageInner'>
                <div className='exampleMessage-label'>
                    {type === 'currentUser' ? 'You' : author} <span className='systemMessage-tag'>{date}</span>
                </div>
                <div className={`exampleMessage exampleMessage-${type}`}>{message}</div>
            </div>
        </div>
    );
};

export default ExampleChatMessage;
