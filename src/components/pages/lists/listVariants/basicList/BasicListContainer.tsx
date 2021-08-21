import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { IrootStateAuthed } from '../../../../../redux/reducers/root/rootReducer';
import { TbasicListFields } from '../../../../../types/models/listGroups';

import ListTitleBar from '../../miscShared/titleBar/ListTitleBar';
import NewListItem from '../../listItems/NewListItem';
import ListItem from '../../listItems/ListItem';
import { IUser } from '../../../../../types/models/User';
import BasicListDeleteItems from './BasicListDeleteItems';
import { TYPE_PERM_ALL_LIST_GROUP } from '../../../../../types/listGroupPermissions';

interface Props {
    currentList: TbasicListFields | undefined;
    user: IUser;
    currentListPermissions: TYPE_PERM_ALL_LIST_GROUP[] | undefined;
}

const BasicListContainer: React.FC<Props> = ({ currentList, currentListPermissions }) => {
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
                    <div className='basicListNewItemContainer'>
                        {currentList.listItems.length < currentList.maxListItems && (
                            <NewListItem itemType='listItem' groupId={currentList._id}></NewListItem>
                        )}
                    </div>
                    <BasicListDeleteItems currentList={currentList}></BasicListDeleteItems>
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

export default connect(mapStateToProps, {})(BasicListContainer);
