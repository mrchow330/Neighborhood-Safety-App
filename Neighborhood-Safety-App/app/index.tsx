//https://neighborhood-safety-backend.vercel.app/api/users

import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
const handleLogin = async () => {
    try {
    const res = await axios.post('https://neighborhood-safety-backend.vercel.app/api/users', {
        email,
        password
    });

    if (res.data.user) {
        Alert.alert('Login successful 💙');
        // TODO: Navigate to home screen or store user token
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Invalid credentials 😵‍💫');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: { padding: 20 },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      marginBottom: 12,
      padding: 10,
      borderRadius: 8,
    },
  });