import { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
    acceptInviteActionCreator,
    clearInviteActionCreator,
    convertInviteTokenErrorActionCreator,
    resetInviteErrorActionCreator,
    TacceptInviteActionCreator,
    TclearInviteActionCreator,
    TconvertInviteTokenErrorActionCreator,
    TresetInviteErrorActionCreator,
} from '../../redux/actions/inviteActions';
import { IrootState } from '../../redux/reducers/root/rootReducer';
import { IUser } from '../../types/models/User';
import ErrorMessage from '../misc/ErrorMessage';
import VerifyNotification from './VerifyNotification';
import YourLists from './yourLists/YourLists';

interface Props {
    user: IUser | null;
    authLoading: boolean;
    invitePending: undefined | { inviteToken: string; groupName: string };
    inviteError: undefined | string;
    inviteAccepted: undefined | string;
    inviteTokenError: undefined | string;
    acceptInviteActionCreator: TacceptInviteActionCreator;
    resetInviteErrorActionCreator: TresetInviteErrorActionCreator;
    convertInviteTokenErrorActionCreator: TconvertInviteTokenErrorActionCreator;
    clearInviteActionCreator: TclearInviteActionCreator;
}

const Dashboard: React.FC<Props> = ({
    user,
    authLoading,
    invitePending,
    inviteError,
    inviteAccepted,
    inviteTokenError,
    resetInviteErrorActionCreator,
    acceptInviteActionCreator,
    convertInviteTokenErrorActionCreator,
    clearInviteActionCreator,
}): JSX.Element => {
    const history = useHistory();

    useEffect(() => {
        if (inviteError) {
            resetInviteErrorActionCreator();
        }
        if (inviteTokenError) {
            convertInviteTokenErrorActionCreator();
        }
        if (invitePending) {
            acceptInviteActionCreator(invitePending.inviteToken, invitePending.groupName);
        } else if (inviteAccepted) {
            history.push(`/list/${inviteAccepted}`);
            clearInviteActionCreator();
        }
    }, [inviteAccepted]);

    return (
        <Fragment>
            {authLoading ? (
                <div>Loading</div>
            ) : user && user.verified ? (
                <Fragment>
                    {inviteError && <ErrorMessage>{inviteError}</ErrorMessage>}
                    <YourLists></YourLists>
                </Fragment>
            ) : (
                <Fragment>
                    {inviteError && <ErrorMessage>{inviteError}</ErrorMessage>}
                    <VerifyNotification></VerifyNotification>
                </Fragment>
            )}
        </Fragment>
    );
};

const mapStateToProps = (state: IrootState) => ({
    user: state.authReducer.user,
    authLoading: state.authReducer.loading,
    invitePending: state.pendingInviteReducer.invitePending,
    inviteError: state.pendingInviteReducer.inviteError,
    inviteTokenError: state.pendingInviteReducer.inviteTokenError,
    inviteAccepted: state.pendingInviteReducer.inviteAccepted,
});

export default connect(mapStateToProps, {
    resetInviteErrorActionCreator,
    acceptInviteActionCreator,
    convertInviteTokenErrorActionCreator,
    clearInviteActionCreator,
})(Dashboard);
