import { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/css/App.css';

// Components
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';

//Utils

//Redux
import { Provider } from 'react-redux';
import store from './redux/reducers/root/reducerStore';
import { loadUserActionCreator } from './redux/actions/authActions';
//Axios
import axios from 'axios';
import setAuthToken from './utils/setAuthToken';
import { LOGOUT } from './redux/actions/actionTypes';
import ListPage from './components/list/ListPage';

// Defaults to localhost if not set. This is set in the prod container and is proxied using the proxy field in package.json when running the react dev server.
axios.defaults.baseURL = process.env.REACT_APP_BACKEND_BASE_URL;

const App = () => {
    useEffect(() => {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        loadUserActionCreator(store.dispatch);

        // log user out from all tabs if they log out in one tab
        window.addEventListener('storage', () => {
            if (!localStorage.token) store.dispatch({ type: LOGOUT });
        });
    }, []);

    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <div className='pageContainer'>
                        <Navbar />
                        <div className='mainBodyContainer'>
                            <div className='mainContentContainerOuter'>
                                <div className='mainContentContainerInner'>
                                    <Route exact path='/' component={Landing} />
                                    <Switch>
                                        <Route exact path='/register' component={Register} />
                                        <Route exact path='/login' component={Login} />
                                        <PrivateRoute exact path='/dashboard' component={Dashboard} />
                                        <PrivateRoute exact path='/list/:listid' component={ListPage} />
                                    </Switch>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='footerContainerOuter'>
                                <div className='footerContainerInner'>Footer</div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            </Router>
        </Provider>
    );
};

export default App;
