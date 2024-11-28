import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';
import { IUser } from '../types/models/User';

// Context

interface AuthContextType {
    user: IUser | null;
    setUser: (user: IUser | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<IUser | null>(null);

    return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
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

// Requests

export const sendLoginRequest = async (email: string, password: string) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const body = JSON.stringify({ email, password });
    const res = await axios.post('/api/auth', body, config);
    console.log('res: ', res);
    return res;
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
