import { Fragment } from 'react';
import { Navigate, RouteProps } from 'react-router-dom';
import { useAuth } from '../../state/AuthState';

type TprotectedRouteProps = {
    component: React.ComponentType<any>;
} & RouteProps;

const VerifiedRoute: React.FC<TprotectedRouteProps> = ({ component: Component, ...routeProps }) => {
    const { user, userLoading: loading } = useAuth();

    if (loading) {
        return <Fragment></Fragment>;
    } else if (!user) {
        return <Navigate to='/login'></Navigate>;
    } else if (!user.verified) {
        return <Navigate to='/dashboard'></Navigate>;
    } else {
        return <Component {...routeProps} />;
    }
};

export default VerifiedRoute;
