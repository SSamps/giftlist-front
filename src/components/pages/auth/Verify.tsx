import Spinner from '../../misc/spinner';
import validator from 'validator';
import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { loadUserActionCreator } from '../../../redux/actions/authActions';
import store from '../../../redux/reducers/root/reducerStore';

interface Props {
    match: {
        params: { token: string };
    };
}

const Verify: React.FC<Props> = ({
    match: {
        params: { token },
    },
}) => {
    const [verifyError, setVerifyError] = useState<undefined | string>(undefined);
    const history = useHistory();

    useEffect(() => {
        tryVerify();
    }, []);

    const tryVerify = async () => {
        try {
            await axios.post(`/api/users/verify/${token}`);
            await loadUserActionCreator(store.dispatch);
            history.push(`/dashboard`);
        } catch (err) {
            setVerifyError('Error: ' + err.response.status + ' ' + err.response.statusText);
        }
    };

    return (
        <Fragment>
            <div className='verifyContainer'>
                {!validator.isJWT(token) ? (
                    <div className='form-error-message'>Invalid token</div>
                ) : verifyError ? (
                    <div className='form-error-message'>{verifyError}</div>
                ) : (
                    <Spinner className='spinner-large'></Spinner>
                )}
            </div>
        </Fragment>
    );
};

export default Verify;
