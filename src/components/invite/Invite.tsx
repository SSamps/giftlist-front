import Spinner from '../misc/spinner';
import validator from 'validator';
import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

interface Props {
    match: {
        params: { token: string };
    };
}

const Invite: React.FC<Props> = ({
    match: {
        params: { token },
    },
}) => {
    const [inviteError, setInviteError] = useState<undefined | string>(undefined);
    const history = useHistory();

    useEffect(() => {
        tryVerify();
    }, []);

    const tryVerify = async () => {
        try {
            await axios.post(`/api/groups/invite/accept/${token}`);
            history.push(`/test}`);
        } catch (err) {
            setInviteError('Error: ' + err.response.status + ' ' + err.response.statusText);
        }
    };

    return (
        <Fragment>
            <div className='verifyContainer'>
                {!validator.isJWT(token) ? (
                    <div className='form-error-message'>Invalid invite token</div>
                ) : inviteError ? (
                    <div className='form-error-message'>{inviteError}</div>
                ) : (
                    <Spinner className='spinner-large'></Spinner>
                )}
            </div>
        </Fragment>
    );
};

export default Invite;
