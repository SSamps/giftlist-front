import { connect } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';
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
    return (
        <Route
            {...routeProps}
            render={(props) =>
                !loading && !isAuthenticated ? (
                    <Redirect to='/login'></Redirect>
                ) : !isVerified ? (
                    <Redirect to='/dashboard'></Redirect>
                ) : (
                    <Component {...props} />
                )
            }
        />
    );
};

const mapStateToProps = (state: IrootState) => ({
    isAuthenticated: state.authReducer.isAuthenticated,
    isVerified: state.authReducer.user?.verified,
    loading: state.authReducer.loading,
});

export default connect(mapStateToProps)(VerifiedRoute);
