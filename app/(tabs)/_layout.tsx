import { Stack } from "expo-router";
import React from "react";
import ProtectedRoute from "@/context/ProtectedRouter";

export default function TabLayout() {

  return (
    <ProtectedRoute>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="explore" />
      </Stack>
    </ProtectedRoute>
  );
}
