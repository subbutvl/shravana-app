import { useTranslations } from "../hooks/useTranslations";
import type { Language } from "./LanguageSwitcher";
import { Pressable, StyleSheet, Text, View } from "react-native";

export type Mode = "timer" | "repetition";

type Props = {
  mode: Mode;
  onChange: (mode: Mode) => void;
  disabled?: boolean;
  language: Language;
};

export function ModeSelector({ mode, onChange, disabled, language }: Props) {
  const t = useTranslations(language);
  return (
    <View style={styles.container}>
      <Pressable
        style={[
          styles.option,
          mode === "timer" && styles.optionActive,
          disabled && styles.optionDisabled,
        ]}
        onPress={() => !disabled && onChange("timer")}
        disabled={disabled}
      >
        <Text
          style={[
            styles.text,
            mode === "timer" ? styles.textActive : styles.textInactive,
          ]}
        >
          {t.timer}
        </Text>
      </Pressable>
      <Pressable
        style={[
          styles.option,
          mode === "repetition" && styles.optionActive,
          disabled && styles.optionDisabled,
        ]}
        onPress={() => !disabled && onChange("repetition")}
        disabled={disabled}
      >
        <Text
          style={[
            styles.text,
            mode === "repetition" ? styles.textActive : styles.textInactive,
          ]}
        >
          {t.repetition}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 200,
    height: 50,
    backgroundColor: "rgba(226, 232, 240, 0.7)",
    borderRadius: 50,
    padding: 4,
  },
  option: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 50,
    alignItems: "center",
  },
  optionActive: { backgroundColor: "#FFF" },
  optionDisabled: { opacity: 0.5 },
  text: { fontSize: 14, fontFamily: "AnekTamil-Medium" },
  textActive: { color: "#B24201" },
  textInactive: { color: "#64748B" },
});
