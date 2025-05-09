// providers/AuthProvider.tsx

import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import React from 'react';


type User = {
  userId: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  isModerator: boolean;
  createdAt: Date;
};

const AuthContext = createContext<{
  signIn: (token: string, userId: string) => void;
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
  user: null,
  userId: null,
  email: null,
  first_name: null,
  last_name: null,
  username: null,
});

export function useAuthSession() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }: { children: ReactNode }): ReactNode {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const fetchUserProfile = async (authToken: string, userId: string) => {
    try {
      const res = await fetch(`https://neighborhood-safety-backend.vercel.app/api/users/${userId}`, {

        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch user profile");

      const data = await res.json();
      console.log("User profile data:", data);
      setUser({
        userId: data._id,
        first_name: data.first_name,
        last_name: data.last_name,
        username: data.username,
        email: data.email,
        phone_number: data.phone_number,
        isModerator: data.isModerator,
        createdAt: new Date(data.createdAt),
      });
    } catch (err) {
      console.error("Error fetching user profile:", err);
      setUser(null);
    }
  };

  useEffect(() => {
  (async () => {
    const storedToken = await AsyncStorage.getItem('@token');
    const storedUserId = await AsyncStorage.getItem('@userId');
    if (storedToken && storedUserId) {
      setToken(storedToken);
      setIsAuthenticated(true);
      setUser((prevUser) => ({ ...prevUser, userId: storedUserId }));
      await fetchUserProfile(storedToken, storedUserId);
    } else {
      setIsAuthenticated(false); // Ensure this is set to `false` when no token is found
    }
    setIsLoading(false); // Set loading to false when authentication check is done
  })();
}, []);

  const signIn = useCallback(async (authToken: string, userId: string) => {
    await AsyncStorage.setItem('@token', authToken);
    await AsyncStorage.setItem('@userId', userId);
    setToken(authToken);
    setIsAuthenticated(true);
    setUser((prevUser) => ({ ...prevUser, userId })); // Temporarily set userId
    await fetchUserProfile(authToken, userId);
    router.replace('/(authorized)/(drawer)/(tabs)/homepage')
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem('@token');
    await AsyncStorage.removeItem('@userId'); // Remove userId from AsyncStorage
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
