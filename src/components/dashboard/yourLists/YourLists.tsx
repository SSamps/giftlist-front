import { connect } from 'react-redux';
import React, { Fragment, useEffect } from 'react';
import { IUser } from '../../../types/models/User';
import { IrootStateAuthed } from '../../../redux/reducers/root/rootReducer';
import {
    getDashboardListDataActionCreator,
    TgetDashboardListDataActionCreator,
} from '../../../redux/actions/dashboardActions';
import { IdashboardState } from '../../../redux/reducers/dashboardReducer';
import { ListCard } from './ListCard';
import { DashboardFilter } from './DashboardFilter';

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
            <DashboardFilter></DashboardFilter>

            <div className={'dashboardListContainer'}>
                {listGroups.map((group) => (
                    <ListCard key={group._id} group={group}></ListCard>
                ))}
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
