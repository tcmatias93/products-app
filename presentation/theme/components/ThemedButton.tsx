import { Text, Pressable, PressableProps, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "../hooks/useThemeColor";

interface Props extends PressableProps {
  children: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

const ThemedButton = ({ children, icon, ...rest }: Props) => {
  const primaryColor = useThemeColor({}, "primary");

  return (
    <Pressable
      {...rest}
      style={({ pressed }) => [
        { backgroundColor: pressed ? primaryColor + "90" : primaryColor },
        style.button,
      ]}
    >
      <Text style={style.colorText}>{children}</Text>
      {icon && (
        <Ionicons
          name={icon}
          size={24}
          color={"white"}
          style={{ marginHorizontal: 5 }}
        />
      )}
    </Pressable>
  );
};

export default ThemedButton;

const style = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "KanitRegular",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 5,
  },
  colorText: {
    color: "white",
  },
});
