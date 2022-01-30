import { Fragment } from 'react';
import { connect } from 'react-redux';
import { Navigate, RouteProps } from 'react-router-dom';
import { IrootState } from '../../redux/reducers/root/rootReducer';

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
    if (loading) {
        return <Fragment></Fragment>;
    } else if (!isAuthenticated) {
        return <Navigate to='/login'></Navigate>;
    } else if (!isVerified) {
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
