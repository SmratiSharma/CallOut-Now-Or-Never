import { Slot, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { account } from "../lib/appwriteConfig";

export default function RootLayout() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await account.get(); // checks if user is logged in
        router.replace("/(tabs)"); // go to home screen
      } catch (error) {
        router.replace("/"); // show landing screen
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  if (checkingAuth) return null; // OR a splash screen loader

  return <Slot />; // Render children
}
