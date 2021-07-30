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
    const [newItemState, setNewItemState] = useState<InewItemState>({
        active: false,
        newItemBody: '',
        newItemLinks: [''],
        waiting: false,
        error: '',
    });

    console.log('render now');
    const { active, newItemBody, newItemLinks, waiting } = newItemState;
    const maxLinks = 3;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewItemState({ ...newItemState, [e.target.name]: e.target.value });
    };

    const onChangeLinks = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        let userAddedChars = e.target.value.length > newItemLinks[index].length;

        newItemLinks[index] = e.target.value;

        if (userAddedChars && index === newItemLinks.length - 1 && newItemLinks.length < maxLinks) {
            newItemLinks.push('');
        }

        setNewItemState({ ...newItemState, newItemLinks: newItemLinks });
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setNewItemState({ ...newItemState, waiting: true, error: '' });
        try {
            await newListItemActionCreator(newItemBody, 'newItemLinks', itemType, groupId);
            setNewItemState({ active: true, newItemBody: '', newItemLinks: [], waiting: false, error: '' });
        } catch (err) {
            setNewItemState({ ...newItemState, waiting: false, error: err.response.status });
        }
    };

    const onClickNew = () => {
        setNewItemState({ ...newItemState, active: true });
    };

    const onRemoveLink = (index: number) => {
        let updatedNewItemLinks = newItemLinks;
        updatedNewItemLinks.splice(index, 1);
        setNewItemState({ ...newItemState, newItemLinks: updatedNewItemLinks });
    };

    const returnNewItemButton = () => {
        return (
            <div className='basicListNewItemButton'>
                <i className='fas fa-plus btn-simple' onClick={onClickNew}></i>
            </div>
        );
    };
    const returnNewItemForm = () => {
        return (
            <div className='basicListNewItemFormContainer'>
                <form className='form' onSubmit={onSubmit}>
                    <div className='form-group'>
                        <label className='form-label'>Item</label>
                        <input type='text' name='newItemBody' value={newItemBody} onChange={onChange} required />
                    </div>
                    <div className='form-group'>
                        <label className='form-label'>{'Link (optional)'}</label>
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
                                <div className='form-removableField' key={'newItemLinks' + index}>
                                    <input
                                        type='text'
                                        name={'newItemLinks' + index}
                                        placeholder='none'
                                        value={newItemLinks[index]}
                                        onChange={(e) => onChangeLinks(e, index)}
                                    />
                                    <i className='fas fa-minus btn-simple' onClick={() => onRemoveLink(index)}></i>
                                </div>
                            );
                        }
                    })}
                </form>
                <div>
                    <input type='submit' className='btn btn-primary' value='Add item' />
                    <input type='submit' className='btn btn-primary' value='Cancel' />
                </div>
                {waiting && <Spinner className='spinner-tiny'></Spinner>}
            </div>
        );
    };

    return <Fragment>{!active ? returnNewItemButton() : returnNewItemForm()}</Fragment>;
};

export default connect(null, { newListItemActionCreator })(NewListItem);
