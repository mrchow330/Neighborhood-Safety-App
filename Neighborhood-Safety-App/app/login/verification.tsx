import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import * as Linking from 'expo-linking';
import { useNavigation } from '@react-navigation/native';
const VerificationScreen = () => {
  const [verificationStatus, setVerificationStatus] = useState<boolean | null>(null);
  const [verificationMessage, setVerificationMessage] = useState('');
  const navigation = useNavigation();
  const [isChecking, setIsChecking] = useState(true); // Initial loading state

  useEffect(() => {
    const handleOpenURL = (event: { url: string | null } | null) => {
      setIsChecking(true); // Start checking again on new URL
      if (event?.url) {
        const { path, queryParams } = Linking.parse(event.url);

        const message = queryParams?.message;
        const error = queryParams?.error;

        const getFirstQueryParam = (param: string | string[] | undefined): string | undefined => {
          if (Array.isArray(param)) {
            return param[0];
          }
          return param;
        };

        if (path === 'email-verified') {
          const successMessage = getFirstQueryParam(message) || 'Email verified successfully! Redirecting to home...';
          setVerificationStatus(true);
          setVerificationMessage(successMessage);
          // After a short delay, navigate to home
          setTimeout(() => {
            navigation.navigate('loginUser'); 
          }, 2000);
        } else if (path === 'email-verification-failed') {
          const errorMessage = getFirstQueryParam(error) || 'Email verification failed.';
          setVerificationStatus(false);
          setVerificationMessage(errorMessage);
          setIsChecking(false);
        } else {
          setIsChecking(false); // Not a verification link
        }
      } else {
        setIsChecking(false); // No URL
      }
    };

    // Get the initial URL when the app starts
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleOpenURL({ url });
      } else {
        setIsChecking(false); // No initial URL
      }
    });

    // Listen for subsequent URL events
    const subscription = Linking.addEventListener('url', handleOpenURL);
    return () => subscription.remove();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Your Email</Text>
      {isChecking && <ActivityIndicator size="large" />}
      {verificationStatus === true && (
        <Text style={styles.successText}>{verificationMessage}</Text>
      )}
      {verificationStatus === false && (
        <Text style={styles.errorText}>{verificationMessage}</Text>
      )}
      {verificationStatus === null && !isChecking && (
        <Text style={styles.infoText}>Please check your email and click the verification link we've sent.</Text>
      )}
      {/* Later: Add a button to resend verification email */}
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  successText: {
    color: 'green',
    marginTop: 20,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 20,
    textAlign: 'center',
  },
  infoText: {
    marginTop: 20,
    textAlign: 'center',
  },
});

export default VerificationScreen;