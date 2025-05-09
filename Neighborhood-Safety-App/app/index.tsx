import { useRouter } from 'expo-router';
import { Button } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  return (
    router.push('/login')
  );
}
