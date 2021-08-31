import React from 'react';
import ListExampleToolbar from '../shared/ListExampleToolbar';

interface props {
    ownerName: string;
}

export const GiftGroupMiniExampleCardSimple: React.FC<props> = ({ ownerName }) => {
    return (
        <div className='giftGroupMiniExampleCard'>
            <ListExampleToolbar title={`${ownerName}'s List`} size='small'></ListExampleToolbar>
            <div>Some stuff</div>
        </div>
    );
};

export default GiftGroupMiniExampleCardSimple;
