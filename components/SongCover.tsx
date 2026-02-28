import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";

type Props = {
  source: ImageSourcePropType;
  width?: number;
  height?: number;
};

const COVER_WIDTH = 325;
const COVER_HEIGHT = 325;

export function SongCover({
  source,
  width = COVER_WIDTH,
  height = COVER_HEIGHT,
}: Props) {
  return (
    <View style={[styles.container, { width, height }]}>
      <Image
        source={source}
        style={[styles.image, { width, height }]}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "transparent",
  },
  image: { borderRadius: 16 },
});
