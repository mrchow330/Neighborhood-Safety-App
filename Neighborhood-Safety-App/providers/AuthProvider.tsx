// providers/AuthProvider.tsx

import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import React from 'react';


type User = {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
};

const AuthContext = createContext<{
  signIn: (token: string) => void;
  signOut: () => void;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  user: User | null;
}>({
  signIn: () => null,
  signOut: () => null,
  token: null,
  isLoading: true,
  isAuthenticated: false,
  user: null
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
      if (storedToken) {
        setToken(storedToken);
        setIsAuthenticated(true);
        await fetchUserProfile(storedToken);
      }
      setIsLoading(false);
    })();
  }, []);

  const signIn = useCallback(async (authToken: string) => {
    await AsyncStorage.setItem('@token', authToken);
    setToken(authToken);
    setIsAuthenticated(true);
    await fetchUserProfile(authToken);
    router.replace('/(authorized)/(drawer)/(tabs)');
    setIsLoading(false);
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem('@token');
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
