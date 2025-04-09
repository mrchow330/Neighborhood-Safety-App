import React from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';  
import { NativeStackNavigationProp } from '@react-navigation/native-stack';  // For proper typing
import { RootStackParamList } from '../app/(authorized)/_layout'; 

type Props = {
  label: string;
  targetScreen: keyof RootStackParamList;  // Ensure the targetScreen is typed
};


export default function Button({ label, targetScreen}: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress=
      {() => navigation.navigate(targetScreen)}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 300,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: "#1e3a8a"
  },
  buttonLabel: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
