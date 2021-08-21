import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { newListItemActionCreator, TnewListItemActionCreator } from '../../../../redux/actions/listGroupActions';
import ListItemForm from './ListItemForm';

interface Props {
    itemType: 'listItem' | 'secretListItem';
    groupId: string;
    newListItemActionCreator: TnewListItemActionCreator;
}

const NewListItem: React.FC<Props> = ({ itemType, groupId, newListItemActionCreator }) => {
    const [itemFormVisible, setitemFormVisible] = useState(false);

    const submitForm = async (itemBody: string, itemLinks: string[]) => {
        const success = await newListItemActionCreator(itemBody, itemLinks, itemType, groupId);
        return success;
    };

    const showNewItemForm = () => {
        setitemFormVisible(true);
    };

    const hideNewItemForm = () => {
        setitemFormVisible(false);
    };

    const returnNewItemButton = () => {
        return (
            <div>
                <span className='btn-simple' onClick={showNewItemForm}>
                    <i className='fas fa-plus'></i> {itemType === 'listItem' ? 'New item' : 'Gift idea'}
                </span>
            </div>
        );
    };

    return (
        <Fragment>
            <div className='basicListNewItemContainer'>
                {!itemFormVisible ? (
                    returnNewItemButton()
                ) : (
                    <ListItemForm
                        submitFormData={submitForm}
                        shouldCloseAfterSubmit={false}
                        submitButtonLabel='Add item'
                        setItemFormHidden={hideNewItemForm}
                        maxLinks={3}
                    ></ListItemForm>
                )}
            </div>
        </Fragment>
    );
};

export default connect(null, { newListItemActionCreator })(NewListItem);
