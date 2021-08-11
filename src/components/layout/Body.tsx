import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Invite from '../pages/Invite';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Dashboard from '../pages/dashboard/Dashboard';
import Landing from '../pages/Landing';
import ListPage from '../pages/lists/ListPage';
import NewListPage from '../pages/newList/NewListPage';
import NotFound from '../routing/NotFound';
import PrivateRoute from '../routing/PrivateRoute';
import VerifiedRoute from '../routing/VerifiedRoute';
import Verify from '../pages/auth/Verify';

const Body: React.FC = () => {
    return (
        <div className='mainBodyContainer'>
            <div className='mainContentContainerOuter'>
                <div className='mainContentContainerInner'>
                    <Switch>
                        <Route exact path='/' component={Landing} />
                        <Route exact path='/register' component={Register} />
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/invite/:token' component={Invite} />
                        <PrivateRoute exact path='/verify/:token' component={Verify} />
                        <PrivateRoute exact path='/dashboard' component={Dashboard} />
                        <VerifiedRoute exact path='/list/newlist' component={NewListPage} />
                        <VerifiedRoute exact path='/list/:listid' component={ListPage} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </div>
        </div>
    );
};

export default Body;
