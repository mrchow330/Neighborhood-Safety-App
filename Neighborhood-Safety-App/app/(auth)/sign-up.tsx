import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Alert} from 'react-native';
import Button from '@/components/Button';
import React, { useState } from 'react';

export default function CreateAccountScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignUp = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    if (!firstName || !lastName || !username || !password) {
      setErrorMessage('First name, last name, username, and password are required.');
      return;
    }

    if (!email || !phoneNumber) {
      setErrorMessage('Please provide email and phone number.');
      return;
    }
    const userData = {
      first_name: firstName,
      last_name: lastName,
      username: username,
      password: password,
      email: email,
      phone_number: phoneNumber,
    };

    try {
      const response = await fetch('https://neighborhood-safety-backend.vercel.app/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage(data.message);
        console.log('Registration successful:', data);
        // Optionally, navigate to a login screen or display a confirmation
        // Example of using Alert for feedback:
        Alert.alert('Success', data.message, [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ]);
        // Clear the form
        setFirstName('');
        setLastName('');
        setUsername('');
        setEmail('');
        setPhoneNumber('');
        setPassword('');
      } else {
        setErrorMessage(data.error || 'Registration failed. Please try again.');
        console.error('Registration error:', data);
        // Optionally, use Alert to display the error
        Alert.alert('Error', data.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Network error. Please check your connection and try again.');
      console.error('Registration network error:', error);
      Alert.alert('Error', 'Network error. Please check your connection and try again.');
    }

  };

  return (
    <ScrollView style={styles.scrollViewContainer} contentContainerStyle={styles.container}>
      <Text style={styles.header}>Create an Account</Text>
      <Text style={styles.text}>Please fill out fields.</Text>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      {/* <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      /> */}
      <View>
          <Button label="Sign Up" targetScreen="login"
          style={{ height: '80%', width: '100%'}} // Override button styles
          onPress={handleSignUp}
          />
      </View>
      <View style={styles.loginContainer}>
        <Text style={styles.haveAccountText}>Have an account?</Text>
        <TouchableOpacity >
          <Text style={styles.loginLink}> Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1, // Make the ScrollView take up the entire screen
    backgroundColor: '#F8FAFC',
  },
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
    paddingTop: 90,
    color: '#1e3a8a',
  },
  image:{
    width: 200, // Set a fixed width
    height: 200, // Set a fixed height
    resizeMode: 'contain', 
  },
  input: {
    width: '39%',
    color: '#1e3a8a',
    padding: 15,
    borderColor: '#d1d5db',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: 'white',
    fontSize: 16,
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingBottom: 40,
  },
  haveAccountText: {
    color: '#1e3a8a',
    fontSize: 14,
  },
  loginLink: {
    color: '#1e3a8a',
    fontSize: 14,
    fontWeight: 'bold',
  },
});