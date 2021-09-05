import React from 'react';
import ListExampleToolbar from '../shared/ListExampleToolbar';
import GiftGroupMiniExampleCard from './GiftGroupMiniExampleCard';
import { GiftGroupMiniExampleCardHidden } from './GiftGroupMiniExampleCardHidden';

interface props {}

const GiftGroupExample: React.FC<props> = ({}) => {
    return (
        <div className='newListExampleCard newListExampleCard-giftGroup'>
            <ListExampleToolbar title={`Family Christmas`}></ListExampleToolbar>
            <div className='giftGroupExampleCardContainer-outer'>
                <div className='giftGroupExampleCardContainer-inner'>
                    <div className='giftGroupExampleCardContainer-back'>
                        <GiftGroupMiniExampleCardHidden ownerName='Alice'></GiftGroupMiniExampleCardHidden>
                    </div>
                    <div className='giftGroupExampleCardContainer-mid'>
                        <GiftGroupMiniExampleCardHidden ownerName='Mum'></GiftGroupMiniExampleCardHidden>
                    </div>
                    <div className='giftGroupExampleCardContainer-front'>
                        <GiftGroupMiniExampleCard ownerName='Dad'></GiftGroupMiniExampleCard>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GiftGroupExample;
