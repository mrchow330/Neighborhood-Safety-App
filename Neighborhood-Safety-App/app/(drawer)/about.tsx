import { Text, View, StyleSheet, Linking, TouchableOpacity, ScrollView } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>About Us</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Team Prodigies</Text>
          <Text style={styles.bodyText}>
            To contact our team regarding a report, issue, or anything related to our service, please email or call:
          </Text>
          <TouchableOpacity onPress={() => Linking.openURL('mailto:help@blockwatch.com')}>
            <Text style={styles.link}>help@blockwatch.com</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('tel:9783330023')}>
            <Text style={styles.link}>978-333-0023</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Local Authorities</Text>
          <Text style={styles.bodyText}>
            To contact local authorities please refer to this list of local hot-lines:
          </Text>
          <TouchableOpacity onPress={() => Linking.openURL('https://placeholderlink.com')}>
            <Text style={styles.link}>placeholderlink.com</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.emergency}>In the case of an emergency, please dial: 911</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Office and Mailing Location</Text>
          <Text style={styles.bodyText}>Bradley University</Text>
          <Text style={styles.bodyText}>501 W. Bradley Ave., Peoria, IL 61625</Text>
        </View>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
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
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#CBD5E1',
    paddingBottom: 10,
    fontFamily: 'Nunito_400Regular',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
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