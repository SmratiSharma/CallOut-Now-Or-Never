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
        const role = prefs.role ?? "reporter";
        setRole(role);

        if (!redirected) {
          if (role === "responder") {
            router.replace("/responder");
          } else {
            router.replace("/(tabs)/home");
          }
          setRedirected(true); // ✅ prevent re-navigation
        }
      } catch (err) {
        router.replace("/auth/login"); // fallback
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
