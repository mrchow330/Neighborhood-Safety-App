import { Text, View, StyleSheet } from "react-native";

// OrderedList component
const OrderedList = ({ items }: { items: string[] }) => {
  return (
    <View>
      {items.map((item, index) => {
        const[bold, normal] = item.split(":");
        return(
        <Text key={index} style={styles.text}>
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
    <View style={styles.container}>
      <Text style={styles.header}>Community Guidelines</Text>
      <OrderedList items={["Be Respectful: Treat others with kindness and understanding", "Report responsibly: This app is not intended to settle personal disputes or as an outlet for personal bias. Only report real safety concerns. False or exaggerated reports slow down responses and waste resources.", "Privacy Matters: No sharing personal info or private addresses without consent.", "Engage, Don't Just Observe: If you see something, say something. Safety is a shared responsibility, and action makes a difference. "]} />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: 30
  },
  text: {
    color: "#1E293B",
    fontFamily: "Nunito_400Regular",
    fontSize: 16,
  },
  boldText:{
    color: "#1e3a8a",
    fontWeight: 'bold'
  },
  header: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 20,
    color: "#1e3a8a",
    fontWeight: "bold",
  },
});
