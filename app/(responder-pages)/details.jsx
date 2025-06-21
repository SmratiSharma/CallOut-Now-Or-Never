import { useLocalSearchParams, useRouter } from "expo-router";
import { Button, Linking, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function ResponderDetailScreen() {
  const { name, distance, time } = useLocalSearchParams();
  const router = useRouter();

  // Dummy victim location (you'll replace with dynamic coordinates later)
  const victimLat = 28.6139;
  const victimLng = 77.209;

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${victimLat},${victimLng}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SOS Detail</Text>

      <View style={styles.infoCard}>
        <Text style={styles.label}>
          Victim Name: <Text style={styles.value}>{name}</Text>
        </Text>
        <Text style={styles.label}>
          Distance: <Text style={styles.value}>{distance}</Text>
        </Text>
        <Text style={styles.label}>
          Time: <Text style={styles.value}>{time}</Text>
        </Text>
      </View>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: victimLat,
          longitude: victimLng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{ latitude: victimLat, longitude: victimLng }}
          title="Victim Location"
        />
      </MapView>

      <View style={styles.buttonContainer}>
        <Button title="Navigate in Google Maps" onPress={openGoogleMaps} />
        <View style={{ marginTop: 10 }} />
        <Button title="Go Back" onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  infoCard: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  label: { fontSize: 18, marginTop: 10 },
  value: { fontWeight: "600" },
  map: {
    height: 250,
    width: "100%",
    borderRadius: 10,
  },
  buttonContainer: {
    marginTop: 30,
  },
});
