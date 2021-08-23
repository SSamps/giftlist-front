import React from 'react';

interface props {
    onClick: () => void;
}

export const ListChatNewMessageNotification: React.FC<props> = ({ onClick }) => {
    return (
        <div className='newMessageNotificationContainer btn-simple' onClick={onClick}>
            New messages
        </div>
    );
};

export default ListChatNewMessageNotification;
