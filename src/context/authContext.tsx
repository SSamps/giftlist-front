import axios from 'axios';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { IUser } from '../types/models/User';
import { useQuery } from '@tanstack/react-query';

// Context

interface AuthContextType {
    token: string | null;
    setToken: (token: string | null) => void;
    user: IUser | null;
    setUser: (user: IUser | null) => void;
    userLoading: boolean;
    setLoading: (loading: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setTokenInContext] = useState<string | null>(null);
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const userQuery = useUserQuery();

    const isInit = useRef(true);
    // If the token changes refetch the user
    useEffect(() => {
        const updateUser = async () => {
            if (!token) {
                setUser(null);
                return;
            }

            const res = await userQuery.refetch();
            if (res.isSuccess) {
                setUser(res.data);
            } else {
                setUser(null);
                setToken(null);
            }
        };

        // Doesn't need to run on first render, only when token changes
        if (isInit.current) {
            isInit.current = false;
            return;
        }
        updateUser();
    }, [token]);

    // Sync token with other tabs via local storage.
    useEffect(() => {
        const init = async () => {
            // Will only apply to other tabs
            window.addEventListener('storage', (event: StorageEvent) => {
                if (event.key === 'token') {
                    const newToken = event.newValue;
                    if (!newToken) {
                        setTokenInContext(null);
                        updateTokenInAxios(null);
                    } else if (newToken !== token) {
                        setTokenInContext(newToken);
                        updateTokenInAxios(newToken);
                    }
                }
            });
        };
        init();
        setLoading(false);
    }, []);

    // Update token everywhere
    const setToken = (token: string | null) => {
        setTokenInContext(token);
        updateTokenInAxios(token);
        updateTokenInStorage(token);
    };

    return (
        <AuthContext.Provider value={{ token, setToken, user, setUser, userLoading: loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hooks

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const useUserQuery = () => {
    return useQuery({ queryKey: ['user'], queryFn: getUserRequest, enabled: false });
};

// Requests

export const sendLoginRequestMut = async ({ email, password }: { email: string; password: string }) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const body = JSON.stringify({ email, password });
    return axios.post('/api/auth', body, config).then((res) => res.data);
};

export const sendRegisterRequestMut = async ({
    displayName,
    email,
    password,
}: {
    displayName: string;
    email: string;
    password: string;
}) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const body = JSON.stringify({ displayName, email, password });
    return await axios.post('/api/users', body, config);
};

export const sendRenameUserRequestMut = async ({ newName }: { newName: string }) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const body = JSON.stringify({ displayName: newName });

    console.log(`rename user request: ${body}`);
    return await axios.put(`/api/users`, body, config);
};

export const sendDeleteUserRequestMut = async () => {
    return await axios.delete(`/api/users`);
};

export const getUserRequest = async () => {
    return axios.get('/api/auth').then((res) => res.data);
};

// Update tokens

const updateTokenInStorage = (token: string | null) => {
    if (token) {
        localStorage.setItem('token', token);
    } else {
        localStorage.removeItem('token');
    }
};

const updateTokenInAxios = (token: string | null) => {
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
    }
};

export const updateAxiosAuthHeader = (token: string | null) => {
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
    }
};
