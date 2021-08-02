import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { IrootStateAuthed } from '../../../../redux/reducers/root/rootReducer';
import { TbasicListFields } from '../../../../types/models/listGroups';

import ListTitleBar from '../../miscShared/ListTitleBar';
import NewListItem from '../../listItems/NewListItem';
import ListItem from '../../listItems/ListItem';
import { IUser } from '../../../../types/models/User';

interface Props {
    currentList: TbasicListFields | undefined;
    user: IUser;
}

const BasicListContainer: React.FC<Props> = ({ currentList, user }) => {
    return (
        <Fragment>
            {currentList && (
                <div className={'BasicListContainer'}>
                    <ListTitleBar currentList={currentList}></ListTitleBar>
                    <div className='basicListItemContainer'>
                        {currentList.listItems.map((item) => {
                            return (
                                <ListItem
                                    key={item._id}
                                    listItem={item}
                                    listId={currentList._id}
                                    userId={user._id}
                                    allowSelection={true}
                                ></ListItem>
                            );
                        })}
                    </div>
                    <div className='basicListNewItemContainer'>
                        {currentList.listItems.length < currentList.maxListItems && (
                            <NewListItem itemType='listItem' groupId={currentList._id}></NewListItem>
                        )}
                    </div>
                </div>
            )}
        </Fragment>
    );
};

const mapStateToProps = (state: IrootStateAuthed) => ({
    user: state.authReducer.user,
    currentList: state.listGroupReducer.currentList,
});

export default connect(mapStateToProps, {})(BasicListContainer);
