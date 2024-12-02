import React from 'react';
import { Link } from 'react-router-dom';
import { TgiftGroupChildFieldsCensored, TgiftListFieldsCensored } from '../../../../../../types/models/listGroups';
import { IUser } from '../../../../../../types/models/User';
import { findOwnerInGroup } from '../../../../../../misc/helperFunctions';
import PreviewCardFooter from '../shared/PreviewCardFooter';
import PreviewCardHeader from '../shared/PreviewCardHeader';
import GiftListMemberPreviewCardItem from './GiftListMemberPreviewCardItem';
import GiftListOwnerPreviewCardItem from './GiftListOwnerPreviewCardItem';

interface Props {
    list: TgiftGroupChildFieldsCensored | TgiftListFieldsCensored;
    user: IUser;
}

const GiftListPreviewCard: React.FC<Props> = ({ list, user }) => {
    const owner = findOwnerInGroup(list);

    const renderOwnerPreview = () => {
        return (
            <ul className='listPreviewCard-body'>
                {list.listItems.slice(0, 6).map((item) => {
                    return (
                        <GiftListOwnerPreviewCardItem
                            key={`previewItem${item._id}`}
                            item={item}
                        ></GiftListOwnerPreviewCardItem>
                    );
                })}
            </ul>
        );
    };

    const renderMemberPreview = () => {
        let items = [...list.listItems];

        if (list.secretListItems) {
            items = [...items, ...list.secretListItems];
        }

        return (
            <ul className='listPreviewCard-body'>
                {items.slice(0, 6).map((item) => {
                    return (
                        <GiftListMemberPreviewCardItem
                            key={`previewItem${item._id}`}
                            item={item}
                            user={user}
                        ></GiftListMemberPreviewCardItem>
                    );
                })}
            </ul>
        );
    };

    return (
        <Link to={`/list/${list._id}`} className='listPreviewCard'>
            <PreviewCardHeader listVariant='Gift list' list={list}></PreviewCardHeader>
            <div className='listPreviewCard-bodyContainer'>
                {user._id === owner?.userId ? renderOwnerPreview() : renderMemberPreview()}
                <div className='listPreviewCard-fade'></div>
            </div>
            <PreviewCardFooter list={list} owner={owner} user={user}></PreviewCardFooter>
        </Link>
    );
};

export default GiftListPreviewCard;
