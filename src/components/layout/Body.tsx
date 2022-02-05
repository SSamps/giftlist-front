import React from 'react';
import { Route, Routes } from 'react-router-dom';
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
import ResetPassword from '../pages/ResetPassword';
import Profile from '../pages/profile/Profile';

const Body: React.FC = () => {
    return (
        <div className='mainBodyContainer'>
            <div className='mainContentContainerOuter'>
                <div className='mainContentContainerInner'>
                    <Routes>
                        <Route path='/' element={<Landing />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/invite/:token' element={<Invite />} />
                        <Route path='/resetpassword/:token' element={<ResetPassword />} />
                        <Route path='/verify/:token' element={<PrivateRoute component={Verify} />} />
                        <Route path='/dashboard' element={<PrivateRoute component={Dashboard} />} />
                        <Route path='/profile' element={<PrivateRoute component={Profile} />} />
                        <Route path='/list/newlist' element={<VerifiedRoute component={NewListPage} />} />
                        <Route path='/list/:listid' element={<VerifiedRoute component={ListPage} />} />
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default Body;
