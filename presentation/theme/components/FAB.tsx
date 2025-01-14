import { Ionicons } from "@expo/vector-icons";
import {
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

interface Props {
  iconName: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}
const FAB = ({ iconName, onPress, style }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyle.button, style]}>
      <Ionicons name={iconName} size={30} color={"white"} />
    </TouchableOpacity>
  );
};

export default FAB;

const buttonStyle = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 30,
    right: 20,
    width: 60,
    height: 60,
    shadowColor: "black",
    backgroundColor: "black",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 3,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
});
