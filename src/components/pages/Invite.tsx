import Spinner from '../misc/spinner';
import validator from 'validator';
import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { IrootState } from '../../redux/reducers/root/rootReducer';
import { connect } from 'react-redux';
import { isAxiosError } from '../../misc/helperFunctions';

interface Props {
    isAuthenticated: boolean;
    authLoading: boolean;
}

const Invite: React.FC<Props> = ({ authLoading, isAuthenticated }) => {
    const [inviteError, setInviteError] = useState<undefined | string>(undefined);
    const navigate = useNavigate();
    const { token } = useParams();

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
        if (token === undefined || token === '' || !validator.isJWT(token)) {
            setInviteError('Invalid invite token');
            return;
        }
        try {
            const res = await axios.post(`/api/groups/invite/accept/${token}`);
            navigate(`/list/${res.data._id}`);
        } catch (err) {
            if (isAxiosError(err)) {
                setInviteError(`${err.response!.status}: ${err.response!.data}`);
            } else {
                setInviteError(`Unknown error accepting invite`);
            }
        }
    };

    const setPendingInvite = () => {
        localStorage.setItem('pendingInviteToken', token as string);
        navigate(`/login`);
    };

    return (
        <Fragment>
            <div className='verifyContainer'>
                {!validator.isJWT(token as string) ? (
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
