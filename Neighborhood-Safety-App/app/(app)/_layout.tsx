import { Redirect, Stack } from "expo-router";
import {Text, StyleSheet} from "react-native";
import {useSession} from '../../components/ctx'; 

export default function AppLayout(){
  const {session, isLoading} = useSession();

  if (isLoading){
    //splash screen
    return <Text style={styles.text}>Loading...</Text>
  }

  if (!session){
    //redirect to sign in if not signed in
    return <Redirect href="/sign-in"/>;
  }
  return (
        <Stack>
          {/* Main drawer layout is the default */}
          <Stack.Screen 
            name="(drawer)" 
            options={{ headerShown: false, title:"" }} 
          />
    
          {/* Report Issue is pushed on top of the drawer */}
          <Stack.Screen 
            name="reportIssue" 
            options={{ title: "Report Issue" }} 
          />
        </Stack>
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

export type RootStackParamList = {
  "(tabs)": undefined;  // This screen has no parameters
  "+not-found": undefined;  
  about: undefined;  
  reportIssue: undefined;  
  index: undefined;  
  map: undefined;  
  reports: undefined;  
  account: undefined;  
  communityGuidlines : undefined;
  login: undefined;
  'sign-up': undefined;
};


// export default function RootLayout() {
//   return (
//     <Stack>
//       {/* Main drawer layout is the default */}
//       <Stack.Screen 
//         name="(drawer)" 
//         options={{ headerShown: false, title:"" }} 
//       />

//       {/* Report Issue is pushed on top of the drawer */}
//       <Stack.Screen 
//         name="reportIssue" 
//         options={{ title: "Report Issue" }} 
//       />
//     </Stack>
//   );
// }