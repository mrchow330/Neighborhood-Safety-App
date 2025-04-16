import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="sign-in" options={{title: ' '}}/>
      <Stack.Screen name="login" options={{ title: "Login" }} />
      <Stack.Screen name="sign-up" options={{ title: "Sign Up" }} />
    </Stack>
  );
}

export type RootStackParamList = {
    "(tabs)": undefined;  // This screen has no parameters
    "+not-found": undefined;  
    about: undefined;  
    reportIssue: undefined;  
    index: undefined;  
    map: undefined;  
    reports: undefined;  
    account: undefined;  
    communityGuidlines : undefined;
  };