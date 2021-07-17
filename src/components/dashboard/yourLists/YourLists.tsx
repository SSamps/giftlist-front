import { connect } from 'react-redux';
import React, { Fragment, useEffect } from 'react';
import { IUser } from '../../../types/models/User';
import { IrootStateAuthed } from '../../../redux/reducers/root/rootReducer';
import {
    getDashboardListDataActionCreator,
    TgetDashboardListDataActionCreator,
} from '../../../redux/actions/dashboardActions';
import { IdashboardState } from '../../../redux/reducers/dashboardReducer';
import { YourListsToolbar } from './DashboardFilter';
import { BASIC_LIST, GIFT_GROUP, GIFT_LIST } from '../../../types/listVariants';
import { GiftListPreviewCard } from './previewCards/GiftListPreviewCard';
import { BasicListPreviewCard } from './previewCards/BasicListPreviewCard';
import { GiftGroupPreviewCard } from './previewCards/GiftGroupPreviewCard';

interface Props extends IdashboardState {
    user: IUser;
    getDashboardListDataActionCreator: TgetDashboardListDataActionCreator;
}

export const YourLists: React.FC<Props> = ({ listGroups, getDashboardListDataActionCreator }: Props) => {
    useEffect(() => {
        getDashboardListDataActionCreator();
    }, []);

    return (
        <Fragment>
            <YourListsToolbar></YourListsToolbar>
            <div className={'dashboardListContainer'}>
                {listGroups.map((group) => {
                    switch (group.groupVariant) {
                        case BASIC_LIST: {
                            return <BasicListPreviewCard key={group._id} group={group}></BasicListPreviewCard>;
                        }
                        case GIFT_LIST: {
                            return <GiftListPreviewCard key={group._id} group={group}></GiftListPreviewCard>;
                        }
                        case GIFT_GROUP: {
                            return <GiftGroupPreviewCard key={group._id} group={group}></GiftGroupPreviewCard>;
                        }
                    }
                })}
            </div>
        </Fragment>
    );
};

const mapStateToProps = (state: IrootStateAuthed) => ({
    loadingDashboard: state.dashboardReducer.loadingDashboard,
    listGroups: state.dashboardReducer.listGroups,
    error: state.dashboardReducer.error,
    user: state.authReducer.user,
});

export default connect(mapStateToProps, { getDashboardListDataActionCreator })(YourLists);
