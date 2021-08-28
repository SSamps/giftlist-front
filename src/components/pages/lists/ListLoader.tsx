import { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import {
    resetListActionCreator,
    getListActionCreator,
    TgetListActionCreator,
    TresetListActionCreator,
    loadListUserActionCreator,
    TloadListUserActionCreator,
} from '../../../redux/actions/listGroupActions';
import { IlistGroupData } from '../../../redux/reducers/listGroupReducer';
import { IrootStateAuthed } from '../../../redux/reducers/root/rootReducer';
import {
    BASIC_LIST,
    GIFT_GROUP,
    GIFT_GROUP_CHILD,
    GIFT_LIST,
    LIST_GROUP_PARENT_VARIANTS,
} from '../../../types/listVariants';
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
    loadListUserActionCreator: TloadListUserActionCreator;
}

const ListLoader: React.FC<Props> = ({
    listid,
    listLoading,
    currentList,
    getListActionCreator,
    resetListActionCreator,
    loadListUserActionCreator,
    currentListUser,
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
            loadListUserActionCreator(currentList, user._id);
        };
        loadPermissions();
    }, [currentList]);

    function listSwitch(currentList: TListGroupAnyFields) {
        switch (currentList.groupVariant) {
            case BASIC_LIST: {
                return <BasicListContainer key={currentList._id}></BasicListContainer>;
            }
            case GIFT_LIST: {
                return <GiftListContainer key={currentList._id}></GiftListContainer>;
            }
            case GIFT_GROUP_CHILD: {
                return (
                    <GiftGroupChildContainer
                        key={currentList._id}
                        giftGroupChild={currentList}
                    ></GiftGroupChildContainer>
                );
            }
        }
    }

    function parentListSwitch(currentList: TListGroupAnyFields) {
        switch (currentList.groupVariant) {
            case GIFT_GROUP: {
                return <GiftGroupContainer key={currentList._id}></GiftGroupContainer>;
            }
        }
    }

    const renderList = () => {
        return (
            currentList &&
            currentListUser && (
                <Fragment>
                    {LIST_GROUP_PARENT_VARIANTS.includes(currentList.groupVariant)
                        ? parentListSwitch(currentList)
                        : listSwitch(currentList)}
                </Fragment>
            )
        );
    };

    return <Fragment>{listLoading ? <Spinner className='spinner-tiny'></Spinner> : renderList()}</Fragment>;
};

const mapStateToProps = (state: IrootStateAuthed) => ({
    user: state.authReducer.user,
    listLoading: state.listGroupReducer.listLoading,
    currentList: state.listGroupReducer.currentList,
    currentListUser: state.listGroupReducer.currentListUser,
});

export default connect(mapStateToProps, {
    getListActionCreator,
    resetListActionCreator,
    loadListUserActionCreator: loadListUserActionCreator,
})(ListLoader);
