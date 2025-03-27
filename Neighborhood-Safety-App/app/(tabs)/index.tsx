import { Text, View, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router'; 
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

export default function Index() {
  return (
    <View style={styles.container}>
      
      {/* <View style={styles.buttonContainer}>
        <Button
          title="Press me"
          
          onPress={() => Alert.alert('default button')}
        />
      </View> */}

      <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => Alert.alert('default button')}>
          <Text style = {styles.buttonText}>View Live Map</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => Alert.alert('default button')}>
          <Text style={styles.buttonText}>Submit a Report</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
  buttonContainer: {
    backgroundColor: '#6bcfd6',
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 40,
    paddingRight: 40,
    margin: 10,
    width: 300,
    height: 50,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText:{
    fontSize: 18,
  }
});
