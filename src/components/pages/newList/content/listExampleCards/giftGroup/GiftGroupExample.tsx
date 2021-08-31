import React from 'react';
import ListExampleToolbar from '../shared/ListExampleToolbar';

interface props {}

const GiftGroupExample: React.FC<props> = ({}) => {
    const ownerName = 'test';

    return (
        <div className='newListExampleCard newListExampleCard-giftGroup'>
            <ListExampleToolbar title={`${ownerName}'s Birthday List`}></ListExampleToolbar>
            <div className='giftGroupExampleCardContainer-outer'>
                <div className='giftGroupExampleCardContainer-inner'>
                    <div className='giftGroupExampleCardContainer-front'></div>
                    <div className='giftGroupExampleCardContainer-mid'></div>
                    <div className='giftGroupExampleCardContainer-back'></div>
                </div>
            </div>
        </div>
    );
};

export default GiftGroupExample;

<div>
    <div></div>
    <div></div>
</div>;
