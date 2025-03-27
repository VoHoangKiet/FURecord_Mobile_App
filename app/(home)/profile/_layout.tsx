import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
      />
      <Stack.Screen
        name="update"
      />
      <Stack.Screen
        name="[id]"
      />
      <Stack.Screen
        name="update-image"
      />
      <Stack.Screen
        name="resume"
      />
    </Stack>
  );
}
