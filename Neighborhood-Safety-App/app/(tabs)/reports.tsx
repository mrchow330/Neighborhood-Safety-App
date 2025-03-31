import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function ReportScreen() {
  const [selectedIssue, setSelectedIssue] = useState("");
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Reports</Text>
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
    color: '#1E293B',
    fontFamily: 'Nunito_400Regular'
  },
  picker: {
    height: 50,
    width: 250,
    color: '#1E293B',
  },
});