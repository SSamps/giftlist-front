import React from 'react';
import { TListGroupAnyFields } from '../../../types/models/listGroups';

interface Props {
    group: TListGroupAnyFields;
}

export const ListCard: React.FC<Props> = ({ group }: Props) => {
    return (
        <div className='dashboardListCard'>
            <div>{group.groupName}</div>
        </div>
    );
};
