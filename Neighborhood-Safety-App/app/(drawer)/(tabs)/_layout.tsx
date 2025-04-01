import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Hides the title at the top
        tabBarActiveTintColor: '#76B6FF',
      }}
      >
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
          ),
       }} />
      <Tabs.Screen name="map" options={{title: 'Map', tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "map-sharp" : "map-outline"} size={24} color={color} />
          ),}}/>
      <Tabs.Screen name="reports" options={{title: 'Reports', tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "alert-circle-sharp" : "alert-circle-outline"} size={24} color={color} />
          ),}}/>
      {/* <Tabs.Screen name="account" options={{title: 'Account', tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name={focused ? "account-circle" : "account-circle-outline"} size={24} color={color} />
          ),}}/> */}
    </Tabs>
  );
}
