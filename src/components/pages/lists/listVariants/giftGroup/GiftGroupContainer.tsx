import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { IrootStateAuthedGiftGroupLoaded } from '../../../../../redux/reducers/root/rootReducer';
import { TgiftGroupFields } from '../../../../../types/models/listGroups';
import { GiftGroupChildPreviewCard } from '../../../dashboard/yourLists/previewCards/GiftGroupChildPreviewCard';
import ListTitleBar from '../../miscShared/titleBar/ListTitleBar';

interface Props {
    currentList: TgiftGroupFields;
}

export const GiftGroupContainer: React.FC<Props> = ({ currentList }) => {
    return (
        <Fragment>
            <ListTitleBar currentList={currentList}></ListTitleBar>
            <div>I am a gift group with id {currentList._id}</div>
            <div className={'dashboardListContainer'}>
                {currentList.children?.map((group) => {
                    return <GiftGroupChildPreviewCard key={group._id} group={group}></GiftGroupChildPreviewCard>;
                })}
            </div>
        </Fragment>
    );
};

const mapStateToProps = (state: IrootStateAuthedGiftGroupLoaded) => ({
    user: state.authReducer.user,
    currentList: state.listGroupReducer.currentList,
});

export default connect(mapStateToProps)(GiftGroupContainer);
