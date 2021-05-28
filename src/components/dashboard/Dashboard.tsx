import { Fragment } from 'react';
import { connect } from 'react-redux';
import { IrootState } from '../../redux/reducers/root/rootReducer';
import { IUser } from '../../types/models/User';
import TestData from './testData/TestData';

interface Props {
    user: IUser | null;
    authLoading: boolean;
}

const Dashboard: React.FC<Props> = ({ user, authLoading }): JSX.Element => {
    return (
        <Fragment>
            {authLoading ? (
                <div>Loading</div>
            ) : (
                user && (
                    <Fragment>
                        <div>Hello {user.displayName}</div>
                        <h2>TestData:</h2>
                        <TestData></TestData>
                    </Fragment>
                )
            )}
        </Fragment>
    );
};

const mapStateToProps = (state: IrootState) => ({
    user: state.authReducer.user,
    authLoading: state.authReducer.loading,
});

export default connect(mapStateToProps)(Dashboard);
