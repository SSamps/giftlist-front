import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { IrootStateAuthedParentListLoaded } from '../../../../../redux/reducers/root/rootReducer';
import { TListGroupAnyFields } from '../../../../../types/models/listGroups';
import { GiftGroupChildPreviewCard } from '../../../dashboard/yourLists/previewCards/GiftGroupChildPreviewCard';
import ListTitleBar from '../../miscShared/titleBar/ListTitleBar';

interface Props {
    giftGroup: TListGroupAnyFields;
    currentList: TListGroupAnyFields;
}

export const GiftGroupContainer: React.FC<Props> = ({ giftGroup, currentList }) => {
    return (
        <Fragment>
            <ListTitleBar currentList={currentList}></ListTitleBar>
            <div>I am a gift group with id {giftGroup?._id}</div>
            <div className={'dashboardListContainer'}>
                {giftGroup.children?.map((group) => {
                    return <GiftGroupChildPreviewCard key={group._id} group={group}></GiftGroupChildPreviewCard>;
                })}
            </div>
        </Fragment>
    );
};

const mapStateToProps = (state: IrootStateAuthedParentListLoaded) => ({
    user: state.authReducer.user,
    currentList: state.listGroupReducer.currentList,
});

export default connect(mapStateToProps)(GiftGroupContainer);
