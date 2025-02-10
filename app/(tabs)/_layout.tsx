import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ED8C39",
        tabBarInactiveTintColor: "#8c8c8c", // Gray for inactive
        tabBarLabelStyle: {
          fontSize: 12, // Smaller text size for labels
          fontWeight: "bold", // Bolder text for labels
        },
        tabBarStyle: {
          backgroundColor: "#ffffff", // White background
          paddingBottom: 10,
          height: 70,
          borderTopWidth: 1,
          borderTopColor: "#e1e1e1", // Subtle border on top
          shadowColor: "#000", // Add shadow for depth
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size + 6} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size + 6} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="modify"
        options={{
          title: "Modify",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="create-outline" size={size + 6} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
