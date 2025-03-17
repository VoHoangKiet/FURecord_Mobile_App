import React, { useEffect, useState, ReactNode, Fragment } from 'react';
import { Text } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const checkLoginStatus = async () => {
    const token = await AsyncStorage.getItem('isLogged');
    if (!token) {
    router.push('/(auth)');
    } else {
    setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  if (!isLoggedIn) {
    return <Text>Loading...</Text>;
  }

  return <Fragment>{children}</Fragment>;
};

export default ProtectedRoute;