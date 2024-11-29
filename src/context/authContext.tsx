import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';
import { IUser } from '../types/models/User';
import { useQuery } from '@tanstack/react-query';

// Context

interface AuthContextType {
    user: IUser | null;
    setUser: (user: IUser | null) => void;
    userLoading: boolean;
    setLoading: (loading: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <AuthContext.Provider value={{ user, setUser, userLoading: loading, setLoading }}>
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

export const useLogout = () => {
    updateToken(null);
};

export const useUserQuery = () => {
    return useQuery({ queryKey: ['user'], queryFn: getUserRequest, enabled: false });
}

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

export const sendRegisterRequestMut = async ({ displayName, email, password }: { displayName: string, email: string; password: string }) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const body = JSON.stringify({ displayName, email, password });
    return await axios.post('/api/users', body, config);
};

export const getUserRequest = async () => {
    return axios.get('/api/auth').then((res) => res.data);
};

// Update tokens

export const updateToken = (token: string | null) => {
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token;
        localStorage.setItem('token', token);
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
        localStorage.removeItem('token');
    }
};

export const updateAxiosAuthHeader = (token: string | null) => {
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
    }
};
