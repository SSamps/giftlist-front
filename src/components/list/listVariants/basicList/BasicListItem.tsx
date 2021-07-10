import React, { useState } from 'react';
import { connect } from 'react-redux';
import { TListItem } from '../../../../types/models/listItems';
import Spinner from '../../../misc/spinner';
import {
    deleteListItemActionCreator,
    TdeleteListItemActionCreator,
    TgetListActionCreator,
    getListActionCreator,
} from '../../../../redux/actions/listGroupActions';

interface Props {
    basicListItem: TListItem;
    basicListId: string;
    deleteListItemActionCreator: TdeleteListItemActionCreator;
    getListActionCreator: TgetListActionCreator;
}

const BasicListItem: React.FC<Props> = ({
    basicListItem,
    basicListId,
    deleteListItemActionCreator,
    getListActionCreator,
}) => {
    const [removalStatus, setRemovalStatus] = useState({
        waiting: false,
        error: '',
    });

    const onClickDelete = async () => {
        setRemovalStatus({ waiting: true, error: '' });
        try {
            await deleteListItemActionCreator(basicListId, basicListItem._id, getListActionCreator);
            setRemovalStatus({ waiting: false, error: '' });
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

export default connect(null, { deleteListItemActionCreator, getListActionCreator })(BasicListItem);
