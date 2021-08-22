import React from 'react';

interface props {
    description: string;
}

const EmptyListItem: React.FC<props> = ({ description }) => {
    return (
        <div className='listItem'>
            <div className='listItem-main'>
                <div className='listItem-Empty'>
                    <span className='systemMessage-dark'>{description}</span>
                </div>
            </div>
        </div>
    );
};

export default EmptyListItem;
