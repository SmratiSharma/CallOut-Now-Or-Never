import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useUser } from "../../context/UserContext";
import { account } from "../../lib/appwriteConfig";

export default function SettingsScreen() {
  const router = useRouter();
  const { setUser, setRole } = useUser();

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
      setRole(null);
      router.replace("/");
    } catch (error) {
      Alert.alert("Logout Failed", error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 40 }}>
      <View style={styles.container}>
        <Text style={styles.heading}>⚙️ Settings</Text>

        <TouchableOpacity
          style={styles.optionRow}
          onPress={() => {
            /* handle notification toggle */
          }}
        >
          <Ionicons name="notifications-outline" size={24} color="#1d3557" />
          <Text style={styles.optionText}>Notification Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionRow}
          onPress={() => {
            /* navigate to privacy policy */
          }}
        >
          <Ionicons name="shield-checkmark-outline" size={24} color="#1d3557" />
          <Text style={styles.optionText}>Privacy Policy</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionRow}
          onPress={() => {
            /* navigate to about screen */
          }}
        >
          <Ionicons
            name="information-circle-outline"
            size={24}
            color="#1d3557"
          />
          <Text style={styles.optionText}>About App</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionRow}
          onPress={() => {
            /* handle contact support */
          }}
        >
          <Ionicons name="chatbox-ellipses-outline" size={24} color="#1d3557" />
          <Text style={styles.optionText}>Contact Support</Text>
        </TouchableOpacity>

        <View style={styles.logoutButtonContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#1d3557",
  },
  logoutButtonContainer: {
    position: "absolute",
    bottom: 80,
    left: 20,
    right: 20,
  },
  logoutButton: {
    backgroundColor: "#e63946",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  optionText: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 15,
    color: "#1d3557",
  },
});
