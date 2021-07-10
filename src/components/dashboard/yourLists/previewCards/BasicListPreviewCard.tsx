import React from 'react';
import { Link } from 'react-router-dom';
import { TListGroupAnyFields } from '../../../../types/models/listGroups';

interface Props {
    group: TListGroupAnyFields;
}

export const BasicListPreviewCard: React.FC<Props> = ({ group }: Props) => {
    return (
        <Link to={`list/${group._id}`} className='dashboardListPreviewCard'>
            <div>{group.groupVariant}</div>
            <div>{group.groupName}</div>
        </Link>
    );
};