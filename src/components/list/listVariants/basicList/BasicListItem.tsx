import React, { useState } from 'react';
import { connect } from 'react-redux';
import { TListItem } from '../../../../types/models/listItems';
import Spinner from '../../../misc/spinner';
import { deleteListItemActionCreator, TdeleteListItemActionCreator } from '../../../../redux/actions/listGroupActions';

interface Props {
    basicListItem: TListItem;
    basicListId: string;
    deleteListItemActionCreator: TdeleteListItemActionCreator;
}

const BasicListItem: React.FC<Props> = ({ basicListItem, basicListId, deleteListItemActionCreator }) => {
    const [removalStatus, setRemovalStatus] = useState({
        waiting: false,
        error: '',
    });

    const onClickDelete = async () => {
        setRemovalStatus({ waiting: true, error: '' });
        try {
            await deleteListItemActionCreator(basicListId, basicListItem._id);
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

export default connect(null, { deleteListItemActionCreator })(BasicListItem);
