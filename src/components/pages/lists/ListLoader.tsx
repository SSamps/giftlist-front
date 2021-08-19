import { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import {
    resetListActionCreator,
    getListActionCreator,
    TgetListActionCreator,
    TresetListActionCreator,
    loadListPermissionsActionCreator,
    TloadListPermissionsActionCreator,
} from '../../../redux/actions/listGroupActions';
import { IlistGroupData } from '../../../redux/reducers/listGroupReducer';
import { IrootStateAuthed } from '../../../redux/reducers/root/rootReducer';
import { BASIC_LIST, GIFT_GROUP, GIFT_GROUP_CHILD, GIFT_LIST } from '../../../types/listVariants';
import { TListGroupAnyFields } from '../../../types/models/listGroups';
import { IUser } from '../../../types/models/User';
import Spinner from '../../misc/spinner';
import BasicListContainer from './listVariants/basicList/BasicListContainer';
import GiftGroupChildContainer from './listVariants/giftGroup/GiftGroupChildContainer';
import GiftGroupContainer from './listVariants/giftGroup/GiftGroupContainer';
import GiftListContainer from './listVariants/giftList/GiftListContainer';

interface Props extends IlistGroupData {
    listid: string;
    user: IUser;
    getListActionCreator: TgetListActionCreator;
    resetListActionCreator: TresetListActionCreator;
    loadListPermissionsActionCreator: TloadListPermissionsActionCreator;
}

const ListLoader: React.FC<Props> = ({
    listid,
    listLoading,
    currentList,
    parentList,
    getListActionCreator,
    resetListActionCreator,
    loadListPermissionsActionCreator,
    user,
}): JSX.Element => {
    useEffect(() => {
        let init = () => {
            resetListActionCreator();
            getListActionCreator(listid);
        };
        init();
    }, [listid]);

    useEffect(() => {
        let loadPermissions = () => {
            loadListPermissionsActionCreator(currentList, user._id);
        };
        loadPermissions();
    }, [currentList, parentList]);

    function listSwitch(group: TListGroupAnyFields) {
        switch (group.groupVariant) {
            case BASIC_LIST: {
                return <BasicListContainer key={group._id}></BasicListContainer>;
            }
            case GIFT_LIST: {
                return <GiftListContainer key={group._id} giftList={group}></GiftListContainer>;
            }
            case GIFT_GROUP_CHILD: {
                return <GiftGroupChildContainer key={group._id} giftGroupChild={group}></GiftGroupChildContainer>;
            }
        }
    }

    function parentListSwitch(group: TListGroupAnyFields) {
        switch (group.groupVariant) {
            case GIFT_GROUP: {
                return <GiftGroupContainer key={group._id} giftGroup={group}></GiftGroupContainer>;
            }
        }
    }

    const renderList = () => {
        return (
            <Fragment>{parentList ? parentListSwitch(parentList) : currentList && listSwitch(currentList)}</Fragment>
        );
    };

    return <Fragment>{listLoading ? <Spinner className='spinner-tiny'></Spinner> : renderList()}</Fragment>;
};

const mapStateToProps = (state: IrootStateAuthed) => ({
    user: state.authReducer.user,
    listLoading: state.listGroupReducer.listLoading,
    currentList: state.listGroupReducer.currentList,
    parentList: state.listGroupReducer.parentList,
    currentListPermissions: state.listGroupReducer.currentListPermissions,
    parentListPermissions: state.listGroupReducer.parentListPermissions,
});

export default connect(mapStateToProps, {
    getListActionCreator,
    resetListActionCreator,
    loadListPermissionsActionCreator,
})(ListLoader);
