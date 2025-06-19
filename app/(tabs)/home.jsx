// app/(tabs)/home.jsx

import * as Location from "expo-location";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, []);

  const handleSOSPress = () => {
    Alert.alert("🚨 SOS Alert Sent!", "Help is on the way.");
    // Add logic later for notifying contacts, nearby users, etc.
  };

  return (
    <View style={styles.container}>
      {/* Live Location Display */}
      <View style={styles.locationContainer}>
        <Text style={styles.locationTitle}>Your Live Location:</Text>
        {errorMsg ? (
          <Text style={styles.locationText}>{errorMsg}</Text>
        ) : location ? (
          <Text style={styles.locationText}>
            Lat: {location.latitude.toFixed(4)} | Lon:{" "}
            {location.longitude.toFixed(4)}
          </Text>
        ) : (
          <Text style={styles.locationText}>Fetching location...</Text>
        )}
      </View>

      {/* SOS Button */}
      <TouchableOpacity style={styles.sosButton} onPress={handleSOSPress}>
        <Image
          source={require("../../assets/sos.png")} // your SOS image
          style={styles.sosImage}
        />
      </TouchableOpacity>

      {/* Instruction */}
      <Text style={styles.instructionText}>
        {"Press SOS if you're in danger."}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF4A4D",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  locationContainer: {
    position: "absolute",
    top: 60,
    alignItems: "center",
  },
  locationTitle: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
    marginBottom: 5,
  },
  locationText: {
    color: "#fff",
    fontSize: 14,
  },
  sosButton: {
    marginTop: -50,
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
  },
  sosImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  instructionText: {
    marginTop: 40,
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    fontWeight: "500",
  },
});
