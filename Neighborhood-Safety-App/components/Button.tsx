import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, TextStyle, View, Pressable, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';  
import { NativeStackNavigationProp } from '@react-navigation/native-stack';  // For proper typing
import { RootStackParamList } from '../app/(app)/_layout'; 

type Props = {
  label: string;
  targetScreen: keyof RootStackParamList;  // Ensure the targetScreen is typed
  style? : StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress?: ()=> void;
};


export default function Button({ label, targetScreen, style, textStyle, onPress}: Props) {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlePress = () => {
    if (onPress) {
      onPress(); // Execute the custom onPress function if provided
    } else if (targetScreen) {
      navigation.navigate(targetScreen);
    }
  };

  return (
    <View style={styles.buttonContainer}>
      <Pressable style={[styles.button, style]} onPress={handlePress}>
        <Text style={[styles.buttonLabel, textStyle]}>{label}</Text>
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
    width: '90%',
    height: '90%',
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
