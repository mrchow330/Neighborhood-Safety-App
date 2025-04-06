import { Text, View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router'; 
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito';
import { Image } from 'expo-image';
import Button from '@/components/Button';

export default function Index() {
  const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>; // Show a loading state while fonts load
  }
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../../assets/images/neighborhood-watch-sign.png')}
        // placeholder={{ blurhash }}
        contentFit="cover"
        transition={1000}
      />

      <Text style={styles.header}>Welcome to {"\n"} HoodWatch (name WIP)</Text>
      {/* <Link href='/about'>about</Link> */}
      <View>
        <Button label="Report an issue" targetScreen="reportIssue"/>
        <Button label="My Reports" targetScreen="reports"/>
        <Button label="View Live Map" targetScreen="map"/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  text: {
    color: '#1E293B',
    fontFamily: 'Nunito_400Regular'
  },
  header:{
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20,
    color: '#1e3a8a',
    fontWeight: 'bold',
  },
  image:{
    width: 200, // Set a fixed width
    height: 200, // Set a fixed height
    resizeMode: 'contain', 
  }
});
