import { Fragment } from 'react';
import { Navigate, RouteProps } from 'react-router-dom';
import { useAuth } from '../../state/AuthState';

type TprotectedRouteProps = {
    component: React.ComponentType<any>;
} & RouteProps;

const VerifiedRoute: React.FC<TprotectedRouteProps> = ({ component: Component, ...routeProps }) => {
    const { maybeUser, userLoading: loading } = useAuth();

    if (loading) {
        return <Fragment></Fragment>;
    } else if (!maybeUser) {
        return <Navigate to='/login'></Navigate>;
    } else if (!maybeUser.verified) {
        return <Navigate to='/dashboard'></Navigate>;
    } else {
        return <Component {...routeProps} />;
    }
};

export default VerifiedRoute;
