import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, Alert, Keyboard, Animated, ActivityIndicator} from 'react-native';
import Button from '@/components/Button';
import React, { useState, useRef} from 'react';
// import {useRouter} from 'expo-router';
import { useAuthSession } from '@/providers/AuthProvider';
import type {ElementRef} from 'react';
import { useNavigation } from '@react-navigation/native';  
import { NativeStackNavigationProp } from '@react-navigation/native-stack';  // For proper typing
import { RootStackParamList } from '../(authorized)/_layout'; 
import { router } from 'expo-router';

export default function LoginScreen() {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [errorMessage, setErrorMessage] = useState('');
   const [successMessage, setSuccessMessage] = useState('');
   const [loading, setLoading] = useState(false); // State for loading
   
   const {signIn} = useAuthSession();
  //  const router=useRouter();

   const passwordInputRef = useRef<ElementRef<typeof TextInput>>(null);

   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
   const handleSignUpPress = ()=>{
      navigation.navigate('sign-up');
   }
   const handleLogin = async () => {
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);
    Keyboard.dismiss();
  
    if (!username || !password) {
      setErrorMessage('Username and password are required.');
      setLoading(false);
      return;
    }
  
    const userCredentials = {
      username: username,
      password: password,
    };
  
    try {
      const response = await fetch('https://neighborhood-safety-backend.vercel.app/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userCredentials),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setSuccessMessage(data.message);
        console.log('login.tsx: user login successful:', data);
        if (data.token && data.userId) {
          console.log('login.tsx: Calling signIn() with token and userId:', data.token, data.userId);
          signIn(data.token, data.userId); // Pass the token and userId to your AuthProvider
          setUsername('');
          setPassword('');
          router.push('/(authorized)/(drawer)/(tabs)/homepage'); // Navigate to the homepage
        }
        else{
          console.log('login.tsx: No token or userId in response:', data);
        }
      } else {
        if (data.error === 'Account not verified. Please check your email.') {
            setErrorMessage(data.error);
            Alert.alert('Verification Required', data.error);
        } else {
            setErrorMessage(data.error || 'Login failed');
            Alert.alert('Error', data.error || 'Login failed');
        }
      }
    } catch (error) {
      setErrorMessage('Network error. Please check your connection and try again.');
      Alert.alert('Error', 'Network error. Please check your connection and try again.');
      console.error('User login network error:', error);
    } finally {
      setLoading(false);
    }
  };
   return (
      <View style={styles.container}>
        <Text style={styles.header}>Welcome Back.</Text>
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null} {/* Display error message */}
        {/* Username Input */}
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#4760a6"
          keyboardType="default"
          value={username}
          onChangeText={setUsername}
          onSubmitEditing={() => {
            passwordInputRef.current?.focus();
          }}
          returnKeyType="next"
        />
        {/* Password Input */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#4760a6"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          onSubmitEditing={handleLogin}
          returnKeyType="go"
        />
        <View>
            <Button label="Login" targetScreen="loginUser"
            style={{ height: '80%', width: '100%'}} // Override button styles
            onPress={handleLogin}
            />
        </View>
        {/* Forgot Password */}
        <TouchableOpacity onPress={() => console.log('Forgot password?')}>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>
        {/* Sign Up */}
        <View style={styles.signUpContainer}>
          <Text style={styles.dontHaveAccount}>Don't have an account?</Text>
          <TouchableOpacity onPress={handleSignUpPress}>
            <Text style={styles.signUpLink}> Sign up now</Text>
          </TouchableOpacity>
        </View>
        {loading && (
        <View style={styles.loadingContainer}> {/* Add loading indicator container */}
          <ActivityIndicator size="large" color="#1e3a8a" />
        </View>
      )}
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
    color: '#1e3a8a',
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
  },
  image:{
    width: 200, // Set a fixed width
    height: 200, // Set a fixed height
    resizeMode: 'contain', 
  },
  input: {
    width: '20%',
    minWidth: 300,
    color: '#1e3a8a',
    padding: 15,
    borderColor: '#d1d5db',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: 'white',
    fontSize: 16,
  },
  forgotPassword: {
    color: '#1e3a8a',
    fontSize: 14,
    marginBottom: 20,
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dontHaveAccount: {
    fontSize: 14,
    color: '#1e3a8a',
  },
  signUpLink: {
    color: '#1e3a8a',
    fontSize: 14,
    fontWeight: 'bold',
  },
  error: { // Style for error message
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  loadingContainer: { // Style for loading indicator overlay
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(248, 250, 252, 0.7)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10, // Ensure it's on top of other elements
  },
  successContainer: { // Style for success notification
    position: 'absolute',
    top: 60, // Adjust as needed
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 34, 128, 0.7)', // Semi-transparent green
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  successText: {
    color: 'white',
    fontWeight: 'bold',
  },
});