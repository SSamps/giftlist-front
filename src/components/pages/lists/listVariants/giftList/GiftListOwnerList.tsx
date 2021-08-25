import React from 'react';
import { connect } from 'react-redux';
import { IrootStateAuthedCurrentListLoaded } from '../../../../../redux/reducers/root/rootReducer';
import { TYPE_PERM_ALL_LIST_GROUP } from '../../../../../types/listGroupPermissions';
import { TgiftListFields } from '../../../../../types/models/listGroups';
import { IUser } from '../../../../../types/models/User';
import EmptyListItem from '../../listItems/EmptyListItem';
import ListItem from '../../listItems/ListItem';
import NewListItem from '../../listItems/NewListItem';

interface Props {
    currentList: TgiftListFields;
    user: IUser;
    currentListPermissions: TYPE_PERM_ALL_LIST_GROUP[];
    ownerName: string;
    currentUserIsOwner: boolean;
}

const GiftListOwnerList: React.FC<Props> = ({ currentList, currentListPermissions, ownerName, currentUserIsOwner }) => {
    const renderSelectionVisibilityMessage = () => {
        return !currentUserIsOwner && currentList.listItems.length > 0 ? (
            <div className='systemMessage'>
                <i className='fas fa-eye-slash danger'></i>{' '}
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
            <div className='giftListListLabel systemMessage'>{currentUserIsOwner ? 'Your' : `${ownerName}'s`} list</div>
        );
    };

    const renderOwnerList = () => {
        return (
            <div className='listSectionContentContainer'>
                {renderListLabel()}
                <div className='listListItemContainer'>
                    {currentList.listItems.length > 0 ? (
                        currentList.listItems.map((item) => {
                            return (
                                <ListItem
                                    key={item._id}
                                    listItem={item}
                                    allowSelection={currentListPermissions.includes('GROUP_SELECT_LIST_ITEMS')}
                                    allowModification={currentListPermissions.includes('GROUP_RW_LIST_ITEMS')}
                                    allowDeletion={currentListPermissions.includes('GROUP_RW_LIST_ITEMS')}
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
            currentListPermissions.includes('GROUP_RW_LIST_ITEMS') &&
            currentList.listItems.length < currentList.maxListItems && (
                <NewListItem itemType='listItem' groupId={currentList._id}></NewListItem>
            )
        );
    };

    return (
        <div className='listSectionContainer'>
            {renderSelectionVisibilityMessage()}
            {renderOwnerList()}
            {renderNewListItem()}
        </div>
    );
};

const mapStateToProps = (state: IrootStateAuthedCurrentListLoaded) => ({
    user: state.authReducer.user,
    currentList: state.listGroupReducer.currentList,
    currentListPermissions: state.listGroupReducer.currentListPermissions,
});

export default connect(mapStateToProps)(GiftListOwnerList);
