import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter(); // Router for navigation

  useEffect(() => {
    // Check authentication on app load
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('userToken');
      setIsAuthenticated(!!token);
      if (token) {
        router.replace('/(tabs)'); // Redirect to home if authenticated
      }
    };
    checkAuth();
  }, []);

  const login = async () => {
    // Simulate login (replace with real API logic)
    await AsyncStorage.setItem('userToken', 'some-token');
    setIsAuthenticated(true);
    router.replace('/(tabs)'); // Redirect to home after login
  };

  const logout = async () => {
    await AsyncStorage.removeItem('userToken');
    setIsAuthenticated(false);
    router.replace('/auth'); // Redirect to login after logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
