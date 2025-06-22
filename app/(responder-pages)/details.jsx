import { useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Linking,
  Platform,
  SafeAreaView,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";

export default function ResponderDetailScreen() {
  const { name, distance, time } = useLocalSearchParams();
  const router = useRouter();

  const responderLat = 28.6139;
  const responderLng = 77.209;

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${responderLat},${responderLng}`;
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Back Arrow */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={28} color="#1d3557" />
      </TouchableOpacity>

      <Text style={styles.title}>SOS Detail</Text>

      <View style={styles.detailCard}>
        <Text style={styles.label}>
          Responder: <Text style={styles.value}>{name}</Text>
        </Text>
        <Text style={styles.label}>
          Distance: <Text style={styles.value}>{distance}</Text>
        </Text>
        <Text style={styles.label}>
          Time: <Text style={styles.value}>{time}</Text>
        </Text>
      </View>

      {/* Map Card */}
      <View style={styles.mapCard}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: responderLat,
            longitude: responderLng,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{ latitude: responderLat, longitude: responderLng }}
            title="Responder Location"
          />
        </MapView>
      </View>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.buttonPrimary} onPress={openGoogleMaps}>
          <Text style={styles.buttonText}>📍 Navigate</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "android" ? 40 : 20,
  },
  backButton: {
    position: "absolute",
    top: Platform.OS === "android" ? 40 : 20,
    left: 16,
    zIndex: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1d3557",
    textAlign: "center",
    marginBottom: 10,
  },
  detailCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
  },
  value: {
    fontWeight: "600",
    color: "#000",
  },
  mapCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    marginVertical: 20,
    height: 300,
  },
  map: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  buttonPrimary: {
    flex: 1,
    backgroundColor: "#1d3557",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonSecondary: {
    flex: 1,
    backgroundColor: "#457b9d",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
