import { Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { account } from "../../lib/appwriteConfig";

export default function TabsLayout() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        await account.get(); // Check if user is authenticated
      } catch {
        router.replace("/auth/login"); // Redirect if not logged in
      } finally {
        setChecking(false);
      }
    };

    checkSession();
  }, []);

  if (checking) return null; // You can add a loader here

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          paddingTop: 10,
          height: 80,
          // backgroundColor: "4CAF50",
        },
        tabBarActiveTintColor: "pink",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="contacts"
        options={{
          tabBarLabel: "Contacts",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile" // create profile.jsx for this to work
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
