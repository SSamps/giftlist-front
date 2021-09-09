import React, { useState } from 'react';
import { connect } from 'react-redux';
import { VALIDATION_ITEM_BODY_MAX_LENGTH, VALIDATION_ITEM_LINK_MAX_LENGTH } from '../../../../misc/validation';
import { newListItemActionCreator } from '../../../../redux/actions/listGroupActions';
import AutoGrowTextField from '../../../misc/AutoGrowTextField';

import Spinner from '../../../misc/spinner';

interface Props {
    header?: string;
    submitFormData: (itemBody: string, itemLinks: string[]) => Promise<boolean>;
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
    header,
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
        if (initialFormState.itemLinks.length === 0) {
            initialFormState.itemLinks = [''];
        }
    } else {
        initialFormState = {
            itemBody: '',
            itemLinks: [''],
            waiting: false,
            error: '',
        };
    }

    const [itemFormState, setItemFormState] = useState<InewItemState>(initialFormState);

    const initialFormErrorState = { itemError: '', linksError: '' };
    const [formErrorState, setFormErrorState] = useState(initialFormErrorState);

    const { itemBody, itemLinks, waiting } = itemFormState;
    const { itemError } = formErrorState;

    const onChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
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

    const isValidFormInput = () => {
        if (itemBody.length <= 0) {
            setFormErrorState({ ...formErrorState, itemError: 'You must provide an item description' });
            return false;
        } else {
            setFormErrorState(initialFormErrorState);
            return true;
        }
    };

    const submitForm = async () => {
        if (!isValidFormInput()) {
            return;
        }

        let updatedItemLinks = Array.from(itemLinks);
        for (let i = updatedItemLinks.length - 1; i >= 0; i--) {
            if (updatedItemLinks[i].length === 0) {
                updatedItemLinks.splice(i, 1);
            }
        }

        setItemFormState({ ...itemFormState, waiting: true });

        try {
            const success = await submitFormData(itemBody, updatedItemLinks);

            if (success) {
                if (shouldCloseAfterSubmit) {
                    setItemFormHidden();
                } else {
                    setItemFormState({ itemBody: '', itemLinks: [''], waiting: false, error: '' });
                }
            } else {
                setItemFormState({ ...itemFormState, waiting: false, error: '' });
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
        <div className='newListItemFormContainer'>
            {header && <span className='text-header'>{header}</span>}
            <form className='form'>
                <div className='form-groupWithSideControls'>
                    <label className='form-label'>Item</label>
                    <div className='form-group-inputContainerWithSideControls'>
                        <AutoGrowTextField
                            maxLength={VALIDATION_ITEM_BODY_MAX_LENGTH}
                            onChange={onChange}
                            onSubmit={submitForm}
                            placeholder='Type a message'
                            name='itemBody'
                            value={itemBody}
                        ></AutoGrowTextField>
                    </div>
                    {itemError && <p className='form-error-message'>{itemError}</p>}
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
                            maxLength={VALIDATION_ITEM_LINK_MAX_LENGTH}
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
                                        maxLength={VALIDATION_ITEM_LINK_MAX_LENGTH}
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
                    <span className='btn-block' onClick={submitForm}>
                        {submitButtonLabel}
                    </span>
                    <span className='btn-block' onClick={setItemFormHidden}>
                        Cancel
                    </span>
                </div>
            </form>

            {waiting && <Spinner className='spinner-tiny'></Spinner>}
        </div>
    );
};

export default connect(null, { newListItemActionCreator })(ListItemForm);
