import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function LocationScreen() {
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

  const handleAlert = () => {
    router.push("/alert");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Current Location</Text>
      {errorMsg ? (
        <Text style={styles.error}>{errorMsg}</Text>
      ) : location ? (
        <>
          <Text style={styles.coords}>Latitude: {location.latitude}</Text>
          <Text style={styles.coords}>Longitude: {location.longitude}</Text>
          <Button title="Alert Now" onPress={handleAlert} />
        </>
      ) : (
        <Text>Fetching location...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  coords: {
    fontSize: 18,
    marginBottom: 10,
  },
  error: {
    color: "red",
  },
});
