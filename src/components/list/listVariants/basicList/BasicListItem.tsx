import axios from 'axios';
import React, { useState } from 'react';
import { TListItem } from '../../../../types/models/listItems';
import Spinner from '../../../misc/spinner';
import { IgroupData } from '../../ListLoader';

interface Props {
    basicListItem: TListItem;
    basicListId: string;
    setGroupData: React.Dispatch<React.SetStateAction<IgroupData>>;
    groupData: IgroupData;
}

const BasicListItem: React.FC<Props> = ({ basicListItem, basicListId, setGroupData, groupData }) => {
    const [removalStatus, setRemovalStatus] = useState({
        waiting: false,
        error: '',
    });

    const onClickDelete = async () => {
        setRemovalStatus({ waiting: true, error: '' });
        try {
            await axios.delete(`/api/groups/${basicListId}/items/${basicListItem._id}`);
            setRemovalStatus({ waiting: false, error: '' });
            //@ts-ignore
            groupData.group.listItems = groupData.group?.listItems.filter((item) => {
                return !(item._id === basicListItem._id);
            });
            setGroupData({ ...groupData });
            console.log(basicListItem);
        } catch (err) {
            setRemovalStatus({ waiting: false, error: err.response.status });
        }
    };

    const { waiting } = removalStatus;

    return (
        <div>
            {basicListItem.body} {basicListItem.link}{' '}
            {waiting ? (
                <Spinner className='spinner-tiny'></Spinner>
            ) : (
                <button onClick={onClickDelete} className='fas fa-times'></button>
            )}
        </div>
    );
};

export default BasicListItem;
