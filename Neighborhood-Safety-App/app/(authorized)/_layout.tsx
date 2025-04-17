import { Redirect, Stack } from "expo-router";
import {Text, StyleSheet, View} from "react-native";
import {ReactNode} from "react";
import {useAuthSession} from "@/providers/AuthProvider";

export default function AppLayout(): ReactNode{
  const {token, isLoading, isAuthenticated} = useAuthSession();

  if (isLoading){
    //splash screen
    return <Text style={styles.text}>Loading...</Text>
  }
  console.log('token check:', !token?.current);
  console.log('isloading', isLoading)
  if (!isAuthenticated){
    //redirect to sign in if not signed in
    return <Redirect href="/login"/>;
  }
  // return(
  //   <View>
  //     <Text>Commented out stack</Text>
  //   </View>
  // )
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
  loginUser: undefined;
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