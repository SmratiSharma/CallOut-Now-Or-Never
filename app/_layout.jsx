import { Slot, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { account } from "../lib/appwriteConfig";
import { ContactsProvider } from "./context/ContactsContext";

export default function RootLayout() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await account.get(); // user is logged in
        router.replace("/home"); // navigate to home (tabs/index.jsx)
      } catch {
        router.replace("/"); // go to landing page (index.jsx)
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <ContactsProvider>
      <Slot />
    </ContactsProvider>
  );
}
