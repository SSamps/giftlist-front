import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { addAlertThunkActionCreator } from '../../../../../redux/actions/alertActions';
import { IrootStateAuthedGiftGroupLoaded } from '../../../../../redux/reducers/root/rootReducer';
import { IgiftGroupMember, TgiftGroupFields } from '../../../../../types/models/listGroups';
import { IUser } from '../../../../../types/models/User';
import { findUserInGroup } from '../../../../../misc/helperFunctions';
import GiftListPreviewCard from '../../../dashboard/yourLists/previewCards/GiftListPreviews/GiftListPreviewCard';
import ListTitleBar from '../../miscShared/titleBar/ListTitleBar';
import AddChildGroupOverlay from './AddChildGroupOverlay';

interface Props {
    user: IUser;
    currentList: TgiftGroupFields;
    currentListUser: IgiftGroupMember;
}

export const GiftGroupContainer: React.FC<Props> = ({ user, currentList, currentListUser }) => {
    const [addListOverlayStatus, setAddListOverlayStatus] = useState(false);

    // could later refactor to be a var stored on the parent group, allow group owner to set.
    const maxChildListsPerUser = 5;

    const userCanCreateMoreLists = (): boolean => {
        let existingChildListsOwnerByUser = countExistingChildListsOwnerByUser();
        return existingChildListsOwnerByUser >= maxChildListsPerUser ? false : true;
    };

    let countExistingChildListsOwnerByUser = (): number => {
        return currentList.children.reduce((acc, curr) => {
            const foundUser = findUserInGroup(curr, user._id);
            if (foundUser?.permissions.includes('GROUP_OWNER')) {
                acc += 1;
            }
            return acc;
        }, 0);
    };

    return (
        <Fragment>
            {addListOverlayStatus && (
                <AddChildGroupOverlay
                    setOpen={setAddListOverlayStatus}
                    currentList={currentList}
                ></AddChildGroupOverlay>
            )}
            <ListTitleBar currentList={currentList}></ListTitleBar>
            <div className='parentListContentContainer'>
                <div className='parentListAddListButton'>
                    {currentListUser.permissions.includes('CHILD_GROUP_CREATE') && userCanCreateMoreLists() && (
                        <span className='btn-simple' onClick={() => setAddListOverlayStatus(true)}>
                            <i className='fas fa-plus'></i> Add your list
                        </span>
                    )}
                </div>
                <div className={'dashboardListContainer'}>
                    {currentList.children.map((list) => {
                        return <GiftListPreviewCard key={list._id} list={list}></GiftListPreviewCard>;
                    })}
                </div>
            </div>
        </Fragment>
    );
};

const mapStateToProps = (state: IrootStateAuthedGiftGroupLoaded) => ({
    user: state.authReducer.user,
    currentList: state.listGroupReducer.currentList,
    currentListUser: state.listGroupReducer.currentListUser,
});

export default connect(mapStateToProps, { addAlertThunkActionCreator })(GiftGroupContainer);
