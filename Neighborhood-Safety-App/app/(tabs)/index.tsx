import { Text, View, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router'; 
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito';

export default function Index() {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>; // Show a loading state while fonts load
  }
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
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#1E293B',
    fontFamily: 'Nunito_400Regular'
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
    fontFamily: 'Nunito_400Regular'
  }
});
