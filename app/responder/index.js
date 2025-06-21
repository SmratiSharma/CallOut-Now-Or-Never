import { FlatList, StyleSheet, Text, View } from "react-native";
import SosCard from "../../components/SosCard";

const dummyData = [
  { id: "1", name: "Anonymous", distance: "250m", time: "1 min ago" },
  { id: "2", name: "Neha Sharma", distance: "700m", time: "3 min ago" },
];

export default function ResponderHomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Nearby SOS Calls</Text>
      <FlatList
        data={dummyData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <SosCard sos={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  heading: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
});
