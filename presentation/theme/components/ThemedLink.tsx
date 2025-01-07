import { Link, LinkProps } from "expo-router";
import { View, Text } from "react-native";
import { useThemeColor } from "../hooks/useThemeColor";

interface Props extends LinkProps {}

const ThemedLink = ({ style, ...rest }: Props) => {
  const primaryColor = useThemeColor({}, "primary");

  return <Link style={[{ color: primaryColor }, style]} {...rest} />;
};

export default ThemedLink;
