import React from 'react';
import { Link } from 'react-router-dom';
import { TListGroupAnyFields } from '../../../../types/models/listGroups';

interface Props {
    group: TListGroupAnyFields;
}

export const GiftGroupChildPreviewCard: React.FC<Props> = ({ group }: Props) => {
    return (
        <Link to={`${group._id}`} className='childListPreviewCard'>
            <div>{group.groupVariant}</div>
            <div>{group.groupName}</div>
        </Link>
    );
};
