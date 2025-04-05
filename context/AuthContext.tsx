import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import {jwtDecode} from 'jwt-decode';


interface AuthContextType {
  isAuthenticated: boolean;
  userToken: string | null; 
  login: (token: string) => void;
  logout: () => void;
  decoded?: any; // Optional decoded token
}


const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userToken, setUserToken] = useState<string | null>(null); 
  const [decoded, setDecoded] = useState<any>(null); // Optional decoded token
  const router = useRouter();

  useEffect(() => {
    // Check authentication on app load
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        setUserToken(token); // Set the token in state
        setIsAuthenticated(true);
        const decoded = jwtDecode(token);
        setDecoded(decoded);
        router.replace('/(tabs)'); // Redirect to home if authenticated
      }
    };
    checkAuth();
  }, []);

  const login = async (token: string) => {
    // Save the token and update state
    // console.log(token)
    await AsyncStorage.setItem('userToken', token);
    setUserToken(token);
    setIsAuthenticated(true);
    const decoded = jwtDecode(token);
    setDecoded(decoded); // Set the decoded token
    router.replace('/(tabs)'); // Redirect to home after login
  };

  const logout = async () => {
    // Clear the token and update state
    await AsyncStorage.removeItem('userToken');
    setUserToken(null);
    setIsAuthenticated(false);
    router.replace('/auth'); // Redirect to login after logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userToken, login, logout, decoded }}>
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