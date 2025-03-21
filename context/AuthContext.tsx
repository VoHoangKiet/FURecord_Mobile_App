import { LoginCredentials } from '@/apis/auth.api';
import api from '@/apis/axiosCustom';
import { appUrls } from '@/apis/contants';
import { Toast } from '@ant-design/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextProps {
  user: { email: string } | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
  login: async () => false,
  logout: async () => {}
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // using temp accessToken for user
    AsyncStorage.getItem("accessToken").then((accessToken) => {
      if (accessToken) {
        setUser({email: 'admin@gmail.com'});
      }
      setLoading(false);
    });
    setLoading(false);
    // AsyncStorage.getItem("user").then((currentUser) => {
    //   if (currentUser) {
    //     setUser(JSON.parse(currentUser));
    //   }
    //   setLoading(false);
    // });
    // setLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      const response = await api.post(`${appUrls.url}/login`, credentials);

      if (response.data.token) {
        AsyncStorage.setItem('token', response.data.token);
        AsyncStorage.setItem('role', response.data.role);
        return true;
      } else {
        console.error("Login failed:", response.data.message);
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  const logout = async () => {
    try {
      // Xóa người dùng khỏi bộ nhớ (AsyncStorage hoặc AsyncStorage)
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
