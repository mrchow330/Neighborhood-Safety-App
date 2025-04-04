import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer>
      <Drawer.Screen 
        name="(tabs)" 
        options={{ headerShown: true, title: "", drawerLabel: "Home" }} 
      />
      <Drawer.Screen 
        name="account" 
        options={{ title: "", drawerLabel: "Account" }} 
      />
      <Drawer.Screen 
        name="communityGuidelines" 
        options={{ title: "", drawerLabel: "Community Guidelines" }} 
      />
      <Drawer.Screen 
        name="contactUs" 
        options={{ title: "", drawerLabel: "Contact Us" }} 
      />
      <Drawer.Screen 
        name="about" 
        options={{ title: "", drawerLabel: "About Us" }} 
      />
    </Drawer>
  );
}