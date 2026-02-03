import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useLocalStorage('mediTrack_user', null);
    const [isAuthenticated, setIsAuthenticated] = useState(!!user);

    useEffect(() => {
        setIsAuthenticated(!!user);
    }, [user]);

    const login = async (email, password) => {
        // Mock login
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockUser = {
                    id: '1',
                    name: 'Jane Doe',
                    email: email,
                    avatar: null
                };
                setUser(mockUser);
                resolve(mockUser);
            }, 1000);
        });
    };

    const signup = async (name, email, password) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockUser = {
                    id: '1',
                    name: name,
                    email: email,
                    avatar: null
                };
                setUser(mockUser);
                resolve(mockUser);
            }, 1000);
        });
    };

    const logout = () => {
        setUser(null);
    };

    const updateUser = (updates) => {
        setUser(prev => ({ ...prev, ...updates }));
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
