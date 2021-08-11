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
        await newListItemActionCreator(itemBody, itemLinks, itemType, groupId);
    };

    const showNewItemForm = () => {
        setitemFormVisible(true);
    };

    const hideNewItemForm = () => {
        setitemFormVisible(false);
    };

    const returnNewItemButton = () => {
        return (
            <div className='basicListNewItemButton'>
                <i className='fas fa-plus btn-simple' onClick={showNewItemForm}></i>
            </div>
        );
    };

    return (
        <Fragment>
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
        </Fragment>
    );
};

export default connect(null, { newListItemActionCreator })(NewListItem);
