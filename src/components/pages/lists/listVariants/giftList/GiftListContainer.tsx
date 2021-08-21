import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { IrootStateAuthedCurrentListLoaded } from '../../../../../redux/reducers/root/rootReducer';
import { TYPE_PERM_ALL_LIST_GROUP } from '../../../../../types/listGroupPermissions';
import { IgiftListMember, TgiftListFields } from '../../../../../types/models/listGroups';
import { IUser } from '../../../../../types/models/User';
import ListItem from '../../listItems/ListItem';
import NewListItem from '../../listItems/NewListItem';
import ListTitleBar from '../../miscShared/titleBar/ListTitleBar';

interface Props {
    currentList: TgiftListFields;
    user: IUser;
    currentListPermissions: TYPE_PERM_ALL_LIST_GROUP[];
}

export const GiftListContainer: React.FC<Props> = ({ currentList, currentListPermissions }) => {
    const ownerName = (
        currentList.members.find((member) => member.permissions.includes('GROUP_OWNER')) as IgiftListMember
    ).displayName;

    const currentUserIsOwner = currentListPermissions.includes('GROUP_OWNER');

    const renderSelectionMessage = () => {
        return (
            !currentUserIsOwner && (
                <div className='giftListVisibilityMessage systemMessage'>
                    <i className='fas fa-eye-slash danger'></i>{' '}
                    <span>
                        {ownerName} <strong>can't</strong> see your selection
                    </span>
                </div>
            )
        );
    };

    const renderListLabel = () => {
        return (
            <div className='giftListListLabel systemMessage'>{currentUserIsOwner ? 'Your' : `${ownerName}'s`} list</div>
        );
    };

    const renderOwnerList = () => {
        return (
            <div className='basicListItemContainer'>
                {renderListLabel()}
                {currentList.listItems.map((item) => {
                    return <ListItem key={item._id} listItem={item}></ListItem>;
                })}
            </div>
        );
    };

    const renderNewListItem = () => {
        return (
            currentListPermissions.includes('GROUP_RW_LIST_ITEMS') &&
            currentList.listItems.length < currentList.maxListItems && (
                <NewListItem itemType='listItem' groupId={currentList._id}></NewListItem>
            )
        );
    };

    return (
        <Fragment>
            {currentList && currentListPermissions && (
                <div className={'BasicListContainer'}>
                    <ListTitleBar currentList={currentList}></ListTitleBar>
                    {renderSelectionMessage()}
                    {renderOwnerList()}
                    {renderNewListItem()}
                </div>
            )}
        </Fragment>
    );
};

const mapStateToProps = (state: IrootStateAuthedCurrentListLoaded) => ({
    user: state.authReducer.user,
    currentList: state.listGroupReducer.currentList,
    currentListPermissions: state.listGroupReducer.currentListPermissions,
});

export default connect(mapStateToProps)(GiftListContainer);
