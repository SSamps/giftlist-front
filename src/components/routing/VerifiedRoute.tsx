import { Fragment } from 'react';
import { connect } from 'react-redux';
import { Navigate, RouteProps } from 'react-router-dom';
import { IrootState } from '../../redux/reducers/root/rootReducer';
import { useAuth } from '../../context/authContext';

type TprotectedRouteProps = {
    isAuthenticated: boolean | null;
    loading: boolean;
    isVerified: boolean | undefined;
    component: React.ComponentType<any>;
} & RouteProps;

const VerifiedRoute: React.FC<TprotectedRouteProps> = ({
    component: Component,
    isAuthenticated,
    isVerified,
    loading,
    ...routeProps
}) => {
    const { user } = useAuth();

    if (loading) {
        return <Fragment></Fragment>;
    } else if (!user) {
        console.log('VerifiedRoute: user is not authenticated');
        return <Navigate to='/login'></Navigate>;
    } else if (!user.verified) {
        console.log('VerifiedRoute: user is not verified');
        return <Navigate to='/dashboard'></Navigate>;
    } else {
        return <Component {...routeProps} />;
    }
};

const mapStateToProps = (state: IrootState) => ({
    isAuthenticated: state.authReducer.isAuthenticated,
    isVerified: state.authReducer.user?.verified,
    loading: state.authReducer.loading,
});

export default connect(mapStateToProps)(VerifiedRoute);
