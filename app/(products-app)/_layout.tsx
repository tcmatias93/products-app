import React, { useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import { Redirect, Stack } from "expo-router";

const CheckAuthentificationLayout = () => {
  const { status, checkStatus } = useAuthStore();

  useEffect(() => {
    checkStatus();
  }, []);

  if (status === "checking") {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 5,
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  if (status === "unauthenticated") {
    return <Redirect href={"/auth/login"} />;
  }

  return (
    <Stack>
      <Stack.Screen name="(home)/index" options={{ title: "Productos" }} />
    </Stack>
  );
};

export default CheckAuthentificationLayout;
