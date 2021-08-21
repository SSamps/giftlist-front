import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { IrootStateAuthedCurrentListLoaded } from '../../../../../redux/reducers/root/rootReducer';
import { TbasicListFields } from '../../../../../types/models/listGroups';

import ListTitleBar from '../../miscShared/titleBar/ListTitleBar';
import NewListItem from '../../listItems/NewListItem';
import ListItem from '../../listItems/ListItem';
import { IUser } from '../../../../../types/models/User';
import BasicListDeleteItems from './BasicListDeleteItems';

interface Props {
    currentList: TbasicListFields;
    user: IUser;
}

const BasicListContainer: React.FC<Props> = ({ currentList }) => {
    return (
        <Fragment>
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
        </Fragment>
    );
};

const mapStateToProps = (state: IrootStateAuthedCurrentListLoaded) => ({
    user: state.authReducer.user,
    currentList: state.listGroupReducer.currentList,
});

export default connect(mapStateToProps, {})(BasicListContainer);
