import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useAllInfoUser } from "@/hooks/useAllInfoUser";

export default function UserDetail() {
  const params = useLocalSearchParams<{ id: string }>();
  const { data: users } = useAllInfoUser();
  console.log(params.id);
  const user = users?.find((user) => user.id === Number.parseInt(params.id));
  if (!user) {
    return (
      <View style={styles.container}>
        <Text>User does not exist</Text>
      </View>
    );
  }
  return <ScrollView style={styles.container}>
    <Text>{user.email}</Text>
    <Text>{user.gender}</Text>
    <Text>{user.fullName}</Text>
    <Text>{user.role}</Text>
  </ScrollView>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    paddingVertical: 10,
  },
  description: {
    fontSize: 18,
    fontWeight: "300",
  },
  pointRating: {
    alignItems: "center",
    fontWeight: "bold",
  },
  textTiny: {
    alignItems: "center",
  },
  expertLink: {
    fontWeight: "600",
    color: "#9d0891",
  },
});
