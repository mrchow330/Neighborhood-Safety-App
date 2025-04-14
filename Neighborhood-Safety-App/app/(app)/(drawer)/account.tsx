import { Text, View, StyleSheet, Pressable } from 'react-native';
import {useSession} from '../../../components/ctx';

export default function AccountScreen() {
  const {signOut} = useSession();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Accounts</Text>

      {/*add profile, username, etc here*/}

      <Pressable style={styles.logoutButton} onPress = {signOut}>
        <Text style={styles.logoutText}>Log Out</Text>
      </Pressable>
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
  logoutButton: {
    marginTop: 24,
    backgroundColor: '#EF4444',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  logoutText: {
    color: 'white',
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 16,
  },
});