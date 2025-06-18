import { useNavigation } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function LandingScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        // source={require("../assets/logo.png")} // replace with your logo path
        style={styles.logo}
        resizeMode="contain"
      />

      {/* App Name */}
      <Text style={styles.title}>CallOut</Text>

      {/* Login Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("auth/login")}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Register Button */}
      <TouchableOpacity
        style={[styles.button, styles.registerButton]}
        onPress={() => navigation.navigate("auth/register")}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#e63946",
  },
  button: {
    width: "80%",
    backgroundColor: "#1d3557",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  registerButton: {
    backgroundColor: "#457b9d",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});
