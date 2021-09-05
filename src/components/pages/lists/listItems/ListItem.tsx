import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';

import {
    deleteListItemActionCreator,
    selectListItemActionCreator,
    TdeleteListItemActionCreator,
    TselectListItemActionCreator,
} from '../../../../redux/actions/listGroupActions';
import { IrootStateAuthedUnknownListLoaded } from '../../../../redux/reducers/root/rootReducer';
import {
    TbasicListFields,
    TgiftGroupFields,
    TgiftListFieldsCensored,
    TgroupMemberAny,
} from '../../../../types/models/listGroups';
import { IbasicListItem, IgiftListItemCensored } from '../../../../types/models/listItems';
import { IUser } from '../../../../types/models/User';
import { findUserInGroup } from '../../../../misc/helperFunctions';
import Spinner from '../../../misc/spinner';
import ModifyListItem from './ModifyListItem';
import SelectedByOverlay from './SelectedByOverlay';

interface Props {
    user: IUser;
    listItem: IbasicListItem | IgiftListItemCensored;
    currentList: TbasicListFields | TgiftListFieldsCensored | TgiftGroupFields;
    allowSelection: boolean;
    allowModification: boolean;
    allowDeletion: boolean;
    longLinks?: boolean;
    longBody?: boolean;
    deleteListItemActionCreator: TdeleteListItemActionCreator;
    selectListItemActionCreator: TselectListItemActionCreator;
}

const ListItem: React.FC<Props> = ({
    user,
    listItem,
    currentList,
    allowSelection,
    allowModification,
    allowDeletion,
    longLinks,
    longBody,
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
    const [selectedByOverlayStatus, setSelectedByOverlayStatus] = useState(false);

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
            allowSelection && (
                <span className='listItem-main-select'>
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
        if (!allowSelection || !('selectedBy' in listItem) || listItem.selectedBy === undefined) {
            return null;
        }

        const numSelected = listItem.selectedBy.length;

        if (numSelected === 1) {
            const selectedUserId = listItem.selectedBy[0];

            const selectedUserDisplayname = findUserInGroup(currentList, selectedUserId)?.displayName;

            return <div className='listItem-selected'>Selected by {selectedUserDisplayname}</div>;
        } else if (numSelected > 1) {
            let selectedByNames = listItem.selectedBy.map((userId) => {
                return (findUserInGroup(currentList, userId) as TgroupMemberAny).displayName;
            });

            return (
                <Fragment>
                    <div className='listItem-selected'>
                        <span>Shared by</span>{' '}
                        {
                            <span className='btn-simple' onClick={() => setSelectedByOverlayStatus(true)}>
                                {numSelected} people
                            </span>
                        }
                    </div>
                    {selectedByOverlayStatus && (
                        <SelectedByOverlay
                            setOpen={setSelectedByOverlayStatus}
                            selectedBy={selectedByNames}
                        ></SelectedByOverlay>
                    )}
                </Fragment>
            );
        }
    };
    const renderLinks = () => {
        return (
            <div className='listItem-links'>
                {listItem.links.map((link, index) => {
                    let url;
                    if (link.startsWith('http://') || link.startsWith('https://')) {
                        url = link;
                    } else {
                        url = 'http://' + link;
                    }
                    const displayUrl = shortenLink(link);
                    return (
                        <span className='listItem-links-linkContainer' key={`${listItem._id}_${index}`}>
                            <a
                                href={url}
                                target='_blank'
                                rel='noreferrer noopener'
                                className={`listItem-links-link ${
                                    longLinks ? 'listItem-links-link-long' : ''
                                } btn-simple`}
                            >
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
            <div className='listItem'>
                <div className='listItem-main'>
                    {renderSelectionButton()}
                    <span className={`listItem-main-body ${longBody ? 'listItem-main-body-long' : ''}`}>
                        {listItem.body}
                    </span>
                    <span className='listItem-main-controlsContainer'>
                        {waitingRemoval ? (
                            <span>
                                <Spinner className='spinner-tiny'></Spinner>
                            </span>
                        ) : (
                            <span className='listItem-main-controlsContainer-controls'>
                                {allowModification && (
                                    <span className='fas fa-pen btn-simple' onClick={onClickModify}></span>
                                )}
                                {allowDeletion && (
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

const mapStateToProps = (state: IrootStateAuthedUnknownListLoaded) => ({
    user: state.authReducer.user,
    currentList: state.listGroupReducer.currentList,
});

export default connect(mapStateToProps, { deleteListItemActionCreator, selectListItemActionCreator })(ListItem);
