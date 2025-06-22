import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { account } from "../../lib/appwriteConfig";

export default function ResponderLayout() {
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
        tabBarActiveTintColor: "#1d3557",
        tabBarInactiveTintColor: "#ccc",
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        headerShown: false, // optional, if you want full-screen tab
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "SOS Calls",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="report-problem" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="location"
        options={{
          tabBarLabel: "Live Location",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="location-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
