import React from 'react';
import { IbasicListItem } from '../../../../../../types/models/listItems';

interface props {
    item: IbasicListItem;
}

const BasicListPreviewCardItem: React.FC<props> = ({ item }) => {
    return (
        <li className='listPreviewCard-body-basicItem'>
            <span className='listPreviewCard-body-basicItem-icon'>
                {item.selected ? <i className='far fa-check-square'></i> : <i className='far fa-square'></i>}
            </span>
            <span className='listPreviewCard-body-basicItem-text'>{item.body}</span>
        </li>
    );
};

export default BasicListPreviewCardItem;
