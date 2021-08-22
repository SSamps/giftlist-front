import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { IrootStateAuthedCurrentListLoaded } from '../../../../../redux/reducers/root/rootReducer';
import { TbasicListFields } from '../../../../../types/models/listGroups';

import ListTitleBar from '../../miscShared/titleBar/ListTitleBar';
import NewListItem from '../../listItems/NewListItem';
import ListItem from '../../listItems/ListItem';
import { IUser } from '../../../../../types/models/User';
import BasicListDeleteItems from './BasicListDeleteItems';
import { TYPE_PERM_ALL_LIST_GROUP } from '../../../../../types/listGroupPermissions';

interface Props {
    currentList: TbasicListFields;
    user: IUser;
    currentListPermissions: TYPE_PERM_ALL_LIST_GROUP[];
}

const BasicListContainer: React.FC<Props> = ({ currentList, currentListPermissions }) => {
    return (
        <Fragment>
            <div className={'listContainer'}>
                <ListTitleBar currentList={currentList}></ListTitleBar>
                <div className='listSectionContentContainer'>
                    {currentList.listItems.map((item) => {
                        return (
                            <ListItem
                                key={item._id}
                                listItem={item}
                                allowSelection={currentListPermissions.includes('GROUP_SELECT_LIST_ITEMS')}
                                allowModification={currentListPermissions.includes('GROUP_RW_LIST_ITEMS')}
                                allowDeletion={currentListPermissions.includes('GROUP_RW_LIST_ITEMS')}
                            ></ListItem>
                        );
                    })}
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

const mapStateToProps = (state: IrootStateAuthedCurrentListLoaded) => ({
    user: state.authReducer.user,
    currentList: state.listGroupReducer.currentList,
    currentListPermissions: state.listGroupReducer.currentListPermissions,
});

export default connect(mapStateToProps, {})(BasicListContainer);
