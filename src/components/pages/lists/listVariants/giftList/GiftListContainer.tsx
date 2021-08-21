import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { IrootStateAuthed } from '../../../../../redux/reducers/root/rootReducer';
import { TYPE_PERM_ALL_LIST_GROUP } from '../../../../../types/listGroupPermissions';
import { TgiftListFields } from '../../../../../types/models/listGroups';
import { IUser } from '../../../../../types/models/User';
import ListItem from '../../listItems/ListItem';
import NewListItem from '../../listItems/NewListItem';
import ListTitleBar from '../../miscShared/titleBar/ListTitleBar';

interface Props {
    currentList: TgiftListFields | undefined;
    user: IUser;
    currentListPermissions: TYPE_PERM_ALL_LIST_GROUP[] | undefined;
}

export const GiftListContainer: React.FC<Props> = ({ currentList, currentListPermissions }) => {
    return (
        <Fragment>
            {currentList && currentListPermissions && (
                <div className={'BasicListContainer'}>
                    <ListTitleBar currentList={currentList}></ListTitleBar>
                    <div className='basicListItemContainer'>
                        {currentList.listItems.map((item) => {
                            return <ListItem key={item._id} listItem={item}></ListItem>;
                        })}
                    </div>
                    {currentListPermissions.includes('GROUP_RW_LIST_ITEMS') &&
                        currentList.listItems.length < currentList.maxListItems && (
                            <NewListItem itemType='listItem' groupId={currentList._id}></NewListItem>
                        )}
                </div>
            )}
        </Fragment>
    );
};

const mapStateToProps = (state: IrootStateAuthed) => ({
    user: state.authReducer.user,
    currentList: state.listGroupReducer.currentList,
    currentListPermissions: state.listGroupReducer.currentListPermissions,
});

export default connect(mapStateToProps)(GiftListContainer);
