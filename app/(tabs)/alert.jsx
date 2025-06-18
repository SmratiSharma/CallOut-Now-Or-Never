import { useNavigation } from "@react-navigation/native";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function AlertScreen() {
  const navigation = useNavigation();

  const handleCancelAlert = () => {
    // Future: Stop alert, reset location, etc.
    navigation.goBack();
  };

  const handleViewLocation = () => {
    // Future: Navigate to Map or Location screen
    alert("Map view coming soon!");
  };

  return (
    <View style={styles.container}>
      {/* Shield or Checkmark Icon */}
      <Text style={styles.icon}>🛡️</Text>

      {/* Success Message */}
      <Text style={styles.title}>Alert Sent Successfully!</Text>

      {/* Informative Text */}
      <Text style={styles.subtitle}>
        Your location has been shared with nearby users and authorities.
      </Text>
      <Text style={styles.subtitle}>Help is on the way.</Text>

      {/* Activity Spinner */}
      <ActivityIndicator
        size="large"
        color="#2e7d32"
        style={{ marginVertical: 20 }}
      />

      {/* Action Buttons */}
      <TouchableOpacity style={styles.button} onPress={handleViewLocation}>
        <Text style={styles.buttonText}>📍 View Location Shared</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={handleCancelAlert}>
        <Text style={styles.cancelText}>🚨 Cancel Alert</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d6f5e3", // soft green
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  icon: {
    fontSize: 60,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 10,
    color: "#2e7d32",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 30,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  cancelButton: {
    marginTop: 20,
    paddingVertical: 10,
  },
  cancelText: {
    color: "#b71c1c",
    fontWeight: "bold",
    fontSize: 16,
  },
});
