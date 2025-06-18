import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="location"
        options={{
          title: "Location",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="map-marker" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
