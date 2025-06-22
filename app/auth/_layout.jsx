import { Slot, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { account } from "../../lib/appwriteConfig";

export default function AuthLayout() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const user = await account.get();
        const prefs = await account.getPrefs();

        // If logged in, redirect to the proper home page
        if (prefs.role === "responder") {
          router.replace("/responder");
        } else {
          router.replace("/(tabs)/home");
        }
      } catch {
        // Not logged in, let them see login/register
      } finally {
        setChecking(false);
      }
    };

    checkSession();
  }, []);

  if (checking) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#1d3557" />
      </View>
    );
  }

  return <Slot />;
}
