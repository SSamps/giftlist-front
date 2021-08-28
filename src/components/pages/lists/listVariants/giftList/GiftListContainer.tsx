import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { IgiftListMember, TgiftListFieldsCensored } from '../../../../../types/models/listGroups';
import ListTitleBar from '../../miscShared/titleBar/ListTitleBar';
import GiftListChat from '../../listChat/ListChat';
import GiftListOwnerList from './GiftListOwnerList';
import GiftListSecretList from './GiftListSecretList';
import { IrootStateAuthedGiftListLoaded } from '../../../../../redux/reducers/root/rootReducer';

interface Props {
    currentList: TgiftListFieldsCensored;
    currentListUser: IgiftListMember;
}

export const GiftListContainer: React.FC<Props> = ({ currentList, currentListUser }) => {
    const ownerName = (
        currentList.members.find((member) => member.permissions.includes('GROUP_OWNER')) as IgiftListMember
    ).displayName;

    const currentUserIsOwner = currentListUser.permissions.includes('GROUP_OWNER');

    return (
        <Fragment>
            <div className={'listContainer'}>
                <ListTitleBar currentList={currentList}></ListTitleBar>
                <GiftListOwnerList ownerName={ownerName} currentUserIsOwner={currentUserIsOwner}></GiftListOwnerList>
                {!currentUserIsOwner && (
                    <Fragment>
                        <GiftListSecretList ownerName={ownerName}></GiftListSecretList>
                        <GiftListChat ownerName={ownerName}></GiftListChat>
                    </Fragment>
                )}
            </div>
        </Fragment>
    );
};

const mapStateToProps = (state: IrootStateAuthedGiftListLoaded) => ({
    currentList: state.listGroupReducer.currentList,
    currentListUser: state.listGroupReducer.currentListUser,
});

export default connect(mapStateToProps)(GiftListContainer);
