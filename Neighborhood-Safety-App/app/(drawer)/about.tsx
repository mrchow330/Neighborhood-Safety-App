import { Text, View, StyleSheet, Linking, TouchableOpacity, ScrollView } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>About Us</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Team Prodigies</Text>
          <Text style={styles.bodyText}>
            Wardiyah Rammazy, Eric Chow, Cailer Kellenberger, Mason Breidenbach, Caleb Ribeiro
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>MIT License</Text>
          <Text style={styles.bodyText}>
          Copyright (c) 2025 Team Prodigies(?) {"\n"}{"\n"}

          Permission is hereby granted, free of charge, to any person obtaining a copy
          of this software and associated documentation files (the "Software"), to deal
          in the Software without restriction, including without limitation the rights
          to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
          copies of the Software, and to permit persons to whom the Software is
          furnished to do so, subject to the following conditions:{"\n"}{"\n"}

          The above copyright notice and this permission notice shall be included in all
          copies or substantial portions of the Software.{"\n"}{"\n"}

          THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
          IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
          FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
          AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
          LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
          OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
          SOFTWARE.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Affiliation</Text>
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