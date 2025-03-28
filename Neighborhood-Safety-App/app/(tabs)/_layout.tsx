import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Hides the title at the top
        tabBarActiveTintColor: '#14B8A6',
      }}
      >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="map" options={{title: 'Map'}}/>
      <Tabs.Screen name="reports" options={{title: 'Reports'}}/>
      <Tabs.Screen name="account" options={{title: 'Account'}}/>
    </Tabs>
  );
}
