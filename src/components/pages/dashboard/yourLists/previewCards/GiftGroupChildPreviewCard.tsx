import React from 'react';
import { Link } from 'react-router-dom';
import { TgiftListFieldsCensored } from '../../../../../types/models/listGroups';

interface Props {
    group: TgiftListFieldsCensored;
}

export const GiftGroupChildPreviewCard: React.FC<Props> = ({ group }) => {
    return (
        <Link to={`${group._id}`} className='dashboardListPreviewCard'>
            <div>{group.groupVariant}</div>
            <div>{group.groupName}</div>
        </Link>
    );
};
