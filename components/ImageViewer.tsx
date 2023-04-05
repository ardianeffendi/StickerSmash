import { Image, ImageSourcePropType, StyleSheet } from "react-native";

type ImageProp = {
  placeHolderImage: ImageSourcePropType;
  selectedImage: string | null;
};

const ImageViewer = ({ placeHolderImage, selectedImage }: ImageProp) => {
  const imageSource =
    selectedImage !== null ? { uri: selectedImage } : placeHolderImage;

  return <Image source={imageSource} style={styles.image} />;
};

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});

export default ImageViewer;
