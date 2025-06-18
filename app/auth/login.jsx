import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { account } from "../../lib/appwriteConfig";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await account.createEmailSession(email, password);
      navigation.navigate("Home"); // replace 'Home' with your actual screen name
    } catch (error) {
      Alert.alert("Login failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
      <Text
        style={styles.switchText}
        onPress={() => navigation.navigate("Register")}
      >
        {"Don't have an account?"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  switchText: {
    marginTop: 15,
    color: "blue",
    textAlign: "center",
  },
});
// import React from "react";
// import { Text, View } from "react-native";

// export default function LoginScreen() {
//   return (
//     <View>
//       <Text>Login Screen</Text>
//     </View>
//   );
// }
