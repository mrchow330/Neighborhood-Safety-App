import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="map" options={{title: 'Map'}}/>
      <Tabs.Screen name="reports" options={{title: 'Reports'}}/>
      <Tabs.Screen name="account" options={{title: 'Account'}}/>
    </Tabs>
  );
}
