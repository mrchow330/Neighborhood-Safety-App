import { Text, View, StyleSheet } from 'react-native';

export default function ReportIssue() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Report Issue form</Text>
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
});