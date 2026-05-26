import { Pressable, StyleSheet, Text, View } from "react-native";

export type Language = "en" | "ta";

type Props = {
  language: Language;
  onLanguageChange: (lang: Language) => void;
};

export function LanguageSwitcher({ language, onLanguageChange }: Props) {
  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.option, language === "en" && styles.optionActive]}
        onPress={() => onLanguageChange("en")}
      >
        {/* pointerEvents="none" lets touches pass through Text to the Pressable on Android */}
        <View pointerEvents="none">
          <Text
            style={[
              styles.text,
              language === "en" ? styles.textActive : styles.textInactive,
            ]}
          >
            EN
          </Text>
        </View>
      </Pressable>
      <Pressable
        style={[styles.option, language === "ta" && styles.optionActive]}
        onPress={() => onLanguageChange("ta")}
      >
        <View pointerEvents="none">
          <Text
            style={[
              styles.text,
              language === "ta" ? styles.textActive : styles.textInactive,
            ]}
          >
            தமிழ்
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "rgba(226, 232, 240, 0.7)",
    borderRadius: 50,
    padding: 4,
    marginTop: 8,
    alignItems: "center",
  },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 50,
    alignItems: "center",
  },
  optionActive: { backgroundColor: "#FFF" },
  text: { fontSize: 14, fontFamily: "AnekTamil-Medium" },
  textActive: { color: "#B24201" },
  textInactive: { color: "#64748B" },
});
