import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { IrootState } from '../../../../../redux/reducers/root/rootReducer';
import { TListGroupAnyFields } from '../../../../../types/models/listGroups';
import { GiftGroupChildPreviewCard } from '../../../dashboard/yourLists/previewCards/GiftGroupChildPreviewCard';

interface Props {
    giftGroup: TListGroupAnyFields;
}

export const GiftGroupContainer: React.FC<Props> = ({ giftGroup }) => {
    return (
        <Fragment>
            <div>
                <div>I am a gift group with id {giftGroup?._id}</div>
                <div className={'dashboardListContainer'}>
                    {giftGroup.children?.map((group) => {
                        return <GiftGroupChildPreviewCard key={group._id} group={group}></GiftGroupChildPreviewCard>;
                    })}
                </div>
            </div>
        </Fragment>
    );
};

const mapStateToProps = (state: IrootState) => ({
    user: state.authReducer.user,
});

export default connect(mapStateToProps)(GiftGroupContainer);
