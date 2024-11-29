import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../../misc/spinner';
import ListLoader from './ListLoader';
import { useAuth } from '../../../state/AuthState';

const ListPage: React.FC = (): JSX.Element => {
    const { userLoading } = useAuth();

    const params = useParams();
    const listid = params.listid;

    return (
        <Fragment>
            {userLoading ? (
                <Spinner className='spinner-tiny'></Spinner>
            ) : (
                <Fragment>
                    <ListLoader listid={listid as string}></ListLoader>
                </Fragment>
            )}
        </Fragment>
    );
};

export default ListPage;
