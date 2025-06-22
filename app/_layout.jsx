import { Slot, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { ContactsProvider } from "../context/ContactsContext";
import { UserProvider, useUser } from "../context/UserContext";
import { account } from "../lib/appwriteConfig";

function AuthLoader() {
  const router = useRouter();
  const { setUser, setRole } = useUser();
  const [loading, setLoading] = useState(true);
  const [redirected, setRedirected] = useState(false); // ✅ Avoid multiple redirects

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await account.get();
        const prefs = await account.getPrefs();

        setUser(user);
        setRole(prefs.role ?? "reporter");
      } catch (err) {
        console.log("❌ Not logged in:", err.message);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#1d3557" />
      </View>
    );
  }

  return <Slot />;
}

export default function RootLayout() {
  return (
    <UserProvider>
      <ContactsProvider>
        <AuthLoader />
      </ContactsProvider>
    </UserProvider>
  );
}
