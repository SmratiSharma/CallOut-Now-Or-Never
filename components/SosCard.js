import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function SosCard({ sos }) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        router.push({ pathname: "/responder/detail", params: sos })
      }
    >
      <Text style={styles.name}>{sos.name}</Text>
      <Text>
        {sos.distance} • {sos.time}
      </Text>
      <Text style={styles.respond}>Respond Now →</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFECEC",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  name: { fontSize: 18, fontWeight: "600" },
  respond: { marginTop: 8, color: "#FF4A4D", fontWeight: "bold" },
});
