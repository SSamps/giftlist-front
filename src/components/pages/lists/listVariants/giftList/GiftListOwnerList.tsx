import React from 'react';
import { connect } from 'react-redux';
import { IrootStateAuthedGiftListLoaded } from '../../../../../redux/reducers/root/rootReducer';
import { IgiftListMember, TgiftListFieldsCensored } from '../../../../../types/models/listGroups';
import { IUser } from '../../../../../types/models/User';
import EmptyListItem from '../../listItems/EmptyListItem';
import ListItem from '../../listItems/ListItem';
import NewListItem from '../../listItems/NewListItem';

interface Props {
    currentList: TgiftListFieldsCensored;
    user: IUser;
    currentListUser: IgiftListMember;
    ownerName: string;
    currentUserIsOwner: boolean;
}

const GiftListOwnerList: React.FC<Props> = ({ currentList, currentListUser, ownerName, currentUserIsOwner }) => {
    const renderSelectionVisibilityMessage = () => {
        return !currentUserIsOwner && currentList.listItems.length > 0 ? (
            <div className='systemMessage'>
                <i className='fas fa-eye-slash'></i>{' '}
                <span>
                    {ownerName} <strong>can't</strong> see your selection
                </span>
            </div>
        ) : (
            <div>
                <pre> </pre>
            </div>
        );
    };

    const renderListLabel = () => {
        return (
            <div className='giftListLabel'>
                <div className='systemMessage'> {currentUserIsOwner ? 'Your' : `${ownerName}'s`} list</div>
                {renderSelectionVisibilityMessage()}
            </div>
        );
    };

    const renderOwnerList = () => {
        return (
            <div className='listSectionContentContainer'>
                {renderListLabel()}
                <div className='listItemContainer'>
                    {currentList.listItems.length > 0 ? (
                        currentList.listItems.map((item) => {
                            return (
                                <ListItem
                                    key={item._id}
                                    listItem={item}
                                    allowSelection={currentListUser.permissions.includes('GROUP_SELECT_LIST_ITEMS')}
                                    allowModification={currentListUser.permissions.includes('GROUP_RW_LIST_ITEMS')}
                                    allowDeletion={currentListUser.permissions.includes('GROUP_RW_LIST_ITEMS')}
                                    longBody={!currentListUser.permissions.includes('GROUP_RW_LIST_ITEMS')}
                                    longLinks={!currentListUser.permissions.includes('GROUP_RW_LIST_ITEMS')}
                                ></ListItem>
                            );
                        })
                    ) : (
                        <EmptyListItem
                            description={`${
                                currentUserIsOwner ? "You haven't" : ownerName + " hasn't"
                            } added any items yet`}
                        ></EmptyListItem>
                    )}
                </div>
            </div>
        );
    };

    const renderNewListItem = () => {
        return (
            currentListUser.permissions.includes('GROUP_RW_LIST_ITEMS') &&
            currentList.listItems.length < currentList.maxListItems && (
                <NewListItem itemType='listItem' groupId={currentList._id}></NewListItem>
            )
        );
    };

    return (
        <div className='listSectionContainer'>
            {renderOwnerList()}
            {renderNewListItem()}
        </div>
    );
};

const mapStateToProps = (state: IrootStateAuthedGiftListLoaded) => ({
    user: state.authReducer.user,
    currentList: state.listGroupReducer.currentList,
    currentListUser: state.listGroupReducer.currentListUser,
});

export default connect(mapStateToProps)(GiftListOwnerList);
