import React from 'react';
import ListExampleToolbar from '../shared/ListExampleToolbar';
import GiftGroupMiniExampleCard from './GiftGroupMiniExampleCard';
import { GiftGroupMiniExampleCardSimple } from './GiftGroupMiniExampleCardSimple';

interface props {}

const GiftGroupExample: React.FC<props> = ({}) => {
    return (
        <div className='newListExampleCard newListExampleCard-giftGroup'>
            <ListExampleToolbar title={`Family Christmas`}></ListExampleToolbar>
            <div className='giftGroupExampleCardContainer-outer'>
                <div className='giftGroupExampleCardContainer-inner'>
                    <div className='giftGroupExampleCardContainer-back'>
                        <GiftGroupMiniExampleCardSimple ownerName='Alice'></GiftGroupMiniExampleCardSimple>
                    </div>
                    <div className='giftGroupExampleCardContainer-mid'>
                        <GiftGroupMiniExampleCardSimple ownerName='Mum'></GiftGroupMiniExampleCardSimple>
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
