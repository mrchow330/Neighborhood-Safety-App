import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer>
      <Drawer.Screen 
        name="account" 
        options={{ title: "", drawerLabel: "Account" }} 
      />
      <Drawer.Screen 
        name="communityGuidelines" 
        options={{ title: "Community Guidelines" }} 
      />
      {/* Drawer-only pages */}
      <Drawer.Screen 
        name="about" 
        options={{ title: "", drawerLabel:"About" }} 
      />
      
      {/* The (tabs) folder holds the tabs navigator */}
      <Drawer.Screen 
        name="(tabs)" 
        options={{ headerShown: true, title: "", drawerLabel:"Home" }} 
      />
    </Drawer>
  );
}
