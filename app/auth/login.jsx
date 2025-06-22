import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useUser } from "../../context/UserContext"; // 🔁 Make sure path is correct
import { account } from "../../lib/appwriteConfig";

export default function LoginScreen() {
  const router = useRouter();
  const { setUser, setRole } = useUser(); // 👈 Add this

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      console.log("🔍 [Login Screen] Checking session…");
      try {
        const user = await account.get();
        const prefs = await account.getPrefs();
        console.log("✅ Logged-in user:", user.email, "| Role:", prefs.role);

        if (prefs.role === "responder") {
          console.log("→ Redirecting to /responder");
          router.replace("/responder");
        } else {
          console.log("→ Redirecting to /(tabs)/home");
          router.replace("/(tabs)/home");
        }
      } catch {
        console.log("🚫 Not logged in — staying on login");
      }
    };
    checkIfLoggedIn();
  }, []);

  const handleLogin = async () => {
    try {
      // Step 1: Login
      await account.createEmailPasswordSession(email, password);

      // Step 2: Fetch user info and preferences
      const user = await account.get();
      const prefs = await account.getPrefs();

      // Step 3: Set context
      setUser(user);
      setRole(prefs.role);

      // Step 4: Navigate based on role
      if (prefs.role === "responder") {
        router.replace("/responder");
      } else {
        router.replace("/(tabs)/home");
      }
    } catch (error) {
      Alert.alert("Login Failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login to CallOut</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Link style={styles.link} href="/auth/register">
        {"Don't have an account? Register Instead"}
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#1d3557",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#1d3557",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  link: {
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
