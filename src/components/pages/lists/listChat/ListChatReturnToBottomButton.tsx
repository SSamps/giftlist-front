import React from 'react';

interface props {
    onClick: () => void;
    description: string;
}

export const ListChatReturnToBottomButton: React.FC<props> = ({ onClick, description }) => {
    return (
        <div className='newMessageNotificationContainer btn-simple' onClick={onClick}>
            {description}
        </div>
    );
};

export default ListChatReturnToBottomButton;
