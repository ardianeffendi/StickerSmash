import { Image, ImageSourcePropType, View } from "react-native";
import {
  PanGestureHandler,
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type EmojiStickerProps = {
  imageSize: number;
  stickerSource: ImageSourcePropType;
};

const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimateView = Animated.createAnimatedComponent(View);

const EmojiSticker = ({ imageSize, stickerSource }: EmojiStickerProps) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scaleImage = useSharedValue(imageSize);

  const onDoubleTap = useAnimatedGestureHandler<TapGestureHandlerGestureEvent>({
    onActive: () => {
      if (scaleImage.value) {
        scaleImage.value = scaleImage.value * 2;
      }
    },
  });

  const onDrag = useAnimatedGestureHandler({
    onStart: (_, context: { translateX: number; translateY: number }) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context: { translateX: number; translateY: number }) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    };
  });

  return (
    <PanGestureHandler onGestureEvent={onDrag}>
      <AnimateView style={[containerStyle, { top: -350 }]}>
        <TapGestureHandler onGestureEvent={onDoubleTap} numberOfTaps={2}>
          <AnimatedImage
            source={stickerSource}
            resizeMode="contain"
            style={[imageStyle, { width: imageSize, height: imageSize }]}
          />
        </TapGestureHandler>
      </AnimateView>
    </PanGestureHandler>
  );
};

export default EmojiSticker;
