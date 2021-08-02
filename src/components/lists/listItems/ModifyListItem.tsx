import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { modifyListItemActionCreator, TmodifyListItemActionCreator } from '../../../redux/actions/listGroupActions';
import { IbasicListItem, IgiftListItemCensored } from '../../../types/models/listItems';
import DropdownUnderlay from '../../dashboard/yourLists/controlBar/filters/DropdownUnderlay';
import ListItemForm from './ListItemForm';

interface Props {
    hideModifyItemOverlay: () => void;
    listItem: IbasicListItem | IgiftListItemCensored;
    listId: string;
    modifyListItemActionCreator: TmodifyListItemActionCreator;
}

const ModifyListItem: React.FC<Props> = ({ hideModifyItemOverlay, listItem, listId, modifyListItemActionCreator }) => {
    const submitForm = async (itemBody: string, itemLinks: string[]) => {
        await modifyListItemActionCreator(itemBody, itemLinks, listItem._id, listId);
    };

    return (
        <Fragment>
            <div className='basicListModifyItemOverlay'>
                <ListItemForm
                    header={'Modify an item'}
                    submitFormData={submitForm}
                    shouldCloseAfterSubmit={true}
                    submitButtonLabel='Submit'
                    setItemFormHidden={hideModifyItemOverlay}
                    maxLinks={3}
                    providedInitialFormState={{ itemBody: listItem.body, itemLinks: listItem.links }}
                ></ListItemForm>
            </div>
            <DropdownUnderlay setOpen={hideModifyItemOverlay}></DropdownUnderlay>
        </Fragment>
    );
};

export default connect(null, { modifyListItemActionCreator })(ModifyListItem);
