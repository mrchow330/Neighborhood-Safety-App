import AsyncStorage from '@react-native-async-storage/async-storage';
import {router} from "expo-router";
import {createContext, MutableRefObject, ReactNode, useCallback, useContext, useEffect, useRef, useState} from 'react';

const AuthContext = createContext<{
  signIn: (token: string) => void;
  signOut: () => void
  token: MutableRefObject<string | null> | null;
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
  const tokenRef = useRef<string|null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async ():Promise<void> => {
      const token = await AsyncStorage.getItem('@token');
      tokenRef.current = token || '';
      setIsLoading(false);
    })()
  }, []);

  const signIn = useCallback(async (authToken: string) => {
    console.log("sign in running")
    await AsyncStorage.setItem('@token', authToken);
    tokenRef.current = authToken;
    setIsAuthenticated(true);
    router.replace('/(authorized)/(drawer)/(tabs)')
    setIsLoading(false);
  }, [router]);

  const signOut = useCallback(async () => {
    await AsyncStorage.setItem('@token', '');
    tokenRef.current = null;
    router.replace('/login');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        token: tokenRef,
        isLoading,
        isAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};