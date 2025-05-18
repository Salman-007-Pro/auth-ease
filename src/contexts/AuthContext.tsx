import apiService from '@/utilities/services/api.service';
import React, { createContext, useCallback, useContext, useReducer } from 'react';

import { AuthContextType, AuthState, User } from './types';

// Initial state
const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Action types
type AuthAction =
    | { type: 'LOGIN_START' }
    | { type: 'LOGIN_SUCCESS'; payload: User }
    | { type: 'LOGIN_FAILURE'; payload: string }
    | { type: 'LOGOUT' }
    | { type: 'CLEAR_ERROR' };

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'LOGIN_START':
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                isLoading: false,
                error: null,
            };
        case 'LOGIN_FAILURE':
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case 'LOGOUT':
            return {
                ...initialState,
            };
        case 'CLEAR_ERROR':
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const login = useCallback(async (email: string, password: string) => {
        try {
            dispatch({ type: 'LOGIN_START' });

            // Get user from API using apiService
            const users = await apiService.GET('users');
            const user = users.find((u: any) => u.email === email && u.password === password);

            if (!user) {
                throw new Error('Invalid email or password');
            }

            // Remove password from user object before storing in state
            const { password: _, ...userWithoutPassword } = user;
            dispatch({ type: 'LOGIN_SUCCESS', payload: userWithoutPassword });
        } catch (error) {
            dispatch({
                type: 'LOGIN_FAILURE',
                payload: error instanceof Error ? error.message : 'An error occurred during login',
            });
        }
    }, []);

    const logout = useCallback(async () => {
        dispatch({ type: 'LOGOUT' });
    }, []);

    const clearError = useCallback(() => {
        dispatch({ type: 'CLEAR_ERROR' });
    }, []);

    const value = {
        ...state,
        login,
        logout,
        clearError,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
