import axios from 'axios';
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addAlertThunkActionCreator, TaddAlertThunkActionCreator } from '../../../../../redux/actions/alertActions';
import { IrootStateAuthedGiftGroupLoaded } from '../../../../../redux/reducers/root/rootReducer';
import { IgiftGroupMember, TgiftGroupFields } from '../../../../../types/models/listGroups';
import { IUser } from '../../../../../types/models/User';
import { findUserInGroup } from '../../../../../utils/helperFunctions';
import SingleTextFieldOverlay from '../../../../misc/overlays/SingleTextFieldOverlay';
import { GiftGroupChildPreviewCard } from '../../../dashboard/yourLists/previewCards/GiftGroupChildPreviewCard';
import ListTitleBar from '../../miscShared/titleBar/ListTitleBar';

interface Props {
    user: IUser;
    currentList: TgiftGroupFields;
    currentListUser: IgiftGroupMember;
    addAlertThunkActionCreator: TaddAlertThunkActionCreator;
}

export const GiftGroupContainer: React.FC<Props> = ({
    user,
    currentList,
    currentListUser,
    addAlertThunkActionCreator,
}) => {
    const history = useHistory();
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

    const addList = async (newListName: string) => {
        const reqConfig = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const reqBody = JSON.stringify({
            groupVariant: 'GIFT_GROUP_CHILD',
            groupName: newListName,
            parentGroupId: currentList._id,
        });
        try {
            const res = await axios.post('/api/groups', reqBody, reqConfig);
            const newListId = res.data._id;
            history.push(`/list/${newListId}`);
        } catch (err) {
            addAlertThunkActionCreator('error', `${err.response.status} ${err.response.data}`);
        }
    };

    return (
        <Fragment>
            {addListOverlayStatus && (
                <SingleTextFieldOverlay
                    setOpen={setAddListOverlayStatus}
                    submitAction={addList}
                    description='Give your new list a name'
                    placeholder={`${user.displayName}'s list`}
                ></SingleTextFieldOverlay>
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
                    {currentList.children.map((group) => {
                        return <GiftGroupChildPreviewCard key={group._id} group={group}></GiftGroupChildPreviewCard>;
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
