import { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import { IrootState } from '../../../redux/reducers/root/rootReducer';
import { IUser } from '../../../types/models/User';
import ErrorMessage from '../../misc/ErrorMessage';
import VerifyNotification from './VerifyNotification';
import YourLists from './yourLists/YourLists';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import axios from 'axios';
import { isAxiosError } from '../../../misc/helperFunctions';

interface Props {
    user: IUser | null;
    authLoading: boolean;
}

interface AppJwtPayload extends JwtPayload {
    groupName: String;
}

const Dashboard: React.FC<Props> = ({ user, authLoading }): JSX.Element => {
    const navigate = useNavigate();
    const [inviteError, setInviteError] = useState<undefined | string>(undefined);

    useEffect(() => {
        const processPendingInvite = async () => {
            if (user?.verified) {
                const pendingInviteToken = localStorage.getItem('pendingInviteToken');
                if (pendingInviteToken) {
                    if (validator.isJWT(pendingInviteToken)) {
                        const decodedToken = jwtDecode<AppJwtPayload>(pendingInviteToken, {});

                        if (!decodedToken?.groupName) {
                            setInviteError('Invalid invite token');
                            localStorage.removeItem('pendingInviteToken');
                            return;
                        }
                        try {
                            const res = await axios.post(`/api/groups/invite/accept/${pendingInviteToken}`);
                            localStorage.removeItem('pendingInviteToken');
                            navigate(`/list/${res.data._id}`);
                            return;
                        } catch (err) {
                            if (isAxiosError(err)) {
                                setInviteError(
                                    'Error processing invite: ' + err.response!.status + ' ' + err.response!.statusText
                                );
                            } else {
                                setInviteError('Error processing invite: Unknown error');
                            }
                            localStorage.removeItem('pendingInviteToken');
                        }
                    }
                }
            }
        };
        processPendingInvite();
    }, [user?.verified]);

    return (
        <Fragment>
            {authLoading ? (
                <div>Loading</div>
            ) : user && user.verified ? (
                <Fragment>
                    {inviteError && <ErrorMessage errorText={inviteError}></ErrorMessage>}
                    <YourLists></YourLists>
                </Fragment>
            ) : (
                <Fragment>
                    {inviteError && <ErrorMessage errorText={inviteError}></ErrorMessage>}
                    <VerifyNotification></VerifyNotification>
                </Fragment>
            )}
        </Fragment>
    );
};

const mapStateToProps = (state: IrootState) => ({
    user: state.authReducer.user,
    authLoading: state.authReducer.loading,
});

export default connect(mapStateToProps)(Dashboard);
