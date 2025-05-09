import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito';
import { Image } from 'expo-image';

const VerificationScreen = () => {

  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
  });

  const [verificationStatus, setVerificationStatus] = useState<boolean | null>(null);
  const navigation = useNavigation();
  const [message, setMessage] = useState('');
  const [isChecking, setIsChecking] = useState(true); // Initial loading state

 useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      setIsChecking(true);
      setMessage('Verifying...');
      //https://neighborhood-safety-backend-wardiyahs-projects.vercel.app/auth/verify-email
      //http://localhost:3000/api/users
      fetch('https://neighborhood-safety-backend.vercel.app/api/auth/verify-email?token=' + token, { 
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          setIsChecking(false);
          if (data.message === 'Email verified successfully!') {
            setVerificationStatus(true);
            setMessage(data.message);
            setTimeout(() => {
              navigation.navigate('loginUser'); 
            }, 2000);
          } else {
            setVerificationStatus(false);
            setMessage(data.error || 'Email verification failed.');
          }
        })
        .catch(error => {
          setIsChecking(false);
          setVerificationStatus(false);
          setMessage('Network error during verification.');
        });
    } else {
      setIsChecking(false);
      setMessage('Please check your email and click the verification link.');
    }
  }, [navigation]);

  let content;
  if (isChecking) {
    content = (
      <View style={styles.statusContainer}>
        <ActivityIndicator size="large" color="#1e3a8a" />
        <Text style={styles.statusText}>Verifying...</Text>
      </View>
    );
  } else if (verificationStatus === true) {
    content = (
      <View style={styles.statusContainer}>
        <Text style={styles.title}>Email Verified!</Text>
        <Text style={styles.messageText}>{message}</Text>
        <Text style={styles.infoText}>Redirecting to login...</Text>
      </View>
    );
  } else if (verificationStatus === false) {
    content = (
      <View style={styles.statusContainer}>
        <Text style={styles.title}>Verification Failed</Text>
        <Text style={styles.messageText}>{message}</Text>
        <Text style={styles.infoText}>Please try again or request a new link.</Text>
      </View>
    );
  } else {
    content = (
      <View style={styles.statusContainer}>
        <Text style={styles.title}>Verify Your Email</Text>
        <Text style={styles.messageText}>Please check your email <Text style={styles.boldText}>(including your spam!)</Text> and click the verification link we've sent.</Text>
        <Text style={styles.infoText}>You will be redirected to the login page shortly.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/images/temp-logo.png')}
        contentFit="cover"
        transition={1000}
      />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  statusContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#1e3a8a',
    fontFamily: 'Nunito_700Bold',
  },
  messageText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
    marginBottom: 15,
    fontFamily: 'Nunito_400Regular',
  },
  statusText: {
    marginTop: 10,
    fontSize: 16,
    color: '#1e3a8a',
    fontFamily: 'Nunito_400Regular',
  },
  successText: { // Removed - using messageText with successTitle
    color: 'green',
    marginTop: 20,
    textAlign: 'center',
    fontFamily: 'Nunito_400Regular',
  },
  errorText: { // Removed - using messageText with errorTitle
    color: 'red',
    marginTop: 20,
    textAlign: 'center',
    fontFamily: 'Nunito_400Regular',
  },
  infoText: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
    fontFamily: 'Nunito_400Regular',
  },
  image:{
    width: 200, // Set a fixed width
    height: 200, // Set a fixed height
    resizeMode: 'contain', 
  },
  boldText:{
    fontWeight: 'bold',
  }
});

export default VerificationScreen;