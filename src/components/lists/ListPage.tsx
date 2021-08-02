import { Fragment } from 'react';
import { connect } from 'react-redux';
import { IrootState } from '../../redux/reducers/root/rootReducer';
import Spinner from '../misc/spinner';
import ListLoader from './ListLoader';

interface Props {
    authLoading: boolean;
    match: {
        params: { listid: string };
    };
}

const ListPage: React.FC<Props> = ({
    match: {
        params: { listid },
    },
    authLoading,
}): JSX.Element => {
    return (
        <Fragment>
            {authLoading ? (
                <Spinner className='spinner-tiny'></Spinner>
            ) : (
                <Fragment>
                    <ListLoader listid={listid}></ListLoader>
                </Fragment>
            )}
        </Fragment>
    );
};

const mapStateToProps = (state: IrootState) => ({
    authLoading: state.authReducer.loading,
});

export default connect(mapStateToProps)(ListPage);
