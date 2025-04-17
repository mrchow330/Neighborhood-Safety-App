import AsyncStorage from '@react-native-async-storage/async-storage';
import {router} from "expo-router";
import {createContext, MutableRefObject, ReactNode, useCallback, useContext, useEffect, useRef, useState} from 'react';

const AuthContext = createContext<{
  signIn: (token: string) => void;
  signOut: () => void
  token: string | null;
  isLoading: boolean;
  isAuthenticated : boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  token: null,
  isLoading: true,
  isAuthenticated: false
});

// Access the context as a hook
export function useAuthSession() {
  return useContext(AuthContext);
}

export default function AuthProvider  ({children}:{children: ReactNode}): ReactNode {
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async ():Promise<void> => {
      const storedToken = await AsyncStorage.getItem('@token');
      setToken(storedToken || null);
      setIsAuthenticated(!!storedToken);
      setIsLoading(false);
    })()
  }, []);

  const signIn = useCallback(async (authToken: string) => {
    console.log("sign in running")
    await AsyncStorage.setItem('@token', authToken);
    setToken(authToken);
    setIsAuthenticated(true);
    router.replace('/(authorized)/(drawer)/(tabs)')
    setIsLoading(false);
  }, [router]);

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem('@token');
    setToken(null);
    router.replace('/login');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        token,
        isLoading,
        isAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};