import { connect } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';
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
    return (
        <Route
            {...routeProps}
            render={(props) =>
                !loading && !isAuthenticated ? <Redirect to='/login'></Redirect> : <Component {...props} />
            }
        />
    );
};

const mapStateToProps = (state: IrootState) => ({
    isAuthenticated: state.authReducer.isAuthenticated,
    loading: state.authReducer.loading,
});

export default connect(mapStateToProps)(PrivateRoute);
