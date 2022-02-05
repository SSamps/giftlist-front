import React from 'react';
import { Link } from 'react-router-dom';
import { TgiftGroupFields } from '../../../../../../types/models/listGroups';
import { findOwnerInGroup } from '../../../../../../misc/helperFunctions';
import PreviewCardFooter from '../shared/PreviewCardFooter';
import PreviewCardHeader from '../shared/PreviewCardHeader';
import GiftGroupPreviewCardChild from './GiftGroupPreviewCardChild';

interface Props {
    list: TgiftGroupFields;
}

const GiftGroupPreviewCard: React.FC<Props> = ({ list }) => {
    const owner = findOwnerInGroup(list);

    return (
        <Link to={`/list/${list._id}`} className='listPreviewCard'>
            <PreviewCardHeader listVariant='Gift group' list={list}></PreviewCardHeader>
            <div className='listPreviewCard-bodyContainer'>
                <ul className='listPreviewCard-body'>
                    {list.children.slice(0, 6).map((child) => {
                        return (
                            <GiftGroupPreviewCardChild
                                key={`previewItem${child._id}`}
                                child={child}
                            ></GiftGroupPreviewCardChild>
                        );
                    })}
                </ul>
                <div className='listPreviewCard-fade'></div>
            </div>
            <PreviewCardFooter list={list} owner={owner}></PreviewCardFooter>
        </Link>
    );
};

export default GiftGroupPreviewCard;
