import { Query } from "appwrite";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SosCard from "../../components/SosCard";
import { useUser } from "../../context/UserContext";
import { databases, ID } from "../../lib/appwriteConfig";
const dummyData = [
  { id: "1", name: "Anonymous", distance: "250m", time: "1 min ago" },
  { id: "2", name: "Neha Sharma", distance: "700m", time: "3 min ago" },
];

export default function ResponderHomeScreen() {
  const [location, setLocation] = useState(null);
  const [nearbySosCalls, setNearbySosCalls] = useState([]);

  const { user } = useUser();

  useEffect(() => {
    const saveResponderLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("❌ Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      try {
        const userId = user?.$id;
        const name = user?.name;

        if (!userId || !name) return;

        const existing = await databases.listDocuments(
          "68597f2c001c5885e909",
          "68597f3200311deb51f3",
          [Query.equal("userId", userId)]
        );

        if (existing.total > 0) {
          await databases.updateDocument(
            "68597f2c001c5885e909",
            "68597f3200311deb51f3",
            existing.documents[0].$id,
            {
              latitude,
              longitude,
              updatedAt: new Date().toISOString(),
            }
          );
        } else {
          await databases.createDocument(
            "68597f2c001c5885e909",
            "68597f3200311deb51f3",
            ID.unique(),
            {
              userId,
              name,
              latitude,
              longitude,
              updatedAt: new Date().toISOString(),
            }
          );
        }

        console.log("📍 Location saved:", latitude, longitude);
      } catch (error) {
        console.error("❌ Failed to save location:", error.message);
      }
    };

    if (user) saveResponderLocation();
  }, [user]);

  const getDistanceInKm = (
    responderLat,
    responderLng,
    reporterLat,
    reporterLng
  ) => {
    const toRad = (deg) => (deg * Math.PI) / 180.0;

    const dLat = toRad(reporterLat - responderLat);
    const dLon = toRad(reporterLng - responderLng);

    const lat1Rad = toRad(responderLat);
    const lat2Rad = toRad(reporterLat);

    const a =
      Math.pow(Math.sin(dLat / 2), 2) +
      Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1Rad) * Math.cos(lat2Rad);

    const earthRadius = 6371; // in kilometers
    const c = 2 * Math.asin(Math.sqrt(a));
    return earthRadius * c;
  };

  useEffect(() => {
    if (!location) return;
    const fetchData = async () => {
      const response = await databases.listDocuments(
        "68597f2c001c5885e909",
        "685e891f00114175fde3"
      );
      const nearbySOS = response.documents;
      const responderLat = location.coords.latitude;
      const responderLng = location.coords.longitude;

      nearbySOS.filter((data) => {
        const reporterLat = data.latitude;
        const reporterLng = data.longitude;

        const distance = getDistanceInKm(
          responderLat,
          responderLng,
          reporterLat,
          reporterLng
        );

        return distance<=2;
      });
      setNearbySosCalls(nearbySOS);

    };
    fetchData();
  }, [location]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.heading}>Nearby SOS Calls</Text>
        <FlatList
          data={dummyData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <SosCard sos={item} />}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  heading: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
});
