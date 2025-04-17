import { Text, View, StyleSheet, ScrollView } from "react-native";

// OrderedList component
const OrderedList = ({ items }: { items: string[] }) => {
  return (
    <View>
      {items.map((item, index) => {
        const[bold, normal] = item.split(":");
        return(
        <Text key={index} style={styles.bodyText}>
          <Text style={styles.boldText}>
            {index + 1}. {bold} {'\n'}

          </Text>
          {'      '}{normal}
        </Text>
      );
      })}
    </View>
  );
};

// Main component
export default function CommunityGuidelines() {
  return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.header}>Community Guidelines</Text>
  
          <View style={styles.section}>
            <OrderedList items={["Be Respectful: Treat others with kindness and understanding", "Report responsibly: This app is not intended to settle personal disputes or as an outlet for personal bias. Only report real safety concerns. False or exaggerated reports slow down responses and waste resources.", "Privacy Matters: No sharing personal info or private addresses without consent.", "Engage, Don't Just Observe: If you see something, say something. Safety is a shared responsibility, and action makes a difference. "]} />
   
          </View>
        </View>
      </ScrollView>
    );
}

// Styles
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
