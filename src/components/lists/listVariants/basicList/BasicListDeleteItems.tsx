import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { deleteListItemActionCreator, TdeleteListItemActionCreator } from '../../../../redux/actions/listGroupActions';
import { TbasicListFields } from '../../../../types/models/listGroups';
import ConfirmationOverlay from './ConfirmationOverlay';

interface Props {
    currentList: TbasicListFields;
    deleteListItemActionCreator: TdeleteListItemActionCreator;
}

const BasicListDeleteItems: React.FC<Props> = ({ currentList, deleteListItemActionCreator }) => {
    const [deleteAllOverlayStatus, setdeleteAllOverlayStatus] = useState(false);
    const [deleteSelectedOverlayStatus, setdeleteSelectedOverlayStatus] = useState(false);

    const showDeleteSelectionOverlay = () => {
        setdeleteSelectedOverlayStatus(true);
    };

    const getSelectedItemIds = () => {
        return currentList?.listItems
            .filter((item) => {
                return item.selected;
            })
            .map((item) => {
                return item._id;
            });
    };

    const deleteSelection = async () => {
        const itemsToDelete = getSelectedItemIds();

        await deleteListItemActionCreator(currentList._id.toString(), itemsToDelete);
        setdeleteSelectedOverlayStatus(false);
    };

    const showDeleteAllOverlay = () => {
        setdeleteAllOverlayStatus(true);
    };

    const getAllItemIds = () => {
        return currentList.listItems.map((item) => {
            return item._id;
        });
    };

    const deleteAll = async () => {
        const itemsToDelete = getAllItemIds();
        await deleteListItemActionCreator(currentList._id.toString(), itemsToDelete);
        setdeleteAllOverlayStatus(false);
    };

    const renderOverlays = () => {
        return (
            <Fragment>
                {deleteAllOverlayStatus ? (
                    <ConfirmationOverlay
                        setOpen={setdeleteAllOverlayStatus}
                        submitForm={deleteAll}
                        description={'Delete all items?'}
                    ></ConfirmationOverlay>
                ) : (
                    deleteSelectedOverlayStatus && (
                        <ConfirmationOverlay
                            setOpen={setdeleteSelectedOverlayStatus}
                            submitForm={deleteSelection}
                            description={'Delete all selected items?'}
                        ></ConfirmationOverlay>
                    )
                )}
            </Fragment>
        );
    };

    return (
        <Fragment>
            {renderOverlays()}
            <div className='basicListDeleteItemsContainer'>
                <span className='basicListDeleteItemsContainer-button'>
                    <span className='btn-simple' onClick={showDeleteSelectionOverlay}>
                        Delete selected
                    </span>
                </span>
                <span className='basicListDeleteItemsContainer-button'>
                    <span className='btn-simple' onClick={showDeleteAllOverlay}>
                        Delete all
                    </span>
                </span>
            </div>
        </Fragment>
    );
};

export default connect(null, { deleteListItemActionCreator })(BasicListDeleteItems);
