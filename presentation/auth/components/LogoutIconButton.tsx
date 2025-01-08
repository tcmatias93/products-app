import { View, Text, TouchableOpacity } from "react-native";
import { useAuthStore } from "../store/useAuthStore";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";

const LogoutIconButton = () => {
  const { logout } = useAuthStore();
  const primaryColor = useThemeColor({}, "primary");

  return (
    <TouchableOpacity style={{ marginRight: 8 }} onPress={logout}>
      <Ionicons name="log-out-outline" size={24} color={primaryColor} />
    </TouchableOpacity>
  );
};

export default LogoutIconButton;
