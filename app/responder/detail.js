import { useLocalSearchParams } from "expo-router";
import { Button, Linking, StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function ResponderDetailScreen() {
  const { name, distance, time } = useLocalSearchParams();

  // Dummy responder location
  const responderLat = 28.6139; // Replace with real data later
  const responderLng = 77.209;

  const openGoogleMaps = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${responderLat},${responderLng}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SOS Detail</Text>
      <Text style={styles.label}>
        Responder: <Text style={styles.value}>{name}</Text>
      </Text>
      <Text style={styles.label}>
        Distance: <Text style={styles.value}>{distance}</Text>
      </Text>
      <Text style={styles.label}>
        Time: <Text style={styles.value}>{time}</Text>
      </Text>

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

      <View style={styles.buttonContainer}>
        <Button title="Navigate in Google Maps" onPress={openGoogleMaps} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  label: { fontSize: 18, marginTop: 10 },
  value: { fontWeight: "600" },
  map: {
    height: 250,
    width: "100%",
    borderRadius: 10,
    marginTop: 20,
  },
  buttonContainer: { marginTop: 30 },
});
