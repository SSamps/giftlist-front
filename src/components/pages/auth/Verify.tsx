import Spinner from '../../misc/spinner';
import validator from 'validator';
import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { isAxiosError } from '../../../misc/helperFunctions';
import { useAuth, useUserQuery } from '../../../context/authContext';

const Verify: React.FC = () => {
    const { token } = useParams();
    const [verifyError, setVerifyError] = useState<undefined | string>(undefined);
    const navigate = useNavigate();

    const userQuery = useUserQuery();
    const { setUser } = useAuth();

    useEffect(() => {
        tryVerify();
    }, []);

    const tryVerify = async () => {
        try {
            await axios.post(`/api/users/verify/${token}`);
            const res = await userQuery.refetch();
            if (res.isSuccess) {
                console.log('res.data', JSON.stringify(res.data));
                setUser(res.data);
                navigate(`/dashboard`);
            } else {
                // TODO handle errors
                throw new Error('500 Unknown error: ' + res.data.error);
            }
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
