import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { IrootStateAuthed } from '../../../../../redux/reducers/root/rootReducer';
import { TgiftListFields } from '../../../../../types/models/listGroups';
import { IUser } from '../../../../../types/models/User';
import ListItem from '../../listItems/ListItem';
import NewListItem from '../../listItems/NewListItem';
import ListTitleBar from '../../miscShared/titleBar/ListTitleBar';

interface Props {
    currentList: TgiftListFields | undefined;
    user: IUser;
}

export const GiftListContainer: React.FC<Props> = ({ currentList, user }) => {
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

export default connect(mapStateToProps)(GiftListContainer);
