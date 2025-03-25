import { Stack } from "expo-router";

export default function DocumentLayout() {
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
        name="[docId]"
      />
      <Stack.Screen
        name="upload-doc"
      />
    </Stack>
  );
}
