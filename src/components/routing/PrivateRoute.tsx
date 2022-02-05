import { Fragment } from 'react';
import { connect } from 'react-redux';
import { Navigate, RouteProps } from 'react-router-dom';
import { IrootState } from '../../redux/reducers/root/rootReducer';

type TprotectedRouteProps = {
    isAuthenticated: boolean | null;
    loading: boolean;
    component: React.ComponentType<any>;
} & RouteProps;

const PrivateRoute: React.FC<TprotectedRouteProps> = ({
    component: Component,
    isAuthenticated,
    loading,
    ...routeProps
}) => {
    if (loading) {
        return <Fragment></Fragment>;
    } else if (!loading && !isAuthenticated) {
        return <Navigate to='/login'></Navigate>;
    }
    return <Component {...routeProps} />;
};

const mapStateToProps = (state: IrootState) => ({
    isAuthenticated: state.authReducer.isAuthenticated,
    loading: state.authReducer.loading,
});

export default connect(mapStateToProps)(PrivateRoute);
