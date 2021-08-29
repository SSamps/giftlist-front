import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { IrootStateAuthedBasicListLoaded } from '../../../../../redux/reducers/root/rootReducer';
import { IbasicListMember, TbasicListFields } from '../../../../../types/models/listGroups';
import ListTitleBar from '../../miscShared/titleBar/ListTitleBar';
import NewListItem from '../../listItems/NewListItem';
import ListItem from '../../listItems/ListItem';
import { IUser } from '../../../../../types/models/User';
import BasicListDeleteItems from './BasicListDeleteItems';
import EmptyListItem from '../../listItems/EmptyListItem';

interface Props {
    currentList: TbasicListFields;
    user: IUser;
    currentListUser: IbasicListMember;
}

const BasicListContainer: React.FC<Props> = ({ currentList, currentListUser }) => {
    return (
        <Fragment>
            <div className={'listContainer'}>
                <ListTitleBar currentList={currentList}></ListTitleBar>
                <div>
                    <pre> </pre>
                </div>
                <div className='listSectionContentContainer'>
                    {currentList.listItems.length > 0 ? (
                        currentList.listItems.map((item) => {
                            return (
                                <ListItem
                                    key={item._id}
                                    listItem={item}
                                    allowSelection={currentListUser.permissions.includes('GROUP_SELECT_LIST_ITEMS')}
                                    allowModification={currentListUser.permissions.includes('GROUP_RW_LIST_ITEMS')}
                                    allowDeletion={currentListUser.permissions.includes('GROUP_RW_LIST_ITEMS')}
                                ></ListItem>
                            );
                        })
                    ) : (
                        <EmptyListItem description={`No items have been added yet`}></EmptyListItem>
                    )}
                </div>
                <div className='listNewItemContainer'>
                    {currentList.listItems.length < currentList.maxListItems && (
                        <NewListItem itemType='listItem' groupId={currentList._id}></NewListItem>
                    )}
                </div>
                <BasicListDeleteItems currentList={currentList}></BasicListDeleteItems>
            </div>
        </Fragment>
    );
};

const mapStateToProps = (state: IrootStateAuthedBasicListLoaded) => ({
    user: state.authReducer.user,
    currentList: state.listGroupReducer.currentList,
    currentListUser: state.listGroupReducer.currentListUser,
});

export default connect(mapStateToProps, {})(BasicListContainer);
