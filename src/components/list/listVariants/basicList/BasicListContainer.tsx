import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { IrootStateAuthed } from '../../../../redux/reducers/root/rootReducer';
import { TbasicListFields } from '../../../../types/models/listGroups';

import BasicListItem from './BasicListItem';
import ListTitleBar from './ListTitleBar';
import NewListItem from './NewListItem';

interface Props {
    currentList: TbasicListFields | undefined;
}

const BasicListContainer: React.FC<Props> = ({ currentList }) => {
    return (
        <Fragment>
            {currentList && (
                <div className={'BasicListContainer'}>
                    <ListTitleBar currentList={currentList}></ListTitleBar>
                    <div className='basicListItemContainer'>
                        {currentList.listItems.map((item) => {
                            return (
                                <BasicListItem
                                    key={item._id}
                                    basicListItem={item}
                                    basicListId={currentList._id}
                                ></BasicListItem>
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
