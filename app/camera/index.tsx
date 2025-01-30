import { useRef, useState } from "react";
import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import { useThemeColor } from "@/presentation/theme/hooks/useThemeColor";
import { ThemedText } from "@/presentation/theme/components/ThemedText";
import { useCameraStore } from "@/presentation/store/useCameraStore";

const CameraScreen = () => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [selectedImage, setSelectedImage] = useState<string>();
  const cameraRef = useRef<CameraView>(null);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] =
    MediaLibrary.usePermissions();
  const { addSelectedImage } = useCameraStore();

  const onRequestPermission = async () => {
    try {
      const { status: cameraPermissionStatus } =
        await requestCameraPermission();
      if (cameraPermissionStatus !== "granted") {
        Alert.alert(
          "Lo siento",
          "Necesitamos permiso a la cámara para tomar fotos"
        );
        return;
      }
      const { status: mediaPermissionStatus } = await requestMediaPermission();
      if (mediaPermissionStatus !== "granted") {
        Alert.alert(
          "Lo siento",
          "Necesitamos permiso a la galería para guardar las imágenes"
        );
        return;
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Algo salio mal con los permisos");
    }
  };

  if (!cameraPermission) {
    return <View />;
  }

  if (!cameraPermission.granted) {
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
        <TouchableOpacity onPress={onRequestPermission}>
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

    setSelectedImage(picture.uri);
  };

  const onReturnCancel = () => {
    router.dismiss();
  };

  const onPictureAccepted = async () => {
    if (!selectedImage) return;
    await MediaLibrary.createAssetAsync(selectedImage);
    addSelectedImage(selectedImage);

    router.dismiss();
  };

  const onRetakePhoto = () => {
    setSelectedImage(undefined);
  };

  const onPickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3], //ancho X alto
      quality: 0.5,
      allowsMultipleSelection: true,
      selectionLimit: 3,
    });

    if (result.canceled) return;

    result.assets.forEach((asset) => {
      addSelectedImage(asset.uri);
    });

    router.dismiss();
    console.log(result.assets);
  };

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  if (selectedImage) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: selectedImage }} style={styles.camera} />
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
        <GalleryButton onPress={onPickImages} />
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
