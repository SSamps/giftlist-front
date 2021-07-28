import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { newListItemActionCreator, TnewListItemActionCreator } from '../../../../redux/actions/listGroupActions';
import Spinner from '../../../misc/spinner';

interface Props {
    itemType: 'listItem' | 'secretListItem';
    groupId: string;
    newListItemActionCreator: TnewListItemActionCreator;
}

const NewListItemField: React.FC<Props> = ({ itemType, groupId, newListItemActionCreator }) => {
    const [newItemStatus, setNewItemStatus] = useState({
        newItemBody: '',
        newItemLink: '',
        waiting: false,
        error: '',
    });

    const { newItemBody, newItemLink, waiting } = newItemStatus;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewItemStatus({ ...newItemStatus, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setNewItemStatus({ ...newItemStatus, waiting: true, error: '' });
        try {
            await newListItemActionCreator(newItemBody, newItemLink, itemType, groupId);
            setNewItemStatus({ newItemBody: '', newItemLink: '', waiting: false, error: '' });
        } catch (err) {
            setNewItemStatus({ ...newItemStatus, waiting: false, error: err.response.status });
        }
    };

    return (
        <Fragment>
            <form onSubmit={onSubmit}>
                <input
                    className='basicListNewItemForm-input'
                    type='text'
                    placeholder={itemType === 'secretListItem' ? 'Add a gift idea' : 'Add an item'}
                    name='newItemBody'
                    value={newItemBody}
                    onChange={onChange}
                    required
                />
                {waiting && <Spinner className='spinner-tiny'></Spinner>}
            </form>{' '}
        </Fragment>
    );
};

export default connect(null, { newListItemActionCreator })(NewListItemField);
