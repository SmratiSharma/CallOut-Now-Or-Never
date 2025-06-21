import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { account, ID } from "../../lib/appwriteConfig";

export default function RegisterScreen() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("reporter"); // default role

  const handleRegister = async () => {
    try {
      // Step 1: Create account
      await account.create(ID.unique(), email, password, name);

      // Step 2: Auto-login after registration
      await account.createEmailPasswordSession(email, password);

      // Step 3: Save role in Appwrite preferences
      await account.updatePrefs({ role });

      // Step 4: Navigate to home (we'll redirect properly after login)
      if (role === "responder") {
        router.replace("/responder");
      } else {
        router.replace("/(tabs)/home");
      }
    } catch (error) {
      console.log("Register Error:", error);
      Alert.alert("Registration Failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        autoCapitalize="none"
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />

      <Text style={styles.label}>Select Your Role:</Text>
      <View style={styles.roleContainer}>
        <TouchableOpacity
          style={[
            styles.roleButton,
            role === "reporter" && styles.selectedRole,
          ]}
          onPress={() => setRole("reporter")}
        >
          <Text style={styles.roleText}>Reporter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.roleButton,
            role === "responder" && styles.selectedRole,
          ]}
          onPress={() => setRole("responder")}
        >
          <Text style={styles.roleText}>Responder</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <Link style={styles.link} href="/auth/login">
        Already have an account? Login instead
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
  label: {
    alignSelf: "flex-start",
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "500",
  },
  roleContainer: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 10,
  },
  roleButton: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#1d3557",
    paddingHorizontal: 20,
  },
  selectedRole: {
    backgroundColor: "#1d3557",
  },
  roleText: {
    color: "#1d3557",
    fontWeight: "600",
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
