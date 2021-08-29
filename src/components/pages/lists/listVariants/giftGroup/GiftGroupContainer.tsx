import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { addAlertThunkActionCreator } from '../../../../../redux/actions/alertActions';
import { IrootStateAuthedGiftGroupLoaded } from '../../../../../redux/reducers/root/rootReducer';
import { IgiftGroupMember, TgiftGroupFields } from '../../../../../types/models/listGroups';
import { IUser } from '../../../../../types/models/User';
import { findUserInGroup } from '../../../../../utils/helperFunctions';
import GiftListPreviewCard from '../../../dashboard/yourLists/previewCards/GiftListPreviewCard';
import ListTitleBar from '../../miscShared/titleBar/ListTitleBar';
import AddChildGroupOverlay from './AddChildGroupOverlay';

interface Props {
    user: IUser;
    currentList: TgiftGroupFields;
    currentListUser: IgiftGroupMember;
}

export const GiftGroupContainer: React.FC<Props> = ({ user, currentList, currentListUser }) => {
    const [addListOverlayStatus, setAddListOverlayStatus] = useState(false);

    const userOwnsChild = () => {
        for (let i = 0; i < currentList.children.length; i++) {
            const foundUser = findUserInGroup(currentList.children[i], user._id);
            if (foundUser?.permissions.includes('GROUP_OWNER')) {
                return true;
            }
        }
        return false;
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
                    {currentListUser.permissions.includes('CHILD_GROUP_CREATE') && !userOwnsChild() && (
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
