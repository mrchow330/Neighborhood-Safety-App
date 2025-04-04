import { Drawer } from "expo-router/drawer";
import { View, Text, StyleSheet } from "react-native";

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => (
        <View style={{ flex: 1 }}>
          {/* Render the default drawer items */}
          {props.state.routes.map((route, index) => (
            <Drawer.Item
              key={route.key}
              label={props.descriptors[route.key].options.drawerLabel || route.name}
              focused={props.state.index === index}
              onPress={() => props.navigation.navigate(route.name)}
            />
          ))}

          {/* Footer Section */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>© 2025 Team Prodigies</Text>
          </View>
        </View>
      )}
    >
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

const styles = StyleSheet.create({
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#888",
  },
});