import React from 'react';
import { Link } from 'react-router-dom';
import { TgiftGroupFields } from '../../../../../types/models/listGroups';

interface Props {
    list: TgiftGroupFields;
}

export const GiftGroupPreviewCard: React.FC<Props> = ({ list }) => {
    return (
        <Link to={`list/${list._id}`} className='dashboardListPreviewCard'>
            <div>{list.groupVariant}</div>
            <div>{list.groupName}</div>
            <div>
                {list.children && (
                    <div>
                        {list.children.map((child) => {
                            return child.groupName;
                        })}
                    </div>
                )}
            </div>
        </Link>
    );
};
