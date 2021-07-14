import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { IrootStateAuthed } from '../../../../redux/reducers/root/rootReducer';
import { TListGroupAnyFields } from '../../../../types/models/listGroups';

import BasicListItem from './BasicListItem';
import NewListItemField from './NewListItemField';

interface Props {
    currentList: TListGroupAnyFields | undefined;
}

const BasicListContainer: React.FC<Props> = ({ currentList }) => {
    return (
        <Fragment>
            {currentList && (
                <div>
                    <div>{currentList.groupName}</div>
                    <hr></hr>
                    <div>
                        {currentList.listItems.map((item) => {
                            return (
                                <BasicListItem
                                    key={item._id}
                                    basicListItem={item}
                                    basicListId={currentList._id}
                                ></BasicListItem>
                            );
                        })}
                        {currentList.listItems.length < currentList.maxListItems && (
                            <NewListItemField itemType='listItem' groupId={currentList._id}></NewListItemField>
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
