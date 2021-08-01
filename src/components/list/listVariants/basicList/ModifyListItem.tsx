import React, { Fragment } from 'react';
import { TListItem } from '../../../../types/models/listItems';
import DropdownUnderlay from '../../../dashboard/yourLists/controlBar/filters/DropdownUnderlay';
import ListItemForm from './ListItemForm';

interface Props {
    hideModifyItemOverlay: () => void;
    listItem: TListItem;
    listId: string;
}

const ModifyListItem: React.FC<Props> = ({ hideModifyItemOverlay, listItem, listId }) => {
    const submitForm = async () => {
        console.log(listId);
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

export default ModifyListItem;
