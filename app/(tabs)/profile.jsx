import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { account } from "../../lib/appwriteConfig";

export default function ProfileScreen() {
  const [user, setUser] = useState(null);

  const options = [
    {
      title: "Live Location",
      onPress: () => handlePress("Live Location"),
    },
    { title: "History", onPress: () => handlePress("History") },
    { title: "App Info", onPress: () => handlePress("App Info") },
    { title: "Settings", onPress: () => router.push("/settings") }, // ✅ Navigate to settings
  ];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await account.get();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };

    fetchUser();
  }, []);

  const handlePress = (label) => {
    Alert.alert(label, `This will navigate to ${label} screen.`);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }} edges={["top"]}>
      <StatusBar style="dark" backgroundColor="#fff" />
      <View style={styles.container}>
        {/* Avatar */}
        <Image
          source={require("../../assets/avatar.jpg")} // Add your image in assets
          style={styles.avatar}
        />

        {/* Name & Email */}
        {user && (
          <>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </>
        )}

        {/* Options List */}
        <View style={styles.listContainer}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionItem}
              onPress={option.onPress} // use individual onPress handler
            >
              <Text style={styles.optionText}>{option.title}</Text>
              <View style={styles.separator}></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "#555",
    marginBottom: 30,
  },
  listContainer: {
    width: "80%",
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingTop: 20,
  },
  listItem: {
    paddingVertical: 18,
    paddingHorizontal: 10,
  },
  listText: {
    fontSize: 16,
    color: "#333",
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: "#e0e0e0",
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 20,
  },
});
