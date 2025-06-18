import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

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

      let locationData = await Location.getCurrentPositionAsync({});
      setLocation(locationData.coords);
    })();
  }, []);

  const handleAlert = () => {
    router.push("/alert");
  };

  return (
    <View style={styles.container}>
      <Ionicons
        name="location-sharp"
        size={64}
        color="#e60000"
        style={{ marginBottom: 20 }}
      />

      <Text style={styles.title}>CallOut - Now or Never</Text>

      {errorMsg ? (
        <Text style={styles.text}>{errorMsg}</Text>
      ) : location ? (
        <Text style={styles.text}>
          Location: {location.latitude}, {location.longitude}
        </Text>
      ) : (
        <Text style={styles.text}>Fetching location...</Text>
      )}

      <Button title="Send Alert 🚨" onPress={handleAlert} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff", // White background so text/icons show up
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 20,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
});
