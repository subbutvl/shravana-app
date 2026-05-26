import { ChevronDown, ChevronUp } from "lucide-react-native";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTranslations } from "../hooks/useTranslations";
import type { Language } from "./LanguageSwitcher";
import type { Song } from "../types/song";

type Props = {
  song: Song;
  language: Language;
};

export function MantraInfo({ song, language }: Props) {
  const t = useTranslations(language);
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.container}>
      <Pressable style={styles.header} onPress={() => setExpanded((v) => !v)}>
        <Text style={styles.headerText}>{t.aboutMantra}</Text>
        {expanded ? (
          <ChevronUp size={16} color="#B24201" />
        ) : (
          <ChevronDown size={16} color="#B24201" />
        )}
      </Pressable>

      {expanded && (
        <View style={styles.body}>
          <Text style={styles.description}>{song.description[language]}</Text>

          <View style={styles.divider} />

          <Text style={styles.lyricsLabel}>{t.mantraLabel}</Text>
          <Text style={styles.lyrics}>{song.lyrics[language]}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 0,
    marginBottom: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#D4C4A8",
    backgroundColor: "rgba(255, 247, 237, 0.85)",
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerText: {
    fontSize: 13,
    fontFamily: "AnekTamil-SemiBold",
    color: "#B24201",
  },
  body: {
    paddingHorizontal: 16,
    paddingBottom: 14,
  },
  description: {
    fontSize: 13,
    fontFamily: "AnekTamil-Regular",
    color: "#44403C",
    lineHeight: 20,
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "#E7D9C4",
    marginBottom: 12,
  },
  lyricsLabel: {
    fontSize: 11,
    fontFamily: "AnekTamil-SemiBold",
    color: "#78350F",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  lyrics: {
    fontSize: 14,
    fontFamily: "AnekTamil-Medium",
    color: "#1C1917",
    lineHeight: 22,
  },
});
