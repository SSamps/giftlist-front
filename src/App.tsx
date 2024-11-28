import { useEffect, useState, ErrorInfo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/css/App.css';

// Components
import Navbar from './components/layout/Navbar';

//Redux
import { Provider } from 'react-redux';
import store from './redux/reducers/root/reducerStore';
//Axios
import axios from 'axios';

import Footer from './components/layout/Footer';
import Body from './components/layout/Body';
import UncaughtError from './components/pages/UncaughtError';
import { getUserRequest, updateAxiosAuthHeader, useAuth } from './context/authContext';
import { useQuery } from '@tanstack/react-query';

const backendUrl = import.meta.env.VITE_BACKEND_BASE_URL || window.env.VITE_BACKEND_BASE_URL;
axios.defaults.baseURL = backendUrl;

const App = () => {
    const [loadedApp, setLoaded] = useState(false);

    const { setUser, setLoading } = useAuth();

    const userQuery = useQuery({ queryKey: ['user'], queryFn: getUserRequest, enabled: false });

    useEffect(() => {
        const init = async () => {
            if (localStorage.token) {
                updateAxiosAuthHeader(localStorage.token);
                const data = await userQuery.refetch();
                if (data.isSuccess) {
                    setUser(data.data);
                } else {
                    setUser(null);
                    setLoading(false);
                }
            }

            window.addEventListener('storage', () => {
                if (!localStorage.token) {
                    setUser(null);
                    setLoading(false);
                }
            });
            setLoaded(true);
        };
        init();
    }, []);

    const errorFallback = async (error: Error, info: ErrorInfo) => {
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
                    {loadedApp && (
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
