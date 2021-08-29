import React from 'react';
import { Link } from 'react-router-dom';
import { TgiftGroupChildFieldsCensored, TgiftListFieldsCensored } from '../../../../../types/models/listGroups';
import { findOwnerInGroup } from '../../../../../utils/helperFunctions';
import PreviewCardFooter from './PreviewCardFooter';
import PreviewCardHeader from './PreviewCardHeader';

interface Props {
    list: TgiftGroupChildFieldsCensored | TgiftListFieldsCensored;
}

const GiftListPreviewCard: React.FC<Props> = ({ list }) => {
    const owner = findOwnerInGroup(list);

    return (
        <Link to={`/list/${list._id}`} className='listPreviewCard'>
            <PreviewCardHeader listVariant='Gift list' list={list}></PreviewCardHeader>
            <ul className='listPreviewCard-body'>
                {list.listItems.map((item) => {
                    return (
                        <div key={`previewItem${item._id}`}>{item._id}</div>
                        // <BasicListPreviewCardItem key={`previewItem${item._id}`} item={item}></BasicListPreviewCardItem>
                    );
                })}
            </ul>
            <PreviewCardFooter list={list} owner={owner}></PreviewCardFooter>
        </Link>
    );
};

export default GiftListPreviewCard;
