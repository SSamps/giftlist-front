import React from 'react';
import { connect } from 'react-redux';
import { IrootStateAuthedCurrentListLoaded } from '../../../../../redux/reducers/root/rootReducer';
import { TYPE_PERM_ALL_LIST_GROUP } from '../../../../../types/listGroupPermissions';
import { TgiftListFields } from '../../../../../types/models/listGroups';
import { IUser } from '../../../../../types/models/User';
import ListItem from '../../listItems/ListItem';
import NewListItem from '../../listItems/NewListItem';

interface Props {
    currentList: TgiftListFields;
    user: IUser;
    currentListPermissions: TYPE_PERM_ALL_LIST_GROUP[];
    ownerName: string;
}

const GiftListSecretList: React.FC<Props> = ({ currentList, currentListPermissions, user, ownerName }) => {
    const renderSecretItemVisibilityMessage = () => {
        return (
            <div className='giftListVisibilityMessage systemMessage'>
                <i className='fas fa-eye-slash danger'></i>{' '}
                <span>
                    {ownerName} <strong>can't</strong> see added gift ideas
                </span>
            </div>
        );
    };

    const renderGuestList = () => {
        return (
            currentListPermissions.includes('GROUP_RW_SECRET_LIST_ITEMS') && (
                <div className='basicListItemContainer'>
                    <div className='giftListListLabel systemMessage'>Gift ideas</div>
                    {currentList.secretListItems.map((item) => {
                        return (
                            <ListItem
                                key={item._id}
                                listItem={item}
                                allowSelection={currentListPermissions.includes('GROUP_SELECT_SECRET_LIST_ITEMS')}
                                allowModification={
                                    currentListPermissions.includes('GROUP_RW_SECRET_LIST_ITEMS') &&
                                    item.authorId === user._id
                                }
                                allowDeletion={
                                    currentListPermissions.includes('GROUP_RW_SECRET_LIST_ITEMS') &&
                                    item.authorId === user._id
                                }
                            ></ListItem>
                        );
                    })}
                </div>
            )
        );
    };

    const numAuthoredSecretItems = () => {
        return currentList.secretListItems.reduce((total, item) => {
            if (item.authorId === user._id) {
                return total + 1;
            } else {
                return total;
            }
        }, 0);
    };

    const renderNewSecretListItem = () => {
        return (
            currentListPermissions.includes('GROUP_RW_SECRET_LIST_ITEMS') &&
            numAuthoredSecretItems() < currentList.maxSecretListItemsEach && (
                <NewListItem itemType='secretListItem' groupId={currentList._id}></NewListItem>
            )
        );
    };

    return (
        <div className='giftListSecretItemsContainer'>
            {renderSecretItemVisibilityMessage()}
            {renderGuestList()}
            {renderNewSecretListItem()}
        </div>
    );
};

const mapStateToProps = (state: IrootStateAuthedCurrentListLoaded) => ({
    user: state.authReducer.user,
    currentList: state.listGroupReducer.currentList,
    currentListPermissions: state.listGroupReducer.currentListPermissions,
});

export default connect(mapStateToProps)(GiftListSecretList);
