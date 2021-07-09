import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IrootState } from '../../redux/reducers/root/rootReducer';
import Spinner from '../misc/spinner';

interface Props {
    listid: string;
}

interface IgroupData {
    groupLoading: boolean;
    group: undefined | { _id: string };
    groupError: undefined | { response: { status: number; data: string } };
}

const List: React.FC<Props> = ({ listid }): JSX.Element => {
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
                // @ts-ignore
                setGroupData({ ...groupData, group: res.data, groupLoading: false });
            } catch (err) {
                setGroupData({ ...groupData, groupError: err, groupLoading: false });
            }
        };
        fetchGroup();
    }, [listid]);

    const { groupLoading, group, groupError } = groupData;

    return (
        <Fragment>
            {groupLoading ? (
                <Spinner className='spinner-tiny'></Spinner>
            ) : groupError ? (
                <div>
                    {groupError.response?.status} {groupError.response?.data}
                </div>
            ) : (
                <div>
                    <div>I am a list with id {group?._id}</div>
                    {console.log(group)}
                </div>
            )}
        </Fragment>
    );
};

const mapStateToProps = (state: IrootState) => ({
    user: state.authReducer.user,
});

export default connect(mapStateToProps)(List);
