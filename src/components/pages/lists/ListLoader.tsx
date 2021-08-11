import { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import {
    resetListActionCreator,
    getListActionCreator,
    TgetListActionCreator,
    TresetListActionCreator,
} from '../../../redux/actions/listGroupActions';
import { IlistGroupData } from '../../../redux/reducers/listGroupReducer';
import { IrootStateAuthed } from '../../../redux/reducers/root/rootReducer';
import { BASIC_LIST, GIFT_GROUP, GIFT_GROUP_CHILD, GIFT_LIST } from '../../../types/listVariants';
import { TListGroupAnyFields } from '../../../types/models/listGroups';
import Spinner from '../../misc/spinner';
import BasicListContainer from './listVariants/basicList/BasicListContainer';
import GiftGroupChildContainer from './listVariants/giftGroup/GiftGroupChildContainer';
import GiftGroupContainer from './listVariants/giftGroup/GiftGroupContainer';
import GiftListContainer from './listVariants/giftList/GiftListContainer';

interface Props extends IlistGroupData {
    listid: string;
    getListActionCreator: TgetListActionCreator;
    resetListActionCreator: TresetListActionCreator;
}

const ListLoader: React.FC<Props> = ({
    listid,
    listLoading,
    currentList,
    parentList,
    listError,
    getListActionCreator,
    resetListActionCreator,
}): JSX.Element => {
    useEffect(() => {
        let init = () => {
            resetListActionCreator();
            getListActionCreator(listid);
        };
        init();
    }, [listid]);

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

    return (
        <Fragment>
            {listLoading ? (
                <Spinner className='spinner-tiny'></Spinner>
            ) : listError ? (
                <div>
                    {listError.status} {listError.data}
                </div>
            ) : parentList ? (
                parentListSwitch(parentList)
            ) : (
                currentList && listSwitch(currentList)
            )}
        </Fragment>
    );
};

const mapStateToProps = (state: IrootStateAuthed) => ({
    user: state.authReducer.user,
    listLoading: state.listGroupReducer.listLoading,
    currentList: state.listGroupReducer.currentList,
    parentList: state.listGroupReducer.parentList,
    listError: state.listGroupReducer.listError,
});

export default connect(mapStateToProps, { getListActionCreator, resetListActionCreator: resetListActionCreator })(
    ListLoader
);
