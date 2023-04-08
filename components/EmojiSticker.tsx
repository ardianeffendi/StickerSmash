import { Image, ImageSourcePropType, View } from "react-native";

type EmojiStickerProps = {
  imageSize: number;
  stickerSource: ImageSourcePropType;
};

const EmojiSticker = ({ imageSize, stickerSource }: EmojiStickerProps) => {
  return (
    <View style={{ top: -350 }}>
      <Image
        source={stickerSource}
        resizeMode="contain"
        style={{ width: imageSize, height: imageSize }}
      />
    </View>
  );
};

export default EmojiSticker;
