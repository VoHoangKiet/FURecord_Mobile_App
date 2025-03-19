import { Stack } from "expo-router";

export default function FlashCardLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
      />
    </Stack>
  );
}
