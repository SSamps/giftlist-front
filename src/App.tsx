import { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
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
import setAuthToken from './misc/setAuthToken';
import { LOGOUT } from './redux/actions/actionTypes';

import Footer from './components/layout/Footer';
import Body from './components/layout/Body';
import UncaughtError from './components/pages/UncaughtError';

const backendUrl = import.meta.env.VITE_BACKEND_BASE_URL || window.env.VITE_BACKEND_BASE_URL;
axios.defaults.baseURL = backendUrl;

const App = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const init = async () => {
            if (localStorage.token) {
                setAuthToken(localStorage.token);
            }

            await loadUserActionCreator(store.dispatch);

            window.addEventListener('storage', () => {
                if (!localStorage.token) store.dispatch({ type: LOGOUT });
            });
            setLoaded(true);
        };
        init();
    }, []);

    const errorFallback = async (error: Error, info: { componentStack: string }) => {
        const { name, stack, message } = error;

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const body = JSON.stringify({
            name: name,
            stack: stack,
            message: message,
            componentStack: info.componentStack,
            date: new Date().toLocaleString(),
        });
        await axios.post(`/api/admin/error`, body, config);
    };

    return (
        <ErrorBoundary FallbackComponent={UncaughtError} onError={errorFallback}>
            <Provider store={store}>
                <Router>
                    {loaded && (
                        <div className='pageContainer'>
                            <Navbar />
                            <Body></Body>
                            <Footer></Footer>
                        </div>
                    )}
                </Router>
            </Provider>
        </ErrorBoundary>
    );
};

export default App;
