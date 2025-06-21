import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function ResponderLayout() {
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
