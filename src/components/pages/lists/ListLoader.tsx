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
import Spinner from '../../misc/spinner';
import BasicListContainer from './listVariants/basicList/BasicListContainer';
import GiftGroupContainer from './listVariants/giftGroup/GiftGroupContainer';
import GiftListContainer from './listVariants/giftList/GiftListContainer';
import { useAuth } from '../../../context/authContext';
import { IUser } from '../../../types/models/User';

interface Props extends IlistGroupData {
    listid: string;
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
}): JSX.Element => {
    const { user: maybeUser } = useAuth();
    const user = maybeUser as IUser; // User will be loaded here

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
                return <BasicListContainer key={currentList._id} user={user}></BasicListContainer>;
            }
            case GIFT_LIST: {
                return <GiftListContainer key={currentList._id} user={user}></GiftListContainer>;
            }
            case GIFT_GROUP_CHILD: {
                return <GiftListContainer key={currentList._id} user={user}></GiftListContainer>;
            }
        }
    }

    function parentListSwitch(currentList: TListGroupAnyFields) {
        switch (currentList.groupVariant) {
            case GIFT_GROUP: {
                return <GiftGroupContainer key={currentList._id} user={user}></GiftGroupContainer>;
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
    listLoading: state.listGroupReducer.listLoading,
    currentList: state.listGroupReducer.currentList,
    currentListUser: state.listGroupReducer.currentListUser,
});

export default connect(mapStateToProps, {
    getListActionCreator,
    resetListActionCreator,
    loadListUserActionCreator: loadListUserActionCreator,
})(ListLoader);
