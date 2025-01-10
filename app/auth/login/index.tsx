import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";
import { ThemedText } from "@/presentation/theme/components/ThemedText";
import ThemedTextInput from "@/presentation/theme/components/ThemedTextInput";
import ThemedButton from "@/presentation/theme/components/ThemedButton";
import ThemedLink from "@/presentation/theme/components/ThemedLink";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import { useAuthStore } from "@/presentation/auth/store/useAuthStore";
import { router } from "expo-router";

const LoginScreen = () => {
  const { login } = useAuthStore();
  const { height } = useWindowDimensions();
  const backgroundColor = useThemeColor({}, "background");
  const [isPosting, setIsPosting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {
    const { email, password } = form;

    if (email.length === 0 || password.length === 0) {
      //Retorno para que no haga nada o puedo retornar una alerta o mensaje
      return;
    }
    setIsPosting(true);

    const wasSuccessful = await login(email, password);

    setIsPosting(false);

    if (wasSuccessful) {
      router.replace("/");
      return;
    }
    Alert.alert("Error", "Usuario o contraseña son incorrectas");
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView
        style={{ paddingHorizontal: 40, backgroundColor: backgroundColor }}
      >
        <View style={{ paddingTop: height * 0.35 }}>
          <ThemedText type="title">Ingresar</ThemedText>
          <ThemedText style={{ color: "gray" }}>
            Por favor ingrese para continuar
          </ThemedText>
        </View>

        {/* Email y password */}
        <View style={{ marginTop: 20 }}>
          <ThemedTextInput
            placeholder="Correo electronico"
            keyboardType="email-address"
            autoCapitalize="none"
            icon="mail-outline"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <ThemedTextInput
            placeholder="Contraseña"
            secureTextEntry
            autoCapitalize="none"
            icon="lock-closed-outline"
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />
        </View>

        <View style={{ marginVertical: 10 }} />
        {/* Boton */}
        <ThemedButton
          onPress={onLogin}
          disabled={isPosting}
          icon="arrow-forward-outline"
        >
          Ingresar
        </ThemedButton>

        <View style={{ marginVertical: 10 }} />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ThemedText>¿No tienes cuenta?</ThemedText>
          <ThemedLink href={"/auth/register"} style={{ marginHorizontal: 5 }}>
            Crear cuenta
          </ThemedLink>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
