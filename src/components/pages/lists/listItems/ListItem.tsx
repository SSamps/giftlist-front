import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';

import {
    deleteListItemActionCreator,
    selectListItemActionCreator,
    TdeleteListItemActionCreator,
    TselectListItemActionCreator,
} from '../../../../redux/actions/listGroupActions';
import { IrootStateAuthedCurrentListLoaded } from '../../../../redux/reducers/root/rootReducer';
import { TYPE_PERM_ALL_LIST_GROUP } from '../../../../types/listGroupPermissions';
import { TListGroupAnyFields } from '../../../../types/models/listGroups';
import { IbasicListItem, IgiftListItemCensored } from '../../../../types/models/listItems';
import { IUser } from '../../../../types/models/User';
import { findUserInGroup } from '../../../../utils/helperFunctions';
import Spinner from '../../../misc/spinner';
import ModifyListItem from './ModifyListItem';

interface Props {
    user: IUser;
    listItem: IbasicListItem | IgiftListItemCensored;
    currentList: TListGroupAnyFields;
    currentListPermissions: TYPE_PERM_ALL_LIST_GROUP[];
    deleteListItemActionCreator: TdeleteListItemActionCreator;
    selectListItemActionCreator: TselectListItemActionCreator;
}

const ListItem: React.FC<Props> = ({
    user,
    listItem,
    currentList,
    currentListPermissions,
    deleteListItemActionCreator,
    selectListItemActionCreator,
}) => {
    const [removalStatus, setRemovalStatus] = useState({
        waitingRemoval: false,
    });

    const [selectionStatus, setSelectionStatus] = useState({
        waitingSelection: false,
    });

    const [modifyOverlayStatus, setModifyOverlayStatus] = useState(false);

    const { waitingRemoval } = removalStatus;
    const { waitingSelection } = selectionStatus;

    const onClickDelete = async () => {
        setRemovalStatus({ waitingRemoval: true });
        const success = await deleteListItemActionCreator(currentList._id, [listItem._id]);
        if (!success) {
            setRemovalStatus({ waitingRemoval: false });
        }
    };

    const hideModifyItemOverlay = () => {
        setModifyOverlayStatus(false);
    };

    const onClickModify = () => {
        setModifyOverlayStatus(true);
    };

    const shortenLink = (link: string) => {
        if (link.startsWith('https://www.')) {
            link = link.slice(12);
        } else if (link.startsWith('http://www.')) {
            link = link.slice(11);
        } else if (link.startsWith('https://')) {
            link = link.slice(8);
        } else if (link.startsWith('http://')) {
            link = link.slice(7);
        } else if (link.startsWith('www.')) {
            link = link.slice(4);
        }
        return link;
    };

    const isSelected = () => {
        if ('selected' in listItem) {
            return listItem.selected;
        } else {
            return listItem.selectedBy?.includes(user._id);
        }
    };

    const toggleSelected = async () => {
        setSelectionStatus({ waitingSelection: true });
        const action = isSelected() ? 'DESELECT' : 'SELECT';
        await selectListItemActionCreator(action, listItem._id, currentList._id);
        setSelectionStatus({ waitingSelection: false });
    };

    const renderSelectionButton = () => {
        return (
            currentListPermissions.includes('GROUP_SELECT_LIST_ITEMS') && (
                <span className='basicListItem-main-select'>
                    {waitingSelection ? (
                        <span>
                            <Spinner className='spinner-tiny'></Spinner>
                        </span>
                    ) : (
                        <Fragment>
                            {isSelected() ? (
                                <i className='far fa-check-square btn-simple' onClick={toggleSelected}></i>
                            ) : (
                                <i className='far fa-square btn-simple' onClick={toggleSelected}></i>
                            )}
                        </Fragment>
                    )}
                </span>
            )
        );
    };

    const renderSelectedByElement = () => {
        if (
            !currentListPermissions.includes('GROUP_SELECT_LIST_ITEMS') ||
            !('selectedBy' in listItem) ||
            listItem.selectedBy === undefined
        ) {
            return null;
        }

        const numSelected = listItem.selectedBy.length;

        // TODO also need to actually fetch the names - selectedBy is IDs at the moment.

        if (numSelected === 1) {
            const selectedUserId = listItem.selectedBy[0];

            const selectedUserDisplayname = findUserInGroup(currentList, selectedUserId)?.displayName;

            return <div className='basicListItem-selected'>Selected by {selectedUserDisplayname}</div>;
        } else if (numSelected > 1) {
            // TODO Make this clickable and show an overlay of the individuals
            return <div className='basicListItem-selected'>Shared by + {numSelected} people</div>;
        }
    };

    const renderLinks = () => {
        return (
            <div className='basicListItem-links'>
                {listItem.links.map((link, index) => {
                    let url;
                    if (link.startsWith('http://') || link.startsWith('https://')) {
                        url = link;
                    } else {
                        url = 'http://' + link;
                    }
                    const displayUrl = shortenLink(link);
                    return (
                        <span className='basicListItem-links-linkContainer btn-simple' key={`${listItem._id}_${index}`}>
                            <a href={url} target='_blank' rel='noreferrer noopener'>
                                {displayUrl}
                            </a>
                        </span>
                    );
                })}
            </div>
        );
    };

    return (
        <Fragment>
            {modifyOverlayStatus && (
                <ModifyListItem
                    hideModifyItemOverlay={hideModifyItemOverlay}
                    listItem={listItem}
                    listId={currentList._id}
                ></ModifyListItem>
            )}
            <div className='basicListItem'>
                <div className='basicListItem-main'>
                    {renderSelectionButton()}
                    <span className='basicListItem-main-body'>{listItem.body}</span>
                    <span className='basicListItem-main-controlsContainer'>
                        {waitingRemoval ? (
                            <span>
                                <Spinner className='spinner-tiny'></Spinner>
                            </span>
                        ) : (
                            <span className='basicListItem-main-controlsContainer-controls'>
                                {currentListPermissions.includes('GROUP_RW_LIST_ITEMS') && (
                                    <span className='fas fa-pen btn-simple' onClick={onClickModify}></span>
                                )}
                                {currentListPermissions.includes('GROUP_RW_LIST_ITEMS') && (
                                    <span onClick={onClickDelete} className='fas fa-times btn-simple'></span>
                                )}
                            </span>
                        )}
                    </span>
                </div>
                {renderLinks()}
                {renderSelectedByElement()}
            </div>
        </Fragment>
    );
};

const mapStateToProps = (state: IrootStateAuthedCurrentListLoaded) => ({
    user: state.authReducer.user,
    currentList: state.listGroupReducer.currentList,
    currentListPermissions: state.listGroupReducer.currentListPermissions,
});

export default connect(mapStateToProps, { deleteListItemActionCreator, selectListItemActionCreator })(ListItem);
