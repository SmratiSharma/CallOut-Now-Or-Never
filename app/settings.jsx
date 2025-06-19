import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { account } from "../lib/appwriteConfig";


export default function SettingsScreen() {
  const router = useRouter();
  const handleLogout = async () => {
  try {
    await account.deleteSession("current");
    router.replace("/"); // back to landing screen
  } catch (error) {
    console.log("Logout Error:", error.message);
  }
};


  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#1d3557" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Settings</Text>

      {/* Settings Options */}
      <View style={styles.option}>
        <Text style={styles.label}>Update Name</Text>
      </View>
      <View style={styles.option}>
        <Text style={styles.label}>Update Email</Text>
      </View>
      <View style={styles.option}>
        <Text style={styles.label}>Update Location</Text>
      </View>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backText: {
    fontSize: 16,
    marginLeft: 5,
    color: "#1d3557",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1d3557",
    marginBottom: 30,
    textAlign: "center",
  },
  option: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  label: {
    fontSize: 18,
    color: "#333",
  },
  logoutButton: {
    marginTop: "auto",
    backgroundColor: "#e63946",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
