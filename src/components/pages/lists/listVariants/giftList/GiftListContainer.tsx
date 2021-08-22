import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { IrootStateAuthedCurrentListLoaded } from '../../../../../redux/reducers/root/rootReducer';
import { TYPE_PERM_ALL_LIST_GROUP } from '../../../../../types/listGroupPermissions';
import { IgiftListMember, TgiftListFields } from '../../../../../types/models/listGroups';
import ListTitleBar from '../../miscShared/titleBar/ListTitleBar';
import GiftListChat from './GiftListChat';
import GiftListOwnerList from './GiftListOwnerList';
import GiftListSecretList from './GiftListSecretList';

interface Props {
    currentList: TgiftListFields;
    currentListPermissions: TYPE_PERM_ALL_LIST_GROUP[];
}

export const GiftListContainer: React.FC<Props> = ({ currentList, currentListPermissions }) => {
    const ownerName = (
        currentList.members.find((member) => member.permissions.includes('GROUP_OWNER')) as IgiftListMember
    ).displayName;

    const currentUserIsOwner = currentListPermissions.includes('GROUP_OWNER');

    return (
        <Fragment>
            {currentList && currentListPermissions && (
                <div className={'listContainer'}>
                    <ListTitleBar currentList={currentList}></ListTitleBar>
                    <GiftListOwnerList
                        ownerName={ownerName}
                        currentUserIsOwner={currentUserIsOwner}
                    ></GiftListOwnerList>
                    {!currentUserIsOwner && (
                        <Fragment>
                            <GiftListSecretList ownerName={ownerName}></GiftListSecretList>
                            <GiftListChat ownerName={ownerName}></GiftListChat>
                        </Fragment>
                    )}
                </div>
            )}
        </Fragment>
    );
};

const mapStateToProps = (state: IrootStateAuthedCurrentListLoaded) => ({
    currentList: state.listGroupReducer.currentList,
    currentListPermissions: state.listGroupReducer.currentListPermissions,
});

export default connect(mapStateToProps)(GiftListContainer);
