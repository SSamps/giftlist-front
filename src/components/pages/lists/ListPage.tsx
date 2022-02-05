import { Fragment } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IrootState } from '../../../redux/reducers/root/rootReducer';
import Spinner from '../../misc/spinner';
import ListLoader from './ListLoader';

interface Props {
    authLoading: boolean;
}

const ListPage: React.FC<Props> = ({ authLoading }): JSX.Element => {
    const params = useParams();
    const listid = params.listid;

    return (
        <Fragment>
            {authLoading ? (
                <Spinner className='spinner-tiny'></Spinner>
            ) : (
                <Fragment>
                    <ListLoader listid={listid as string}></ListLoader>
                </Fragment>
            )}
        </Fragment>
    );
};

const mapStateToProps = (state: IrootState) => ({
    authLoading: state.authReducer.loading,
});

export default connect(mapStateToProps)(ListPage);
