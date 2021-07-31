import React, { useState } from 'react';
import { connect } from 'react-redux';
import { newListItemActionCreator } from '../../../../redux/actions/listGroupActions';
import Spinner from '../../../misc/spinner';

interface Props {
    submitFormData: (itemBody: string, itemLinks: string[]) => Promise<void>;
    shouldCloseAfterSubmit: boolean;
    submitButtonLabel: string;
    setItemFormHidden: () => void;
    providedInitialFormState?: { itemBody: string; itemLinks: string[] };
    maxLinks: number;
}

interface InewItemState {
    itemBody: string;
    itemLinks: string[];
    waiting: boolean;
    error: string;
}

const ListItemForm: React.FC<Props> = ({
    submitFormData,
    shouldCloseAfterSubmit,
    submitButtonLabel,
    setItemFormHidden,
    providedInitialFormState,
    maxLinks,
}) => {
    let initialFormState;
    if (providedInitialFormState) {
        initialFormState = { ...providedInitialFormState, waiting: false, error: '' };
    } else {
        initialFormState = {
            itemBody: '',
            itemLinks: [''],
            waiting: false,
            error: '',
        };
    }

    const [itemFormState, setItemFormState] = useState<InewItemState>(initialFormState);

    const { itemBody, itemLinks, waiting } = itemFormState;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setItemFormState({ ...itemFormState, [e.target.name]: e.target.value });
    };

    const onChangeLinks = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        let userAddedChars = e.target.value.length > itemLinks[index].length;
        let updatedItemLinks = Array.from(itemLinks);
        updatedItemLinks[index] = e.target.value;

        if (userAddedChars && index === itemLinks.length - 1 && itemLinks.length < maxLinks) {
            updatedItemLinks.push('');
        }

        setItemFormState({ ...itemFormState, itemLinks: updatedItemLinks });
    };

    const addNewLinkField = () => {
        let updatedItemLinks = Array.from(itemLinks);
        updatedItemLinks.push('');
        setItemFormState({ ...itemFormState, itemLinks: updatedItemLinks });
    };

    const removeLink = (index: number) => {
        let updatedItemLinks = Array.from(itemLinks);
        updatedItemLinks.splice(index, 1);
        setItemFormState({ ...itemFormState, itemLinks: updatedItemLinks });
    };

    const submitForm = async () => {
        let updatedItemLinks = Array.from(itemLinks);
        for (let i = updatedItemLinks.length - 1; i >= 0; i--) {
            if (updatedItemLinks[i].length === 0) {
                updatedItemLinks.splice(i, 1);
            }
        }

        setItemFormState({ ...itemFormState, itemLinks: updatedItemLinks, waiting: true, error: '' });
        try {
            await submitFormData(itemBody, updatedItemLinks);
            if (shouldCloseAfterSubmit) {
                setItemFormHidden();
            } else {
                setItemFormState({ itemBody: '', itemLinks: [''], waiting: false, error: '' });
            }
        } catch (err) {
            setItemFormState({
                ...itemFormState,
                itemLinks: updatedItemLinks,
                waiting: false,
                error: err.response.status,
            });
        }
    };

    return (
        <div className='basicListNewItemFormContainer'>
            <form className='form'>
                <div className='form-groupWithSideControls'>
                    <label className='form-label'>Item</label>
                    <div className='form-group-inputContainerWithSideControls'>
                        <input type='text' name='itemBody' value={itemBody} onChange={onChange} required />
                    </div>
                </div>
                <div className='form-groupWithSideControls'>
                    <label className='form-label'>{'Link (optional)'}</label>
                    <div className='form-group-inputContainerWithSideControls'>
                        <input
                            type='text'
                            key='itemLinks0'
                            name='itemLinks0'
                            placeholder='none'
                            value={itemLinks[0]}
                            onChange={(e) => onChangeLinks(e, 0)}
                        />
                    </div>
                    {itemLinks.map((_, index) => {
                        if (index > 0) {
                            return (
                                <div className='form-group-inputContainerWithSideControls' key={'newItemLinks' + index}>
                                    <input
                                        type='text'
                                        name={'newItemLinks' + index}
                                        placeholder='none'
                                        value={itemLinks[index]}
                                        onChange={(e) => onChangeLinks(e, index)}
                                    />
                                    <i className='fas fa-minus btn-simple' onClick={() => removeLink(index)}></i>
                                </div>
                            );
                        } else {
                            return null;
                        }
                    })}
                    {itemLinks.length < maxLinks && (
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
                        {submitButtonLabel}
                    </span>
                    <span className='btn btn-primary' onClick={setItemFormHidden}>
                        Cancel
                    </span>
                </div>
            </form>

            {waiting && <Spinner className='spinner-tiny'></Spinner>}
        </div>
    );
};

export default connect(null, { newListItemActionCreator })(ListItemForm);
