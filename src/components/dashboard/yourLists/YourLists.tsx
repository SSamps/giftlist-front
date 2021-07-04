import { connect } from 'react-redux';
import React, { Fragment, useEffect } from 'react';
import { IUser } from '../../../types/models/User';
import { IrootStateAuthed } from '../../../redux/reducers/root/rootReducer';
import {
    getDashboardListDataActionCreator,
    TgetDashboardListDataActionCreator,
} from '../../../redux/actions/dashboardActions';
import { IlistGroupState } from '../../../redux/reducers/listGroupReducer';
import { ListCard } from './ListCard';
import { DashboardFilter } from './DashboardFilter';

interface Props extends IlistGroupState {
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
    loading: state.listGroupReducer.loading,
    listGroups: state.listGroupReducer.listGroups,
    error: state.listGroupReducer.error,
    user: state.authReducer.user,
});

export default connect(mapStateToProps, { getDashboardListDataActionCreator })(YourLists);
