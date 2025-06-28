import * as Location from "expo-location";
import { useRouter } from "expo-router";
import * as SMS from "expo-sms";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContacts } from "../../context/ContactsContext"; // path may vary
import { ID, databases } from "../../lib/appwriteConfig";

export default function HomeScreen() {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const { selectedContacts, setSelectedContacts, saveContacts } = useContacts();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let locationData = await Location.getCurrentPositionAsync({});
      setLocation(locationData.coords);

      // Reverse Geocoding
      let addressData = await Location.reverseGeocodeAsync(locationData.coords);
      if (addressData.length > 0) {
        const { locationName, street, city, district } = addressData[0];
        setAddress(`${locationName || street}, ${district || city}`);
      }

      const { latitude, longitude } = locationData.coords;

      try {
        const userId = user?.$id;
        const name = user?.name;

        if (!userId || !name) return;

        const existing = await databases.listDocuments(
          "68597f2c001c5885e909",
          "685e891f00114175fde3",
          [Query.equal("userId", userId)]
        );

        if (existing.total > 0) {
          await databases.updateDocument(
            "68597f2c001c5885e909",
            "685e891f00114175fde3",
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
            "685e891f00114175fde3",
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

        console.log("Location saved", latitude, longitude);
      } catch (error) {
        console.log("FAiled to save location", error);
      }
    })();
  }, [user]);

  const handleSOS = async () => {
    // 1. Ask for location permission
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      alert("Permission to access location was denied");
      return;
    }

    // 2. Get current location
    const location = await Location.getCurrentPositionAsync({});
    if (!location) {
      alert("Location not ready yet");
      return;
    }
    const { latitude, longitude } = location.coords;
    const mapLink = `https://maps.google.com/?q=${latitude},${longitude}`;

    // 3. Prepare message
    const message = `🚨 EMERGENCY ALERT 🚨\nPlease help me. Here's my live location:\n${mapLink}`;

    // 4. Extract phone numbers from selectedContacts
    const numbers = selectedContacts
      .map((contact) => contact.phoneNumbers?.[0]?.number)
      .filter(Boolean); // remove undefined/null

    if (numbers.length === 0) {
      alert("No emergency contacts with phone numbers");
      return;
    }

    // 5. Send SMS
    const { result } = await SMS.sendSMSAsync(numbers, message);
    console.log("SMS result:", result);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }} edges={["top"]}>
      <StatusBar style="dark" backgroundColor="#fff" />
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.locationBox}
          onPress={() => router.push("/map-view")}
        >
          <Text style={styles.locationLabel}>📍 You are here</Text>
          {address ? (
            <Text style={styles.coords}>{address}</Text>
          ) : location ? (
            <Text style={styles.coords}>
              {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
            </Text>
          ) : (
            <Text style={styles.coords}>Fetching location...</Text>
          )}
        </TouchableOpacity>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TouchableOpacity onPress={handleSOS}>
            <Image
              source={require("../../assets/sos.png")}
              style={styles.sosImage}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF4A4D",
    padding: 20,
    justifyContent: "flex-start", // keep top content at top
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  locationBox: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 14,
    elevation: 4,
    marginBottom: 30,
    alignItems: "center",
  },
  locationLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1d3557",
  },
  coords: {
    fontSize: 13,
    color: "#333",
    marginTop: 4,
  },
  sosImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
    justifyContent: "center",
  },
});
