import { Text, View, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, Animated, ActivityIndicator} from 'react-native';
import Button from '@/components/Button';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';  
import { NativeStackNavigationProp } from '@react-navigation/native-stack';  // For proper typing
import { RootStackParamList } from '../(authorized)/_layout'; 

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
  const [loading, setLoading] = useState(false);
  const fadeAnimation = useRef(new Animated.Value(0)).current;
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
     const handleLoginPress = ()=>{
        navigation.navigate('loginUser');
     }

     useEffect(() => {
      if (successMessage) {
        Animated.timing(fadeAnimation, {
          toValue: 1,
          duration: 500, // Fade in duration
          useNativeDriver: true,
        }).start(() => {
          setTimeout(() => {
            Animated.timing(fadeAnimation, {
              toValue: 0,
              duration: 500, // Fade out duration
              useNativeDriver: true,
            }).start(() => {
              navigation.navigate('loginUser');
            });
          }, 1500); // Display for 1.5 seconds
        });
      }
    }, [successMessage, navigation, fadeAnimation]);

  //----regex-----
  const validateEmail = (email: string |any) =>{
    if (typeof email!== 'string'){
      return false;
    }
    const re= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  const validatePassword = (password: string |any)=>{
    if (typeof password != 'string'){
      return false;
    }
    if (password.length < 8){
      return false;
    }
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars;
  }
  const validatePhoneNumber = (phoneNumber: string |any)=>{
    if (typeof phoneNumber != 'string'){
      return false;
    }
    const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
    return re.test(phoneNumber);
  }


  const handleSignUp = async () => {
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);

    if (!firstName.trim() || !lastName.trim() || !username.trim() || !password.trim()) {
      setErrorMessage('First name, last name, username, and password are required.');
      setLoading(false);
      triggerShake();
      return;
    }

    if (!email.trim() || !phoneNumber.trim()) {
      setErrorMessage('Please provide email and phone number.');
      setLoading(false);
      triggerShake();
      return;
    }
    if(!validateEmail(email)){
      setErrorMessage('Please enter valid email address.');
      setLoading(false);
      triggerShake();
      return;
    }
    if(!validatePhoneNumber(phoneNumber)){
      setErrorMessage('Please enter a valid phone number.');
      setLoading(false);
      triggerShake();
      return;
    }
    if(!validatePassword(password)){
      setErrorMessage(
        'Password must meet the following criteria:\n' +
      '- Be at least 8 characters long\n' +
      '- Contain at least one uppercase letter (A-Z)\n' +
      '- Contain at least one lowercase letter (a-z)\n' +
      '- Contain at least one number (0-9)\n' +
      '- Contain at least one special character (e.g., !@#$%^&*)'
      
        );
      setLoading(false);
      triggerShake();
      return;
    }
    const userData = {
      first_name: firstName,
      last_name: lastName,
      username: username,
      email: email,
      phone_number: phoneNumber,
      password: password,
      isVerified: false,
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
        setFirstName('');
        setLastName('');
        setUsername('');
        setEmail('');
        setPhoneNumber('');
        setPassword('');
        if(!data?.isVerified){
          navigation.navigate('verification');
        }else{
          navigation.navigate('(tabs)');
          console.log('for some reason you were not verified...');
        }
      } else {
        setErrorMessage(data.error || 'Registration failed. Please try again.');
        console.error('Registration error:', data);
        Alert.alert('Error', data.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Network error. Please check your connection and try again.');
      console.error('Registration network error:', error);
      Alert.alert('Error', 'Network error. Please check your connection and try again.');
    } finally{
      setLoading(false);
    }

  };

  const triggerShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  const errorTextStyle = [
    styles.error,
    { transform: [{ translateX: shakeAnimation }] }, // Apply the shake animation
  ];

  return (
    <ScrollView style={styles.scrollViewContainer} contentContainerStyle={styles.container}>
      <Text style={styles.header}>Create an Account</Text>
      <Text style={styles.text}>Please fill out fields.</Text>
      {errorMessage ? <Animated.Text style={errorTextStyle}>{errorMessage}</Animated.Text> : null} {/* Add error message */}


      <TextInput
        style={styles.input}
        placeholder="First Name"
        placeholderTextColor="#4760a6"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        placeholderTextColor="#4760a6"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#4760a6"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#4760a6"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        placeholderTextColor="#4760a6"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#4760a6"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
  
      <View>
          <Button label="Sign Up" targetScreen="loginUser"
          style={{ height: '80%', width: '100%'}} // Override button styles
          onPress={handleSignUp}
          />
      </View>
      <View style={styles.loginContainer}>
        <Text style={styles.haveAccountText}>Have an account?</Text>
        <TouchableOpacity onPress={handleLoginPress}>
          <Text style={styles.loginLink}> Login</Text>
        </TouchableOpacity>
      </View>
      {loading && (
        <View style={styles.loadingContainer}> {/* Add loading indicator container */}
          <ActivityIndicator size="large" color="#1e3a8a" />
        </View>
      )}

      {successMessage && (
        <Animated.View style={[styles.successContainer, { opacity: fadeAnimation }]}> {/* Add success notification */}
          <Text style={styles.successText}>{successMessage}</Text>
        </Animated.View>
      )}
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
    paddingTop: 100,
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
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingBottom: 100,
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
    top: 60, 
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