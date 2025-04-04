import { Drawer } from "expo-router/drawer";
import { View, Text, StyleSheet } from "react-native";

export default function DrawerLayout() {
  return (
    <Drawer>
      
      <Drawer.Screen 
        name="(tabs)" 
        options={{ headerShown: true, title: "", drawerLabel:"Home" }} 
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
      {/* Drawer-only pages */}
      <Drawer.Screen 
        name="about" 
        options={{ title: "", drawerLabel:"About Us" }} 
      />
      
      {/* The (tabs) folder holds the tabs navigator */}
      {/* <Drawer.Screen 
        name="home" 
        options={{ headerShown: true, title: "", drawerLabel:"Home" }} 
      /> */}

      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 Team Prodigies</Text>
      </View>
      
    </Drawer>
  );
}

const styles = StyleSheet.create({
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    padding: 10,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#888",
  },
});
