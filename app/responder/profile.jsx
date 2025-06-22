import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useUser } from "../../context/UserContext";

export default function ResponderProfileScreen() {
  const { user } = useUser();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* User Info */}
        <View style={styles.profileCard}>
          <Image
            source={require("../../assets/avatar.jpg")}
            style={styles.avatar}
          />
          <Text style={styles.name}>{user?.name ?? "Responder"}</Text>
          <Text style={styles.email}>{user?.email ?? ""}</Text>
        </View>

        {/* Options */}
        <View style={styles.optionCard}>
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => router.push("/responder/history")}
          >
            <MaterialIcons name="history" size={24} color="#1d3557" />
            <Text style={styles.optionText}>History</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => router.push("/(responder-pages)/settings")}
          >
            <Ionicons name="settings-outline" size={24} color="#1d3557" />
            <Text style={styles.optionText}>Settings</Text>
          </TouchableOpacity>


        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: "#f6f6f6",
  },
  container: {
    padding: 20,
    alignItems: "center",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  profileCard: {
    backgroundColor: "#fff",
    width: "100%",
    alignItems: "center",
    padding: 20,
    borderRadius: 16,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1d3557",
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    color: "#888",
    marginTop: 4,
  },
  optionCard: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 16,
    padding: 10,
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
