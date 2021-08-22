import React, { useEffect } from 'react';
import io from 'socket.io-client';

interface Props {
    ownerName: string;
}

const GiftListChat: React.FC<Props> = ({ ownerName }) => {
    let socket;
    useEffect(() => {
        socket = io(process.env.REACT_APP_BACKEND_BASE_URL || 'http://localhost:5000');
        if (socket) {
            console.log('connected via socket');
        }
    }, []);

    const renderChatVisibilityMessage = () => {
        return (
            <div className='giftListVisibilityMessage systemMessage'>
                <i className='fas fa-eye-slash danger'></i>{' '}
                <span>
                    {ownerName} <strong>can't</strong> see your chat
                </span>
            </div>
        );
    };

    return <div className='giftListChatContainer'>{renderChatVisibilityMessage()}</div>;
};

export default GiftListChat;
