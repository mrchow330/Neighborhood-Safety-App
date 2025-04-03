import { Stack } from "expo-router";

export default function RootLayout() {
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


// import { Drawer } from 'expo-router/drawer';
// import { Stack } from 'expo-router'; 
// import TabLayout from './(drawer)/(tabs)/_layout'; 

// export default function Layout() {
//   return (
//     <Stack>
//       {/* Stack screen for Report Issue */}
//       <Stack.Screen
//         name="reportIssue"
//         options={{ title: 'Report Issue' }}
//       />

//       {/* Default drawer screen */}
//       <Drawer>
//         <Drawer.Screen name="tabs" options={{ headerShown: true, title:'' }} />
//         <Drawer.Screen name="about" options={{ title: "About" }} />
//         <Drawer.Screen name="account" options={{ title: "Account" }} />
//       </Drawer>
//     </Stack>
//   );
// }


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
};