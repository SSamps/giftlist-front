import { Fragment } from 'react';
import { connect } from 'react-redux';
import { IrootState } from '../../redux/reducers/root/rootReducer';
import { IUser } from '../../types/models/User';
import VerifyNotification from './VerifyNotification';
import YourLists from './yourLists/YourLists';

interface Props {
    user: IUser | null;
    authLoading: boolean;
}

const Dashboard: React.FC<Props> = ({ user, authLoading }): JSX.Element => {
    return (
        <Fragment>
            {authLoading ? (
                <div>Loading</div>
            ) : user && user.verified ? (
                <YourLists></YourLists>
            ) : (
                <VerifyNotification></VerifyNotification>
            )}
        </Fragment>
    );
};

const mapStateToProps = (state: IrootState) => ({
    user: state.authReducer.user,
    authLoading: state.authReducer.loading,
});

export default connect(mapStateToProps)(Dashboard);
