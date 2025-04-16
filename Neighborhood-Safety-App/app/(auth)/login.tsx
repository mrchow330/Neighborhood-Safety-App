import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, Alert} from 'react-native';
import Button from '@/components/Button';
import React, { useState } from 'react';

export default function LoginScreen() {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [errorMessage, setErrorMessage] = useState('');
   const [successMessage, setSuccessMessage] = useState('');

   const handleLogin= async ()=>{
    setErrorMessage('');
    setSuccessMessage(''); // Clear any previous success messages

    if (!username || !password) {
      setErrorMessage('Username and password are required.');
      return;
    }

    const adminCredentials = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch('https://neighborhood-safety-backend.vercel.app/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adminCredentials),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message); // "Login successful"
        console.log('Admin login successful:', data);
        Alert.alert('Success', data.message, [
          { text: 'OK', onPress: () => {
            // Handle navigation to the admin dashboard or next screen
            console.log('Navigating to admin dashboard');
          }},
        ]);
        // Optionally, store authentication tokens or session information here
        setUsername('');
        setPassword('');
      } else if (response.status === 404) {
        setErrorMessage(data.error || 'User not found.');
        Alert.alert('Error', data.error || 'User not found.');
      } else if (response.status === 403) {
        setErrorMessage(data.error || 'Access denied. Admins only.');
        Alert.alert('Error', data.error || 'Access denied. Admins only.');
      } else if (response.status === 401) {
        setErrorMessage(data.error || 'Invalid credentials.');
        Alert.alert('Error', data.error || 'Invalid credentials.');
      } else {
        setErrorMessage(data.error || 'Admin login failed. Please try again.');
        Alert.alert('Error', data.error || 'Admin login failed. Please try again.');
        console.error('Admin login error:', data);
      }
    } catch (error) {
      setErrorMessage('Network error. Please check your connection and try again.');
      Alert.alert('Error', 'Network error. Please check your connection and try again.');
      console.error('Admin login network error:', error);
    }
   };
   return (
      <View style={styles.container}>
        <Text style={styles.header}>Welcome Back.</Text>
        {/* Email Input */}
        <TextInput
          style={styles.input}
          placeholder="Username"
          keyboardType="default"
          value={username}
          onChangeText={setUsername}
        />
        {/* Password Input */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <View>
            <Button label="Login" targetScreen="login"
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
          <TouchableOpacity onPress={() => console.log('Sign up now')}>
            <Text style={styles.signUpLink}> Sign up now</Text>
          </TouchableOpacity>
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
});