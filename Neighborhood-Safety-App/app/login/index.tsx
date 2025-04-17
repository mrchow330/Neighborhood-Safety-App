import { Text, View, StyleSheet, Image } from 'react-native';
import Button from '@/components/Button';
import { useFonts } from 'expo-font';
import { Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito';


export default function LoginOptions() {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular, // Load the regular font
    Nunito_700Bold,   // Load the bold font
  });

  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>; // Or a custom loading indicator
  }
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to HoodWatch</Text>
      <Image
        style={styles.image}
        source={require('../../assets/images/temp-logo.png')}
        // placeholder={{ blurhash }}
        contentFit="cover"
        transition={1000}
    />
        <Text style={styles.text}>Stay informed, report issues, and keep your community safe.</Text>
        <View>
            <Button label="Login" targetScreen="loginUser"
            />
            <Button label="Sign Up" targetScreen="sign-up"
            style={{ backgroundColor: 'white', borderColor: '#1e3a8a', borderWidth: 1}} // Override button styles
            textStyle={{ color: '#1e3a8a'}} // Override text styles
            />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 320,
  },
  text: {
    color: '#1e3a8a',
    fontFamily: 'Nunito_400Regular',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 10
  },
  header:{
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 5,
    marginTop: 10,
    color: '#1e3a8a',
    fontWeight: 'bold',
  },
  image:{
    width: 200, // Set a fixed width
    height: 200, // Set a fixed height
    resizeMode: 'contain', 
  },
});