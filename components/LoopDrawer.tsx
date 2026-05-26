import { X } from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslations } from "../hooks/useTranslations";
import type { Language } from "./LanguageSwitcher";
import type { Mode } from "./ModeSelector";

const ACCENT = "#C2410C";
const LIGHT_ORANGE = "#FED7AA";
const LIGHT_ORANGE_BG = "#FFF7ED";
const TIMER_OPTIONS = [5, 10, 15, 30] as const;
const REPETITION_OPTIONS = [11, 27, 54, 108] as const;
const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const DRAWER_HEIGHT = SCREEN_HEIGHT * 0.52;

type Props = {
  visible: boolean;
  onClose: () => void;
  mode: Mode;
  timerValue: number;
  repetitionValue: number;
  onConfirm: (mode: Mode, timerValue: number, repetitionValue: number) => void;
  language: Language;
};

export function LoopDrawer({
  visible,
  onClose,
  mode,
  timerValue,
  repetitionValue,
  onConfirm,
  language,
}: Props) {
  const insets = useSafeAreaInsets();
  const t = useTranslations(language);

  const [localMode, setLocalMode] = useState<Mode>(mode);
  const [localTimer, setLocalTimer] = useState(timerValue);
  const [localRep, setLocalRep] = useState(repetitionValue);

  useEffect(() => {
    if (visible) {
      setLocalMode(mode);
      setLocalTimer(timerValue);
      setLocalRep(repetitionValue);
    }
  }, [visible, mode, timerValue, repetitionValue]);

  const handleConfirm = () => {
    onConfirm(localMode, localTimer, localRep);
    onClose();
  };

  const modeTabs: { key: Mode; label: string }[] = [
    { key: "none", label: t.loopOff },
    { key: "timer", label: t.timer },
    { key: "repetition", label: t.repetition },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.drawer} onPress={(e) => e.stopPropagation()}>
          <View style={styles.handleContainer}>
            <View style={styles.handle} />
          </View>

          <View style={styles.header}>
            <View style={styles.headerSpacer} />
            <Text style={styles.headerTitle}>{t.loopSettings}</Text>
            <Pressable onPress={onClose} hitSlop={12} style={styles.closeButton}>
              <X size={16} color={ACCENT} strokeWidth={2} />
            </Pressable>
          </View>

          {/* Mode tabs */}
          <View style={styles.modeTabs}>
            {modeTabs.map(({ key, label }) => (
              <Pressable
                key={key}
                style={[
                  styles.modeTab,
                  localMode === key && styles.modeTabActive,
                ]}
                onPress={() => setLocalMode(key)}
              >
                <View pointerEvents="none">
                  <Text
                    style={[
                      styles.modeTabText,
                      localMode === key && styles.modeTabTextActive,
                    ]}
                  >
                    {label}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>

          {/* Options for timer / repetition */}
          {localMode !== "none" && (
            <View style={styles.optionsSection}>
              <Text style={styles.optionsHint}>
                {localMode === "timer"
                  ? `${t.stopsAfter}${localTimer}${t.minutes}`
                  : `${t.repeats}${localRep}${t.times}`}
              </Text>
              <View style={styles.optionsRow}>
                {(localMode === "timer"
                  ? TIMER_OPTIONS
                  : REPETITION_OPTIONS
                ).map((val) => {
                  const isSelected =
                    localMode === "timer"
                      ? localTimer === val
                      : localRep === val;
                  return (
                    <Pressable
                      key={val}
                      style={[
                        styles.optionBtn,
                        isSelected && styles.optionBtnActive,
                      ]}
                      onPress={() =>
                        localMode === "timer"
                          ? setLocalTimer(val)
                          : setLocalRep(val)
                      }
                    >
                      <View pointerEvents="none">
                        <Text
                          style={[
                            styles.optionBtnText,
                            isSelected
                              ? styles.optionBtnTextActive
                              : styles.optionBtnTextInactive,
                          ]}
                        >
                          {val}
                        </Text>
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          )}

          {/* Off description */}
          {localMode === "none" && (
            <View style={styles.offDesc}>
              <Text style={styles.offDescText}>{t.loopOffDesc}</Text>
            </View>
          )}

          <View
            style={[styles.footer, { paddingBottom: 20 + insets.bottom }]}
          >
            <Pressable style={styles.confirmButton} onPress={handleConfirm}>
              <Text style={styles.confirmButtonText}>{t.apply}</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },
  drawer: {
    height: DRAWER_HEIGHT,
    backgroundColor: "#FBF9F0",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",
  },
  handleContainer: {
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 4,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: "#D4C4A8",
    borderRadius: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 6,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(178, 66, 1, 0.2)",
  },
  headerSpacer: { width: 36, height: 36 },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 17,
    fontFamily: "AnekTamil-SemiBold",
    color: "#1C1917",
  },
  closeButton: {
    width: 28,
    height: 28,
    borderRadius: 28,
    backgroundColor: "rgba(178, 66, 1, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  modeTabs: {
    flexDirection: "row",
    margin: 20,
    backgroundColor: "rgba(226, 232, 240, 0.7)",
    borderRadius: 50,
    padding: 4,
  },
  modeTab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: "center",
  },
  modeTabActive: { backgroundColor: "#FFF" },
  modeTabText: {
    fontSize: 14,
    fontFamily: "AnekTamil-Medium",
    color: "#64748B",
  },
  modeTabTextActive: { color: ACCENT },
  optionsSection: {
    paddingHorizontal: 20,
    alignItems: "center",
    gap: 12,
  },
  optionsHint: {
    fontSize: 14,
    fontFamily: "AnekTamil-Light",
    color: "rgba(100,116,139,0.7)",
  },
  optionsRow: {
    flexDirection: "row",
    gap: 12,
  },
  optionBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    backgroundColor: "rgba(255,255,255,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  optionBtnActive: {
    borderColor: ACCENT,
    backgroundColor: "rgba(178,66,1,0.1)",
  },
  optionBtnText: { fontSize: 15, fontFamily: "AnekTamil-Medium" },
  optionBtnTextActive: { color: ACCENT },
  optionBtnTextInactive: { color: "#64748B" },
  offDesc: {
    paddingHorizontal: 24,
    paddingTop: 8,
    alignItems: "center",
  },
  offDescText: {
    fontSize: 14,
    fontFamily: "AnekTamil-Regular",
    color: "#94A3B8",
    textAlign: "center",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(178, 66, 1, 0.15)",
    backgroundColor: "#FBF9F0",
  },
  confirmButton: {
    backgroundColor: ACCENT,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: "AnekTamil-SemiBold",
  },
});
