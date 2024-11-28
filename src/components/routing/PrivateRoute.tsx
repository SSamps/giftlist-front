import { Fragment } from 'react';
import { Navigate, RouteProps } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

type TprotectedRouteProps = {
    component: React.ComponentType<any>;
} & RouteProps;

const PrivateRoute: React.FC<TprotectedRouteProps> = ({ component: Component, ...routeProps }) => {
    const { user, userLoading: loading } = useAuth();

    if (loading) {
        return <Fragment></Fragment>;
    } else if (!loading && !user) {
        console.log('PrivateRoute: user is not authenticated');
        return <Navigate to='/login'></Navigate>;
    }
    return <Component {...routeProps} />;
};

export default PrivateRoute;
