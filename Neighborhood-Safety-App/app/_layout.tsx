import { Stack } from 'expo-router';

export default function RootLayout() {

  return (
    <Stack
      screenOptions={{
        headerShown: false, // Hides the title at the top
    }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
      <Stack.Screen name="about" options={{title:'About'}}/>
      <Stack.Screen name="reportIssue" options={{title: 'Report Issue', tabBarStyle: { display: 'flex' }}}/>
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
};