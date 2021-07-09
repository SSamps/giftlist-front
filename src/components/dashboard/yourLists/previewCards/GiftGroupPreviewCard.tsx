import React from 'react';
import { Link } from 'react-router-dom';
import { TListGroupAnyFields } from '../../../../types/models/listGroups';

interface Props {
    group: TListGroupAnyFields;
}

export const GiftGroupPreviewCard: React.FC<Props> = ({ group }: Props) => {
    return (
        <Link to={`list/${group._id}`} className='dashboardListCard'>
            <div>{group.groupVariant}</div>
            <div>{group.groupName}</div>
            <div>
                {group.children && (
                    <div>
                        {group.children.map((child) => {
                            return child.groupName;
                        })}
                    </div>
                )}
            </div>
        </Link>
    );
};
