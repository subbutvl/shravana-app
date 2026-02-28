import { Pressable, StyleSheet, Text, View } from "react-native";
import type { Mode } from "./ModeSelector";

const TIMER_OPTIONS = [5, 10, 15, 30] as const;
const REPETITION_OPTIONS = [11, 27, 54, 108] as const;

type Props = {
  mode: Mode;
  timerValue: number;
  repetitionValue: number;
  onTimerChange: (v: number) => void;
  onRepetitionChange: (v: number) => void;
  disabled?: boolean;
};

export function OptionsSelector({
  mode,
  timerValue,
  repetitionValue,
  onTimerChange,
  onRepetitionChange,
  disabled,
}: Props) {
  const options = mode === "timer" ? TIMER_OPTIONS : REPETITION_OPTIONS;
  const selected = mode === "timer" ? timerValue : repetitionValue;
  const onSelect = mode === "timer" ? onTimerChange : onRepetitionChange;

  const label =
    mode === "timer"
      ? { prefix: "Stops after ", value: `${timerValue} minutes` }
      : { prefix: "Repeats ", value: `${repetitionValue} times` };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label.prefix}
        <Text style={styles.labelValue}>{label.value}</Text>
      </Text>
      <View style={styles.optionsRow}>
        {options.map((val) => (
          <Pressable
            key={val}
            style={[
              styles.option,
              selected === val && styles.optionActive,
              disabled && styles.optionDisabled,
            ]}
            onPress={() => !disabled && onSelect(val)}
            disabled={disabled}
          >
            <Text
              style={[
                styles.text,
                selected === val ? styles.textActive : styles.textInactive,
              ]}
            >
              {val}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 8, alignItems: "center" },
  label: {
    fontSize: 14,
    fontFamily: "AnekTamil-Light",
    color: "rgba(100, 116, 139, 0.5)",
    textAlign: "center",
  },
  labelValue: {
    color: "#B24201",
    fontFamily: "AnekTamil-SemiBold",
  },
  optionsRow: { flexDirection: "row", gap: 12 },
  option: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  optionActive: {
    borderColor: "#B24201",
    borderWidth: 1.5,
    backgroundColor: "rgba(178, 66, 1, 0.1)",
  },
  optionDisabled: { opacity: 0.5 },
  text: { fontSize: 14, fontFamily: "AnekTamil-Medium" },
  textActive: { color: "#B24201" },
  textInactive: { color: "#64748B" },
});
