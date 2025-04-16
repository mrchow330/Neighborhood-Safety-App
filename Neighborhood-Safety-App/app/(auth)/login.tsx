import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity} from 'react-native';
import Button from '@/components/Button';
import React, { useState } from 'react';

export default function LoginScreen() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   return (
      <View style={styles.container}>
        <Text style={styles.header}>Welcome Back.</Text>
        <Text style={styles.text}>Existing User</Text>
        {/* Email Input */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
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
            style={{ height: '80%'}} // Override button styles
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
    marginBottom: 5,
    color: '#1e3a8a',
  },
  image:{
    width: 200, // Set a fixed width
    height: 200, // Set a fixed height
    resizeMode: 'contain', 
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
    color: '#4b5563',
    fontSize: 14,
  },
  signUpLink: {
    color: '#1e3a8a',
    fontSize: 14,
    fontWeight: 'bold',
  },
});