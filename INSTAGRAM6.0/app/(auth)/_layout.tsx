import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Account" />
      <Stack.Screen name="Auth" />
      <Stack.Screen name="User" />
      <Stack.Screen name="AddUser" />
    </Stack>
  );
}
