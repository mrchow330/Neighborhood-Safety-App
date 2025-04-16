import { Text, View, StyleSheet, Image } from 'react-native';
import Button from '@/components/Button';
import { useFonts } from 'expo-font';
import { Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito';


export default function SignInScreen() {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular, // Load the regular font
    Nunito_700Bold,   // Load the bold font
  });

  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>; // Or a custom loading indicator
  }
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to {"\n"} HoodWatch</Text>
      <Image
        style={styles.image}
        source={require('../../assets/images/temp-logo.png')}
        // placeholder={{ blurhash }}
        contentFit="cover"
        transition={1000}
    />
        <Text style={styles.text}>Stay informed, report issues, and keep your community safe.</Text>
        <View>
            <Button label="Login" targetScreen="login"
            onPress={() => console.log('Overridden pressed')}
            style={{ backgroundColor: 'green', borderRadius: 10 }} // Override button styles
            textStyle={{ fontSize: 18, color: 'yellow' }} // Override text styles
            />
            <Button label="Sign Up" targetScreen="sign-up"/>
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
  },
  text: {
    color: '#1E293B',
    fontFamily: 'Nunito_400Regular',
    fontSize: 16,
    width: '40%',
    textAlign: 'center',
    marginBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    minWidth: 60,
  },
  header:{
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20,
    color: '#1e3a8a',
    fontWeight: 'bold',
  },
  image:{
    width: 200, // Set a fixed width
    height: 200, // Set a fixed height
    resizeMode: 'contain', 
  },
  button: {
    borderRadius: 10,
    width: '90%',
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: "#1e3a8a"
  },
  buttonLabel: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});