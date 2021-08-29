import React from 'react';
import { Link } from 'react-router-dom';
import { TgiftGroupChildFieldsCensored, TgiftListFieldsCensored } from '../../../../../types/models/listGroups';

interface Props {
    list: TgiftGroupChildFieldsCensored | TgiftListFieldsCensored;
}

const GiftListPreviewCard: React.FC<Props> = ({ list }) => {
    return (
        <Link to={`list/${list._id}`} className='listPreviewCard'>
            <div>{list.groupVariant}</div>
            <div>{list.groupName}</div>
        </Link>
    );
};

export default GiftListPreviewCard;
