import { getProfileInfo, LoginCredentials, User } from '@/apis/auth.api';
import api from '@/apis/axiosCustom';
import { appUrls } from '@/apis/contants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
  login: async () => false,
  logout: async () => { }
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(!user) {
      checkAuth();
    }
  }, []);

  const checkAuth = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const profile = await getProfileInfo();
        if (profile) {
          setUser(profile);
          router.push("/(home)");
        }
      }
    } catch (error) {
      console.error("Auth check error:", error);
      router.push("/(auth)");
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await api.post(`${appUrls.backendUrl}/login`, credentials);
      if (response.data.token) {
        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('role', response.data.role);
        const profile = await getProfileInfo();
        if (profile) {
          setUser(profile);
        }
        return true;
      } else {
        console.error("Login failed:", response.data.message);
        return false;
      }
    } catch (error: any) {
      console.log(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('role');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
