import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import ImageViewer from "./components/ImageViewer";
import Button from "./components/Button";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

export default function App(): JSX.Element {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert("You did not select any image.");
    }
  };

  return (
    <View style={styles.container}>
      {showAppOptions ? (
        <View />
      ) : (
        <View style={styles.footerContainer}>
          <Button
            theme="primary"
            label="Choose a photo"
            onPress={pickImageAsync}
          />
          <Button
            theme=""
            label="Use this photo"
            onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
});
