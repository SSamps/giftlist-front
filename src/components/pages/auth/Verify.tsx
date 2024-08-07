import Spinner from '../../misc/spinner';
import validator from 'validator';
import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { loadUserActionCreator } from '../../../redux/actions/authActions';
import store from '../../../redux/reducers/root/reducerStore';
import { isAxiosError } from '../../../misc/helperFunctions';

const Verify: React.FC = () => {
    const { token } = useParams();
    const [verifyError, setVerifyError] = useState<undefined | string>(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        tryVerify();
    }, []);

    const tryVerify = async () => {
        try {
            await axios.post(`/api/users/verify/${token}`);
            await loadUserActionCreator(store.dispatch);
            navigate(`/dashboard`);
        } catch (err) {
            if (isAxiosError(err)) {
                setVerifyError('Error: ' + err.response?.status + ' ' + err.response?.statusText);
            } else {
                setVerifyError('Error: ' + `500 Unknown error`);
            }
        }
    };

    return (
        <Fragment>
            <div className='verifyContainer'>
                {!validator.isJWT(token as string) ? (
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
