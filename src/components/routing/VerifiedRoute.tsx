import { Fragment } from 'react';
import { connect } from 'react-redux';
import { StaticContext } from 'react-router';
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';
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
    const renderContent = (
        props: RouteComponentProps<
            {
                [x: string]: string | undefined;
            },
            StaticContext,
            unknown
        >
    ) => {
        if (loading) {
            return <Fragment></Fragment>;
        } else if (!isAuthenticated) {
            return <Redirect to='/login'></Redirect>;
        } else if (!isVerified) {
            return <Redirect to='/dashboard'></Redirect>;
        } else {
            console.log(props);
            return <Component {...props} />;
        }
    };

    return <Route {...routeProps} render={(props) => renderContent(props)} />;
};

const mapStateToProps = (state: IrootState) => ({
    isAuthenticated: state.authReducer.isAuthenticated,
    isVerified: state.authReducer.user?.verified,
    loading: state.authReducer.loading,
});

export default connect(mapStateToProps)(VerifiedRoute);
