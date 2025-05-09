// drawer/account.tsx

import AuthProvider, { useAuthSession } from "@/providers/AuthProvider";
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useFonts } from 'expo-font';
import { Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito';
import React from 'react';

export default function AccountScreen() {
  const { signOut, user } = useAuthSession();
  const [fontsLoaded] = useFonts({ Nunito_400Regular, Nunito_700Bold });

  if (!fontsLoaded) return <Text>Loading...</Text>;

  console.log(user);
  return (
    
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.header}>Account</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>User Info</Text>
            <Text style={styles.bodyText}>
              <Text style={styles.boldText}>Id:</Text> {user?.userId ?? 'N/A'}
            </Text>
            <Text style={styles.bodyText}>
              <Text style={styles.boldText}>Username:</Text> {user?.username ?? 'N/A'}
            </Text>
            <Text style={styles.bodyText}>
              <Text style={styles.boldText}>First Name:</Text> {user?.first_name ?? 'N/A'}
            </Text>
            <Text style={styles.bodyText}>
              <Text style={styles.boldText}>Last Name:</Text> {user?.last_name ?? 'N/A'}
            </Text>
            <Text style={styles.bodyText}>
              <Text style={styles.boldText}>Email:</Text> {user?.email ?? 'N/A'}
            </Text>
          </View>

          <View style={styles.section}>
            <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    color: '#1E293B',
    fontFamily: 'Nunito_400Regular',
  },
  logoutButton: {
    marginTop: 24,
    backgroundColor: '#1e3a8a',
    paddingVertical: 10,
    paddingHorizontal: 30,
    width: '10%',
    minWidth: 150,
    borderRadius: 8,
  },
  logoutText: {
    color: 'white',
    fontFamily: 'Nunito_400Regular',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  scrollContainer: {
    padding: 20,
    backgroundColor: '#F8FAFC',
    flexGrow: 1,
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E3a8a',
    textAlign: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#CBD5E1',
    paddingBottom: 10,
    fontFamily: 'Nunito_400Regular',
  },
  section: {
    marginBottom: 20,
    alignItems: 'flex-start',
    justifyContent: 'center',
    display: 'flex',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 10,
    fontFamily: 'Nunito_400Regular',
  },
  bodyText: {
    fontSize: 14,
    color: '#334155',
    marginBottom: 5,
    fontFamily: 'Nunito_400Regular',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
});
