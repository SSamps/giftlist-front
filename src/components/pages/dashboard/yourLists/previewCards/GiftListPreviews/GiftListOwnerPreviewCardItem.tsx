import React from 'react';
import { IgiftListItemCensored } from '../../../../../../types/models/listItems';

interface props {
    item: IgiftListItemCensored;
}

const GiftListOwnerPreviewCardItem: React.FC<props> = ({ item }) => {
    return (
        <li className='listPreviewCard-body-basicItem'>
            <span className='listPreviewCard-body-basicItem-text'>{item.body}</span>
        </li>
    );
};

export default GiftListOwnerPreviewCardItem;
