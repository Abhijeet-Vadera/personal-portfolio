import React, { createContext, useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { AuthState } from '../types';

export interface AuthContextType extends AuthState {
    login: (email: string, pass: string) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<AuthState>({
        user: null,
        isAuthenticated: false,
        isLoading: true,
        error: null,
    });

    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        try {
            const user = await Auth.currentAuthenticatedUser();
            const { attributes } = user;
            setState({
                user: {
                    id: user.username,
                    email: attributes.email,
                    role: 'ADMIN', // Defaulting for now, can be group-based
                    name: attributes.name || attributes.email.split('@')[0]
                },
                isAuthenticated: true,
                isLoading: false,
                error: null,
            });
        } catch {
            setState({
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: null,
            });
        }
    };

    const login = async (email: string, pass: string) => {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            const user = await Auth.signIn(email, pass);
            if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
                // Handle new password required if needed
                setState(prev => ({ ...prev, isLoading: false, error: 'New password required.' }));
            } else {
                await checkUser();
            }
        } catch (error: any) {
            setState(prev => ({
                ...prev,
                isLoading: false,
                error: error.message || 'Login failed.'
            }));
        }
    };

    const logout = async () => {
        try {
            await Auth.signOut();
            setState({
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: null,
            });
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ ...state, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
