import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IrootState } from '../../redux/reducers/root/rootReducer';
import { BASIC_LIST, GIFT_GROUP, GIFT_GROUP_CHILD, GIFT_LIST } from '../../types/listVariants';
import { TListGroupAnyFields } from '../../types/models/listGroups';
import Spinner from '../misc/spinner';
import { BasicListContainer } from './listVariants/BasicListContainer';
import GiftGroupChildContainer from './listVariants/GiftGroupChildContainer';
import GiftGroupContainer from './listVariants/GiftGroupContainer';
import GiftListContainer from './listVariants/GiftListContainer';

interface Props {
    listid: string;
}

interface IgroupData {
    groupLoading: boolean;
    group: undefined | TListGroupAnyFields;
    groupError: undefined | { response: { status: number; data: string } };
}

const ListLoader: React.FC<Props> = ({ listid }): JSX.Element => {
    const [groupData, setGroupData] = useState<IgroupData>({
        groupLoading: true,
        group: undefined,
        groupError: undefined,
    });

    useEffect(() => {
        const fetchGroup = async () => {
            try {
                setGroupData({ ...groupData, groupLoading: true });
                const res = await axios.get(`/api/groups/${listid}`);
                setGroupData({ ...groupData, group: res.data, groupLoading: false });
            } catch (err) {
                setGroupData({ ...groupData, groupError: err, groupLoading: false });
            }
        };
        fetchGroup();
    }, [listid]);

    const { groupLoading, group, groupError } = groupData;

    function listSwitch(group: TListGroupAnyFields) {
        switch (group.groupVariant) {
            case BASIC_LIST: {
                return <BasicListContainer key={group._id} basicList={group}></BasicListContainer>;
            }
            case GIFT_LIST: {
                return <GiftListContainer key={group._id} giftList={group}></GiftListContainer>;
            }
            case GIFT_GROUP: {
                return <GiftGroupContainer key={group._id} giftGroup={group}></GiftGroupContainer>;
            }
            case GIFT_GROUP_CHILD: {
                return <GiftGroupChildContainer key={group._id} giftGroupChild={group}></GiftGroupChildContainer>;
            }
        }
    }

    return (
        <Fragment>
            {groupLoading ? (
                <Spinner className='spinner-tiny'></Spinner>
            ) : groupError ? (
                <div>
                    {groupError.response?.status} {groupError.response?.data}
                </div>
            ) : (
                group && listSwitch(group)
            )}
        </Fragment>
    );
};

const mapStateToProps = (state: IrootState) => ({
    user: state.authReducer.user,
});

export default connect(mapStateToProps)(ListLoader);
