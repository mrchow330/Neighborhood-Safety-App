import { Text, View, StyleSheet, Image } from 'react-native';
import Button from '@/components/Button';


export default function SignInScreen() {
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
            <Button label="Login" targetScreen="login"/>
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
  }
});