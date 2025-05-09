// providers/AuthProvider.tsx

import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import React from 'react';


type User = {
  userId: string,
  first_name: string,
  last_name: string,
  username: string,
  email: string,
  phone_number: string,
  password: string,
  isModerator: boolean,
  createdAt: Date,
};

const AuthContext = createContext<{
  signIn: (token: string, userId: string) => void;
  signOut: () => void;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  user: User | null;
  userId: string | null;
}>({
  signIn: () => null,
  signOut: () => null,
  token: null,
  isLoading: true,
  isAuthenticated: false,
  user: null,
  userId: null,
});

export function useAuthSession() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }: { children: ReactNode }): ReactNode {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const fetchUserProfile = async (authToken: string) => {
    try {
      const res = await fetch('http://localhost:5000/api/users/me', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch user profile");

      const data = await res.json();
      setUser({
        email: data.email,
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
      });
    } catch (err) {
      console.error("Error fetching user profile:", err);
      setUser(null);
    }
  };

  useEffect(() => {
    (async () => {
      const storedToken = await AsyncStorage.getItem('@token');
      const storedUserId = await AsyncStorage.getItem('@userId'); // Retrieve userId
      if (storedToken && storedUserId) {
        setToken(storedToken);
        setIsAuthenticated(true);
        setUser((prevUser) => ({ ...prevUser, userId: storedUserId }));
        await fetchUserProfile(storedToken);
      }
      setIsLoading(false);
    })();
  }, []);

  const signIn = useCallback(async (authToken: string, userId: string) => {
    await AsyncStorage.setItem('@token', authToken);
    await AsyncStorage.setItem('@userId', userId); 
    setToken(authToken);
    setIsAuthenticated(true);
    setUser((prevUser) => ({ ...prevUser, userId })); 
    await fetchUserProfile(authToken);
    router.replace('/(authorized)/(drawer)/(tabs)');
    setIsLoading(false);
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem('@token');
    await AsyncStorage.removeItem('@userId');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    router.replace('/login');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        token,
        isLoading,
        isAuthenticated,
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
