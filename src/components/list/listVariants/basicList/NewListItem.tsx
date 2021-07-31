import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { newListItemActionCreator, TnewListItemActionCreator } from '../../../../redux/actions/listGroupActions';
import Spinner from '../../../misc/spinner';

interface Props {
    itemType: 'listItem' | 'secretListItem';
    groupId: string;
    newListItemActionCreator: TnewListItemActionCreator;
}

interface InewItemState {
    active: boolean;
    newItemBody: string;
    newItemLinks: string[];
    waiting: boolean;
    error: string;
}

const NewListItem: React.FC<Props> = ({ itemType, groupId, newListItemActionCreator }) => {
    const initialNewItemState = {
        active: false,
        newItemBody: '',
        newItemLinks: [''],
        waiting: false,
        error: '',
    };

    const [newItemState, setNewItemState] = useState<InewItemState>(initialNewItemState);

    const { active, newItemBody, newItemLinks, waiting } = newItemState;
    const maxLinks = 3;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewItemState({ ...newItemState, [e.target.name]: e.target.value });
    };

    const onChangeLinks = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        let userAddedChars = e.target.value.length > newItemLinks[index].length;
        let updatedNewItemLinks = Array.from(newItemLinks);
        updatedNewItemLinks[index] = e.target.value;

        if (userAddedChars && index === newItemLinks.length - 1 && newItemLinks.length < maxLinks) {
            updatedNewItemLinks.push('');
        }

        setNewItemState({ ...newItemState, newItemLinks: updatedNewItemLinks });
    };

    const submitForm = async () => {
        for (let i = newItemLinks.length - 1; i >= 0; i--) {
            if (newItemLinks[i].length === 0) {
                newItemLinks.splice(i, 1);
            }
        }

        setNewItemState({ ...newItemState, waiting: true, error: '' });
        try {
            await newListItemActionCreator(newItemBody, newItemLinks, itemType, groupId);
            setNewItemState({ active: true, newItemBody: '', newItemLinks: [], waiting: false, error: '' });
        } catch (err) {
            setNewItemState({ ...newItemState, waiting: false, error: err.response.status });
        }
    };

    const showNewItemForm = () => {
        setNewItemState({ ...newItemState, active: true });
    };

    const addNewLinkField = () => {
        let updatedNewItemLinks = Array.from(newItemLinks);
        updatedNewItemLinks.push('');
        setNewItemState({ ...newItemState, newItemLinks: updatedNewItemLinks });
    };

    const removeLink = (index: number) => {
        let updatedNewItemLinks = Array.from(newItemLinks);
        updatedNewItemLinks.splice(index, 1);
        setNewItemState({ ...newItemState, newItemLinks: updatedNewItemLinks });
    };

    const hideNewItemForm = () => {
        setNewItemState(initialNewItemState);
    };

    const returnNewItemButton = () => {
        return (
            <div className='basicListNewItemButton'>
                <i className='fas fa-plus btn-simple' onClick={showNewItemForm}></i>
            </div>
        );
    };
    const returnNewItemForm = () => {
        return (
            <div className='basicListNewItemFormContainer'>
                <form className='form'>
                    <div className='form-groupWithSideControls'>
                        <label className='form-label'>Item</label>
                        <div className='form-group-inputContainerWithSideControls'>
                            <input type='text' name='newItemBody' value={newItemBody} onChange={onChange} required />
                        </div>
                    </div>
                    <div className='form-groupWithSideControls'>
                        <label className='form-label'>{'Link (optional)'}</label>
                        <div className='form-group-inputContainerWithSideControls'>
                            <input
                                type='text'
                                key='newItemLinks0'
                                name='newItemLinks0'
                                placeholder='none'
                                value={newItemLinks[0]}
                                onChange={(e) => onChangeLinks(e, 0)}
                            />
                        </div>
                        {newItemLinks.map((_, index) => {
                            if (index > 0) {
                                return (
                                    <div
                                        className='form-group-inputContainerWithSideControls'
                                        key={'newItemLinks' + index}
                                    >
                                        <input
                                            type='text'
                                            name={'newItemLinks' + index}
                                            placeholder='none'
                                            value={newItemLinks[index]}
                                            onChange={(e) => onChangeLinks(e, index)}
                                        />
                                        <i className='fas fa-minus btn-simple' onClick={() => removeLink(index)}></i>
                                    </div>
                                );
                            }
                        })}
                        {newItemLinks.length < maxLinks && (
                            <label
                                className=' form-label form-label-offset btn-simple form-group-inputButtonBelow'
                                onClick={addNewLinkField}
                            >
                                <i className='fas fa-plus btn-simple'></i> Additional Link
                            </label>
                        )}
                    </div>
                    <div className='form-controls'>
                        <span className='btn btn-primary' onClick={submitForm}>
                            Add item
                        </span>
                        <span className='btn btn-primary' onClick={hideNewItemForm}>
                            Cancel
                        </span>
                    </div>
                </form>

                {waiting && <Spinner className='spinner-tiny'></Spinner>}
            </div>
        );
    };

    return <Fragment>{!active ? returnNewItemButton() : returnNewItemForm()}</Fragment>;
};

export default connect(null, { newListItemActionCreator })(NewListItem);
