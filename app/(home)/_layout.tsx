import { Ionicons } from "@expo/vector-icons";
import CartComponent from "@/components/order/Cart";
import { Tabs } from "expo-router";
import { Icon } from "@ant-design/react-native";

export default function HomeLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { height: 80 },
        headerRight: () => <CartComponent/>
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerTitle: "",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          )
        }}
      />
      <Tabs.Screen
        name="document"
        options={{
          title: "Document",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat-ai"
        options={{
          title: "ChatAI",
          tabBarIcon: ({ color, size }) => (
            <Icon name="aliwangwang" size={size} color={color}/>
          ),
        }}
      />
      <Tabs.Screen
        name="learns"
        options={{
          title: "Learning",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="school-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />

    </Tabs>
  );
}
