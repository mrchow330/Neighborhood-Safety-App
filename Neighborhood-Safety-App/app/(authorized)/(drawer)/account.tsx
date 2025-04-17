import {useAuthSession} from "@/providers/AuthProvider";
import {useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import { useFonts } from 'expo-font';
import { Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito';


export default function AccountScreen() {
  const {signOut, token} = useAuthSession()
  const [tokenInUi, setTokenInUi] = useState<null|string|undefined>(null)

  const logout = () => {
     signOut();
  }

  // const callApi = () => {
  //   setTokenInUi(token?.current);
  // }
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>; // Show a loading state while fonts load
  }

  return (
    // <ScrollView>
    //   <View style={styles.container} >
    //     <TouchableOpacity style = {styles.logoutButton} onPress = {logout}>
    //       <Text style={styles.logoutText}>Logout</Text>
    //     </TouchableOpacity>
        
    //     {/* <Text>Make an API call with the stored AUTH token</Text>
    //     <Button title={"Call API"} onPress={callApi} />
    //     {tokenInUi &&
    //       <Text>{`Your API access token is ${tokenInUi}`}</Text>
    //     } */}
    //   </View>
    // </ScrollView>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>Account</Text>

        <View style={styles.section}>
          <TouchableOpacity style = {styles.logoutButton} onPress = {logout}>
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
    fontFamily: 'Nunito_400Regular'
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
    textAlign : 'center',
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
    alignItems: 'center',
    justifyContent: 'center',
    display : 'flex',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 5,
    fontFamily: 'Nunito_400Regular',
  },
  bodyText: {
    fontSize: 14,
    color: '#334155',
    marginBottom: 5,
    fontFamily: 'Nunito_400Regular',
  },
  boldText:{
    fontWeight: 'bold',
    color: '#1e3a8a'
  },
  link: {
    fontSize: 14,
    color: '#2563EB',
    textDecorationLine: 'underline',
    marginBottom: 5,
    fontFamily: 'Nunito_400Regular',
  },
  emergency: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#DC2626',
    fontFamily: 'Nunito_400Regular',
  },
});