import React from 'react';
import ListExampleToolbar from '../shared/ListExampleToolbar';

interface props {
    ownerName: string;
}

export const GiftGroupMiniExampleCardHidden: React.FC<props> = ({ ownerName }) => {
    return (
        <div className='giftGroupMiniExampleCard'>
            <ListExampleToolbar title={`${ownerName}'s List`} size='small'></ListExampleToolbar>
            <div></div>
        </div>
    );
};

export default GiftGroupMiniExampleCardHidden;
