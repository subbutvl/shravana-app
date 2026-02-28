import { Pause, Play, SkipBack, Square } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";

type Props = {
  isPlaying: boolean;
  onStop: () => void;
  onPlayPause: () => void;
  onRandom: () => void;
  randomDisabled?: boolean;
};

const ICON_COLOR = "#1C1917";

export function PlayerControls({
  isPlaying,
  onStop,
  onPlayPause,
  onRandom,
  randomDisabled,
}: Props) {
  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.sideButton, randomDisabled && styles.buttonDisabled]}
        onPress={onRandom}
        disabled={randomDisabled}
      >
        <SkipBack size={28} color={randomDisabled ? "#A8A29E" : ICON_COLOR} />
      </Pressable>

      <Pressable style={styles.playButton} onPress={onPlayPause}>
        {isPlaying ? (
          <Pause size={28} color="#fff" />
        ) : (
          <Play size={32} color="#fff" />
        )}
      </Pressable>

      <Pressable style={styles.sideButton} onPress={onStop}>
        <Square size={26} color={ICON_COLOR} strokeWidth={2} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
  },
  sideButton: { alignItems: "center", justifyContent: "center" },
  buttonDisabled: { opacity: 0.5 },
  playButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#C2410C",
    alignItems: "center",
    justifyContent: "center",
  },
});
