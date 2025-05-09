import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import * as Linking from 'expo-linking';
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
    const handleOpenURL = (event: { url: string | null } | null) => {
      setIsChecking(true); // check new URL
      if (event?.url) {
        const { path, queryParams } = Linking.parse(event.url);

        const receivedmessage = queryParams?.message;
        const error = queryParams?.error;

        const getFirstQueryParam = (param: string | string[] | undefined): string | undefined => {
          if (Array.isArray(param)) {
            return param[0];
          }
          return param;
        };

        if (path === 'email-verified') {
          const successMessage = getFirstQueryParam(receivedmessage) || 'Email verified successfully! Redirecting to home...';
          setVerificationStatus(true);
          setMessage(successMessage);
          // After a short delay, navigate to home
          setTimeout(() => {
            navigation.navigate('loginUser'); 
          }, 15000);
        } else if (path === 'email-verification-failed') {
          const errorMessage = getFirstQueryParam(error) || 'Email verification failed.';
          setVerificationStatus(false);
          setMessage(errorMessage);
          setIsChecking(false);
        } else {
          setMessage('Checking verification status');
          setIsChecking(false); // Not a verification link
        }
      } else {
        setMessage('No verification link was found.');
        setIsChecking(false); // No URL
      }
    };

    // Get the initial URL when the app starts
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleOpenURL({ url });
      } else {
        setMessage('Waiting for verification link...');
        setIsChecking(false); // No initial URL
      }
    });

    // Listen for subsequent URL events
    const subscription = Linking.addEventListener('url', handleOpenURL);
    return () => subscription.remove();
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
        {/* Future: Add Resend Email Button here */}
      </View>
    );
  } else {
    content = (
      <View style={styles.statusContainer}>
        <Text style={styles.title}>Verify Your Email</Text>
        <Text style={styles.messageText}>Please check your email <Text style={styles.boldText}>(including your spam!)</Text> and click the verification link we've sent.</Text>
        <Text style={styles.infoText}>You will be redirected to the login page shortly.</Text>
        {/* Future: Add Resend Email Button here */}
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