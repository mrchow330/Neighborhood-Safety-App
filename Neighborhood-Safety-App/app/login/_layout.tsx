import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{title: ' ', headerShown: false}}/>
      <Stack.Screen name="loginUser" options={{ headerTitle: "Login" }} />
      <Stack.Screen name="sign-up" options={{ headerTitle: "Sign Up" }} />
    </Stack>
  );
}