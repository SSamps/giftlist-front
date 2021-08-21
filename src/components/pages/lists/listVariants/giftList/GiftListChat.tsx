import React from 'react';

interface Props {
    ownerName: string;
}

const GiftListChat: React.FC<Props> = ({ ownerName }) => {
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
