import React from 'react';
import { IgiftListItemCensored } from '../../../../../../types/models/listItems';
import { IUser } from '../../../../../../types/models/User';

interface props {
    item: IgiftListItemCensored;
    user: IUser
}

const GiftListMemberPreviewCardItem: React.FC<props> = ({ item, user }) => {
    return (
        <li className='listPreviewCard-body-giftListItem-member'>
            <span className='listPreviewCard-body-giftListItem-text'>{item.body}</span>
            <span className='listPreviewCard-body-giftListItem-selection'>
                {item.selectedBy?.includes(user._id) ? '- Selected' : ''}
            </span>
        </li>
    );
};


export default GiftListMemberPreviewCardItem;
