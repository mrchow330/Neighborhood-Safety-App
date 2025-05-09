import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useAuthSession } from '@/providers/AuthProvider'; // Make sure your custom auth hook is correct

export default function HomeScreen() {
  const { isLoading, isAuthenticated } = useAuthSession(); // Get loading and authentication status
  const router = useRouter(); // Use the router for navigation

  useEffect(() => {
    if (!isLoading) {
      // Check if user is authenticated
      if (isAuthenticated) {
        // Redirect to homepage inside authorized group
        router.push('/(authorized)/(drawer)/(tabs)/homepage');
      }
      else {
        // Redirect to login page if not authenticated
        router.push('/login');
      }
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Welcome to the Home Screen!</Text>
    </View>
  );
}
