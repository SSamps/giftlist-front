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
}

const GiftListSecretList: React.FC<Props> = ({ currentList, currentListUser, user, ownerName }) => {
    const renderSecretItemVisibilityMessage = () => {
        return (
            <div className='systemMessage'>
                <i className='fas fa-eye-slash'></i>{' '}
                <span>
                    {ownerName} <strong>can't</strong> see added gift ideas
                </span>
            </div>
        );
    };

    const renderListLabel = () => {
        return (
            <div className='giftListLabel'>
                <div className='systemMessage'>Gift ideas</div>
                {renderSecretItemVisibilityMessage()}
            </div>
        );
    };

    const renderGuestList = () => {
        return (
            currentListUser.permissions.includes('GROUP_RW_SECRET_LIST_ITEMS') && (
                <div className='listSectionContentContainer'>
                    {renderListLabel()}
                    <div className='listItemContainer'>
                        {currentList.secretListItems && currentList.secretListItems.length > 0 ? (
                            currentList.secretListItems.map((item) => {
                                return (
                                    <ListItem
                                        key={item._id}
                                        listItem={item}
                                        allowSelection={currentListUser.permissions.includes(
                                            'GROUP_SELECT_SECRET_LIST_ITEMS'
                                        )}
                                        allowModification={
                                            currentListUser.permissions.includes('GROUP_RW_SECRET_LIST_ITEMS') &&
                                            item.authorId === user._id
                                        }
                                        allowDeletion={
                                            currentListUser.permissions.includes('GROUP_RW_SECRET_LIST_ITEMS') &&
                                            item.authorId === user._id
                                        }
                                    ></ListItem>
                                );
                            })
                        ) : (
                            <EmptyListItem description={`Nobody has suggested any gift ideas`}></EmptyListItem>
                        )}
                    </div>
                </div>
            )
        );
    };

    const numAuthoredSecretItems = () => {
        if (currentList.secretListItems) {
            return currentList.secretListItems.reduce((total, item) => {
                if (item.authorId === user._id) {
                    return total + 1;
                } else {
                    return total;
                }
            }, 0);
        }
        return 0;
    };

    const renderNewSecretListItem = () => {
        return (
            currentListUser.permissions.includes('GROUP_RW_SECRET_LIST_ITEMS') &&
            numAuthoredSecretItems() < currentList.maxSecretListItemsEach && (
                <NewListItem itemType='secretListItem' groupId={currentList._id}></NewListItem>
            )
        );
    };

    return (
        <div className='listSectionContainer'>
            {renderGuestList()}
            {renderNewSecretListItem()}
        </div>
    );
};

const mapStateToProps = (state: IrootStateAuthedGiftListLoaded) => ({
    user: state.authReducer.user,
    currentList: state.listGroupReducer.currentList,
    currentListUser: state.listGroupReducer.currentListUser,
});

export default connect(mapStateToProps)(GiftListSecretList);
