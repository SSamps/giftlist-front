import { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getListActionCreator, TgetListActionCreator } from '../../redux/actions/listActions';
import { IrootState } from '../../redux/reducers/root/rootReducer';
import Spinner from '../misc/spinner';

interface Props {
    listid: string;
    listsLoading: boolean;
    currentList: null | { _id: string };
    getListActionCreator: TgetListActionCreator;
}

/* Verify if the user is a member or a owner of the group
    If not show an unauthorised message
    If so render a component of the appropriate type
*/

const List: React.FC<Props> = ({ listid, listsLoading, currentList, getListActionCreator }): JSX.Element => {
    // @ts-ignore
    useEffect(async () => {
        getListActionCreator(listid);
    }, [listid]);

    return (
        <Fragment>
            {listsLoading ? (
                <Spinner className='spinner-tiny'></Spinner>
            ) : (
                <div>
                    <div>I am a list with id {currentList?._id}</div>
                    {/* <div>${data}</div> */}
                </div>
            )}
        </Fragment>
    );
};

const mapStateToProps = (state: IrootState) => ({
    user: state.authReducer.user,
    currentList: state.listGroupReducer.currentList,
    listsLoading: state.listGroupReducer.loadingCurrentList,
});

export default connect(mapStateToProps, { getListActionCreator })(List);
