import Slider from "@react-native-community/slider";
import { Pause, Play, SkipBack, Square, Volume2 } from "lucide-react-native";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  isPlaying: boolean;
  onStop: () => void;
  onPlayPause: () => void;
  onRandom: () => void;
  randomDisabled?: boolean;
  currentTime?: number;
  duration?: number;
  onSeek?: (seconds: number) => void;
  onVolumeChange?: (volume: number) => void;
};

const ICON_COLOR = "#1C1917";
const ACCENT = "#C2410C";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function PlayerControls({
  isPlaying,
  onStop,
  onPlayPause,
  onRandom,
  randomDisabled,
  currentTime = 0,
  duration = 0,
  onSeek,
  onVolumeChange,
}: Props) {
  const [volume, setVolume] = useState(1);

  const handleVolumeChange = (val: number) => {
    setVolume(val);
    onVolumeChange?.(val);
  };

  const showProgress = duration > 0;

  return (
    <View style={styles.wrapper}>
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

      {showProgress && (
        <View style={styles.progressSection}>
          <Slider
            style={styles.progressSlider}
            minimumValue={0}
            maximumValue={duration}
            value={currentTime}
            onSlidingComplete={onSeek}
            minimumTrackTintColor={ACCENT}
            maximumTrackTintColor="rgba(178,66,1,0.2)"
            thumbTintColor={ACCENT}
          />
          <View style={styles.timeRow}>
            <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
            <Text style={styles.timeText}>{formatTime(duration)}</Text>
          </View>
        </View>
      )}

      <View style={styles.volumeRow}>
        <Volume2 size={14} color="#94A3B8" />
        <Slider
          style={styles.volumeSlider}
          minimumValue={0}
          maximumValue={1}
          value={volume}
          onValueChange={handleVolumeChange}
          minimumTrackTintColor={ACCENT}
          maximumTrackTintColor="rgba(178,66,1,0.2)"
          thumbTintColor={ACCENT}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    alignItems: "center",
    gap: 8,
  },
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
  progressSection: {
    width: "100%",
    paddingHorizontal: 4,
  },
  progressSlider: {
    width: "100%",
    height: 32,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    marginTop: -4,
  },
  timeText: {
    fontSize: 11,
    fontFamily: "AnekTamil-Regular",
    color: "#94A3B8",
  },
  volumeRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 8,
    gap: 4,
  },
  volumeSlider: {
    flex: 1,
    height: 32,
  },
});
