import Slider from "@react-native-community/slider";
import { Pause, Play, Repeat, SkipBack, SkipForward, Square } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTranslations } from "../hooks/useTranslations";
import type { Language } from "./LanguageSwitcher";
import type { Mode } from "./ModeSelector";

type Props = {
  isPlaying: boolean;
  mode: Mode;
  onPlayPause: () => void;
  onStop: () => void;
  onPrev: () => void;
  onNext: () => void;
  onLoopPress: () => void;
  currentTime: number;
  duration: number;
  onSeek: (seconds: number) => void;
  loopInfoText: string | null;
  onAboutMantraPress: () => void;
  language: Language;
};

const ACCENT = "#C2410C";
const ICON_INACTIVE = "#94A3B8";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function PlayerControls({
  isPlaying,
  mode,
  onPlayPause,
  onStop,
  onPrev,
  onNext,
  onLoopPress,
  currentTime,
  duration,
  onSeek,
  loopInfoText,
  onAboutMantraPress,
  language,
}: Props) {
  const t = useTranslations(language);
  const loopActive = mode !== "none";
  const showProgress = duration > 0;

  return (
    <View style={styles.wrapper}>
      {/* ── Controls row: Loop | Prev | Play/Pause | Next | Stop ── */}
      <View style={styles.controlsRow}>
        {/* Loop */}
        <Pressable style={styles.sideBtn} onPress={onLoopPress} hitSlop={10}>
          <Repeat
            size={22}
            color={loopActive ? ACCENT : ICON_INACTIVE}
            strokeWidth={2}
          />
        </Pressable>

        {/* Prev (replay from start) */}
        <Pressable style={styles.sideBtn} onPress={onPrev} hitSlop={10}>
          <SkipBack size={26} color="#1C1917" strokeWidth={2} />
        </Pressable>

        {/* Play / Pause — large center button */}
        <Pressable style={styles.playBtn} onPress={onPlayPause}>
          {isPlaying ? (
            <Pause size={28} color="#fff" strokeWidth={2} />
          ) : (
            <Play size={30} color="#fff" strokeWidth={2} />
          )}
        </Pressable>

        {/* Next (random) */}
        <Pressable style={styles.sideBtn} onPress={onNext} hitSlop={10}>
          <SkipForward size={26} color="#1C1917" strokeWidth={2} />
        </Pressable>

        {/* Stop */}
        <Pressable style={styles.sideBtn} onPress={onStop} hitSlop={10}>
          <Square size={22} color="#1C1917" strokeWidth={2} />
        </Pressable>
      </View>

      {/* ── Progress bar ── */}
      {showProgress ? (
        <View style={styles.progressSection}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={duration}
            value={currentTime}
            onSlidingComplete={onSeek}
            minimumTrackTintColor={ACCENT}
            maximumTrackTintColor="rgba(178,66,1,0.18)"
            thumbTintColor={ACCENT}
          />
          <View style={styles.timeRow}>
            <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
            <Text style={styles.timeText}>{formatTime(duration)}</Text>
          </View>
        </View>
      ) : (
        <View style={styles.progressPlaceholder} />
      )}

      {/* ── Loop info ── */}
      {loopInfoText ? (
        <Text style={styles.loopInfoText}>{loopInfoText}</Text>
      ) : (
        <View style={styles.loopInfoPlaceholder} />
      )}

      {/* ── About this Mantra link ── */}
      <Pressable style={styles.aboutLink} onPress={onAboutMantraPress} hitSlop={8}>
        <View pointerEvents="none">
          <Text style={styles.aboutLinkText}>{t.aboutMantra} →</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    alignItems: "center",
    gap: 4,
  },
  controlsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 8,
    marginBottom: 4,
  },
  sideBtn: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  playBtn: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: ACCENT,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: ACCENT,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  progressSection: {
    width: "100%",
    paddingHorizontal: 0,
  },
  slider: {
    width: "100%",
    height: 36,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: -6,
  },
  timeText: {
    fontSize: 11,
    fontFamily: "AnekTamil-Regular",
    color: "#94A3B8",
  },
  progressPlaceholder: {
    height: 28,
  },
  loopInfoText: {
    fontSize: 13,
    fontFamily: "AnekTamil-Medium",
    color: "#78350F",
    textAlign: "center",
    marginTop: 2,
    minHeight: 20,
  },
  loopInfoPlaceholder: {
    height: 20,
  },
  aboutLink: {
    marginTop: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  aboutLinkText: {
    fontSize: 13,
    fontFamily: "AnekTamil-SemiBold",
    color: ACCENT,
    textDecorationLine: "underline",
  },
});
