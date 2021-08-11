import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/css/App.css';

// Components
import Navbar from './components/layout/Navbar';

//Redux
import { Provider } from 'react-redux';
import store from './redux/reducers/root/reducerStore';
import { loadUserActionCreator } from './redux/actions/authActions';
//Axios
import axios from 'axios';
import setAuthToken from './utils/setAuthToken';
import { LOGOUT } from './redux/actions/actionTypes';

import Footer from './components/layout/Footer';
import Body from './components/layout/Body';

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
                <div className='pageContainer'>
                    <Navbar />
                    <Body></Body>
                    <Footer></Footer>
                </div>
            </Router>
        </Provider>
    );
};

export default App;
