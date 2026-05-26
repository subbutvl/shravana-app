import { LinearGradient } from "expo-linear-gradient";
import { X } from "lucide-react-native";
import {
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslations } from "../hooks/useTranslations";
import type { Language } from "./LanguageSwitcher";
import type { Song } from "../types/song";

const ACCENT = "#C2410C";
const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const DRAWER_HEIGHT = SCREEN_HEIGHT * 0.78;

type Props = {
  visible: boolean;
  onClose: () => void;
  song: Song;
  language: Language;
};

export function MantraInfoDrawer({ visible, onClose, song, language }: Props) {
  const insets = useSafeAreaInsets();
  const t = useTranslations(language);

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
            <Text style={styles.headerTitle}>{t.aboutMantra}</Text>
            <Pressable onPress={onClose} hitSlop={12} style={styles.closeButton}>
              <X size={16} color={ACCENT} strokeWidth={2} />
            </Pressable>
          </View>

          <ScrollView
            style={styles.body}
            contentContainerStyle={[
              styles.bodyContent,
              { paddingBottom: 24 + insets.bottom },
            ]}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.songTitle}>{song.title[language]}</Text>

            <Text style={styles.sectionLabel}>{t.description}</Text>
            <Text style={styles.descriptionText}>
              {song.description[language]}
            </Text>

            <LinearGradient
              colors={[
                "rgba(255,255,255,0)",
                ACCENT,
                "rgba(255,255,255,0)",
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.divider}
            />

            <Text style={styles.sectionLabel}>{t.mantraLabel}</Text>
            <Text style={styles.lyricsText}>{song.lyrics[language]}</Text>
          </ScrollView>
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
  body: { flex: 1 },
  bodyContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  songTitle: {
    fontSize: 20,
    fontFamily: "AnekTamil-SemiBold",
    color: "#1C1917",
    marginBottom: 16,
    textAlign: "center",
  },
  sectionLabel: {
    fontSize: 10,
    fontFamily: "AnekTamil-SemiBold",
    color: "#78350F",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    fontFamily: "AnekTamil-Regular",
    color: "#44403C",
    lineHeight: 22,
    marginBottom: 20,
  },
  divider: {
    height: 1,
    marginBottom: 20,
  },
  lyricsText: {
    fontSize: 15,
    fontFamily: "AnekTamil-Medium",
    color: "#1C1917",
    lineHeight: 26,
  },
});
