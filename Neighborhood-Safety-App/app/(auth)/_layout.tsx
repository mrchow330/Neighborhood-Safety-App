import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="sign-in" options={{title: ' ', headerShown: false}}/>
      <Stack.Screen name="login" options={{ headerTitle: "Login", headerTitleAlign: 'left' }} />
      <Stack.Screen name="sign-up" options={{ headerTitle: "Sign Up" }} />
    </Stack>
  );
}