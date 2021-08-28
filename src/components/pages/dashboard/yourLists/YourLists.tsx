import { connect } from 'react-redux';
import React, { Fragment, useEffect } from 'react';
import { IrootStateAuthed } from '../../../../redux/reducers/root/rootReducer';
import {
    getDashboardListDataActionCreator,
    TgetDashboardListDataActionCreator,
} from '../../../../redux/actions/dashboardActions';
import { IdashboardState } from '../../../../redux/reducers/dashboardReducer';
import { BASIC_LIST, GIFT_GROUP, GIFT_LIST } from '../../../../types/listVariants';
import { GiftListPreviewCard } from './previewCards/GiftListPreviewCard';
import { BasicListPreviewCard } from './previewCards/BasicListPreviewCard';
import { GiftGroupPreviewCard } from './previewCards/GiftGroupPreviewCard';
import { TListGroupAnyFields } from '../../../../types/models/listGroups';
import { IUser } from '../../../../types/models/User';
import { PERM_GROUP_OWNER } from '../../../../types/listGroupPermissions';
import YourListsToolbar from './controlBar/DashboardFilter';

interface Props extends IdashboardState {
    getDashboardListDataActionCreator: TgetDashboardListDataActionCreator;
    user: IUser;
}

export const YourLists: React.FC<Props> = ({
    listGroups,
    user,
    getDashboardListDataActionCreator,
    listOwnershipFilter,
    listVariantFilter,
}) => {
    useEffect(() => {
        getDashboardListDataActionCreator(user._id);
    }, []);

    const applyListFilters = (
        listOwnershipFilter: 'anyone' | 'you' | 'others',
        listVariantFilter: {
            basicListSelected: boolean;
            giftListSelected: boolean;
            giftGroupSelected: boolean;
        }
    ): TListGroupAnyFields[] => {
        let filteredLists = listGroups.filter((list) => {
            const isOwner = list.currentListUser.permissions.includes(PERM_GROUP_OWNER);
            switch (listOwnershipFilter) {
                case 'you': {
                    return isOwner;
                }
                case 'others': {
                    return !isOwner;
                }
                case 'anyone': {
                    return true;
                }
            }
        });

        filteredLists = filteredLists.filter((list) => {
            if (!listVariantFilter.basicListSelected && list.groupVariant === BASIC_LIST) {
                return false;
            } else if (!listVariantFilter.giftListSelected && list.groupVariant === GIFT_LIST) {
                return false;
            } else if (!listVariantFilter.giftGroupSelected && list.groupVariant === GIFT_GROUP) {
                return false;
            } else {
                return true;
            }
        });

        return filteredLists;
    };

    let filteredListGroups = applyListFilters(listOwnershipFilter, listVariantFilter);

    return (
        <Fragment>
            <YourListsToolbar></YourListsToolbar>
            <div className={'dashboardListContainer'}>
                {filteredListGroups.map((group) => {
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
    listOwnershipFilter: state.dashboardReducer.listOwnershipFilter,
    listVariantFilter: state.dashboardReducer.listVariantFilter,
    user: state.authReducer.user,
});

export default connect(mapStateToProps, { getDashboardListDataActionCreator })(YourLists);
