import Spinner from '../misc/spinner';
import validator from 'validator';
import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { IrootState } from '../../redux/reducers/root/rootReducer';
import { connect } from 'react-redux';

interface Props {
    match: {
        params: { token: string };
    };
    isAuthenticated: boolean;
    authLoading: boolean;
}

const Invite: React.FC<Props> = ({
    match: {
        params: { token },
    },
    authLoading,
    isAuthenticated,
}) => {
    const [inviteError, setInviteError] = useState<undefined | string>(undefined);
    const history = useHistory();

    useEffect(() => {
        if (!authLoading) {
            if (!isAuthenticated) {
                setPendingInvite();
            } else {
                tryVerify();
            }
        }
    }, [authLoading]);

    const tryVerify = async () => {
        if (!validator.isJWT(token)) {
            setInviteError('Invalid invite token');
            return;
        }
        try {
            const res = await axios.post(`/api/groups/invite/accept/${token}`);
            history.push(`/list/${res.data._id}`);
        } catch (err) {
            setInviteError(err.response.status + err.response.data);
        }
    };

    const setPendingInvite = () => {
        localStorage.setItem('pendingInviteToken', token);
        history.push(`/login`);
    };

    return (
        <Fragment>
            <div className='verifyContainer'>
                {!validator.isJWT(token) ? (
                    <div className='form-error-message'>Invalid invite</div>
                ) : inviteError ? (
                    <div className='form-error-message'>{inviteError}</div>
                ) : (
                    <Spinner className='spinner-large'></Spinner>
                )}
            </div>
        </Fragment>
    );
};

const mapStateToProps = (state: IrootState) => ({
    authLoading: state.authReducer.loading,
    isAuthenticated: state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps)(Invite);
