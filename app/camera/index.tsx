import { useRef, useState } from "react";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { ThemedText } from "@/presentation/theme/components/ThemedText";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const CameraScreen = () => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [setselectedImage, setSetselectedImage] = useState<string>();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View
        style={{
          ...styles.container,
          marginHorizontal: 30,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.message}>
          necesitamos permiso para usar la cámara y la galería
        </Text>
        <TouchableOpacity onPress={requestPermission}>
          <ThemedText type="subtitle">Solicitar permisos</ThemedText>
        </TouchableOpacity>
      </View>
    );
  }

  const onShutterButtonPress = async () => {
    if (!cameraRef.current) return;

    const picture = await cameraRef.current.takePictureAsync({
      quality: 0.7,
    });

    console.log(picture);
    if (!picture?.uri) return;

    setSetselectedImage(picture.uri);
  };

  const onReturnCancel = () => {
    router.dismiss();
  };

  const onPictureAccepted = () => {
    console.log("Imagen guardada");
  };

  const onRetakePhoto = () => {
    setSetselectedImage(undefined);
  };

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  if (setselectedImage) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: setselectedImage }} style={styles.camera} />
        <ReturnCancelButton onPress={onReturnCancel} />
        <ConfirmImageButton onPress={onPictureAccepted} />
        <RetakeImageButton onPress={onRetakePhoto} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <ReturnCancelButton onPress={onReturnCancel} />
        <GalleryButton />
        <ShutterButton onPress={onShutterButtonPress} />
        <FlipCameraButton onPress={toggleCameraFacing} />
      </CameraView>
    </View>
  );
};

export default CameraScreen;

// Custom Components
const ShutterButton = ({ onPress = () => {} }) => {
  const dimesions = useWindowDimensions();
  const primaryColor = useThemeColor({}, "primary");
  return (
    <TouchableOpacity
      style={[
        styles.ShutterButton,
        {
          position: "absolute",
          bottom: 30,
          left: dimesions.width / 2 - 32,
          borderColor: primaryColor,
        },
      ]}
      onPress={onPress}
    ></TouchableOpacity>
  );
};

const FlipCameraButton = ({ onPress = () => {} }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.flipCameraButton}>
      <Ionicons name="camera-reverse-outline" size={30} color={"white"} />
    </TouchableOpacity>
  );
};

const GalleryButton = ({ onPress = () => {} }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.galleryButton}>
      <Ionicons name="images-outline" size={30} color={"white"} />
    </TouchableOpacity>
  );
};

const ReturnCancelButton = ({ onPress = () => {} }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.returnCancelButton}>
      <Ionicons name="arrow-back-outline" size={30} color={"white"} />
    </TouchableOpacity>
  );
};

const ConfirmImageButton = ({ onPress = () => {} }) => {
  const dimesions = useWindowDimensions();
  const primaryColor = useThemeColor({}, "primary");
  return (
    <TouchableOpacity
      style={[
        styles.ShutterButton,
        {
          position: "absolute",
          bottom: 30,
          left: dimesions.width / 2 - 32,
          borderColor: primaryColor,
        },
      ]}
      onPress={onPress}
    >
      <Ionicons name="checkmark-outline" size={30} color={primaryColor} />
    </TouchableOpacity>
  );
};

const RetakeImageButton = ({ onPress = () => {} }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.flipCameraButton}>
      <Ionicons name="close-outline" size={30} color={"white"} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  ShutterButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "white",
    borderColor: "red",
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  flipCameraButton: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: "#17202A",
    position: "absolute",
    bottom: 40,
    right: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  galleryButton: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: "#17202A",
    position: "absolute",
    bottom: 40,
    left: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  returnCancelButton: {
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: "#17202A",
    position: "absolute",
    top: 40,
    left: 32,
    justifyContent: "center",
    alignItems: "center",
  },
});
