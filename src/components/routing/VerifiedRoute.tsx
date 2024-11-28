import { Fragment } from 'react';
import { Navigate, RouteProps } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

type TprotectedRouteProps = {
    component: React.ComponentType<any>;
} & RouteProps;

const VerifiedRoute: React.FC<TprotectedRouteProps> = ({ component: Component, ...routeProps }) => {
    const { user, userLoading: loading } = useAuth();

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

export default VerifiedRoute;
