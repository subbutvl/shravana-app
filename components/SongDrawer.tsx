import { LinearGradient } from "expo-linear-gradient";
import { Check, Heart, Music2, X } from "lucide-react-native";
import { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTranslations } from "../hooks/useTranslations";
import type { Song } from "../types/song";
import type { Language } from "./LanguageSwitcher";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const DRAWER_HEIGHT = SCREEN_HEIGHT * 0.75;

const ACCENT = "#C2410C";
const LIGHT_ORANGE = "#FED7AA";
const LIGHT_ORANGE_BG = "#FFF7ED";

type Props = {
  visible: boolean;
  onClose: () => void;
  songs: Song[];
  selectedSong: Song | null;
  onSelectSong: (song: Song) => void;
  language: Language;
  favorites: Set<string>;
};

export function SongDrawer({
  visible,
  onClose,
  songs,
  selectedSong,
  onSelectSong,
  language,
  favorites,
}: Props) {
  const insets = useSafeAreaInsets();
  const t = useTranslations(language);
  const [pendingSong, setPendingSong] = useState<Song | null>(selectedSong);
  const [showFavorites, setShowFavorites] = useState(false);

  const visibleSongs = showFavorites
    ? songs.filter((s) => favorites.has(s.id))
    : songs;

  useEffect(() => {
    if (visible) {
      setPendingSong(selectedSong);
      setShowFavorites(false);
    }
  }, [visible, selectedSong]);

  const handleConfirm = useCallback(() => {
    if (pendingSong) {
      onSelectSong(pendingSong);
    }
    onClose();
  }, [pendingSong, onSelectSong, onClose]);

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
            <Text style={styles.headerTitle}>{t.selectMantra}</Text>
            <Pressable
              onPress={onClose}
              hitSlop={12}
              style={styles.closeButton}
            >
              <X size={16} color={ACCENT} strokeWidth={2} />
            </Pressable>
          </View>

          <View style={styles.filterRow}>
            <Pressable
              style={[styles.filterTab, !showFavorites && styles.filterTabActive]}
              onPress={() => setShowFavorites(false)}
            >
              <Text style={[styles.filterTabText, !showFavorites && styles.filterTabTextActive]}>
                {t.all}
              </Text>
            </Pressable>
            <Pressable
              style={[styles.filterTab, showFavorites && styles.filterTabActive]}
              onPress={() => setShowFavorites(true)}
            >
              <Heart
                size={12}
                color={showFavorites ? ACCENT : "#94A3B8"}
                fill={showFavorites ? ACCENT : "none"}
                style={styles.filterTabIcon}
              />
              <Text style={[styles.filterTabText, showFavorites && styles.filterTabTextActive]}>
                {t.favorites}
              </Text>
            </Pressable>
          </View>

          <FlatList
            data={visibleSongs}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            ItemSeparatorComponent={() => (
              <LinearGradient
                colors={["rgba(255,255,255,0)", ACCENT, "rgba(255,255,255,0)"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.separator}
              />
            )}
            renderItem={({ item }) => {
              const isSelected = pendingSong?.id === item.id;
              return (
                <Pressable
                  style={[styles.item, isSelected && styles.itemSelected]}
                  onPress={() => setPendingSong(item)}
                >
                  <Image
                    source={item.image}
                    style={styles.itemImage}
                    resizeMode="cover"
                  />
                  <View style={styles.itemContent}>
                    <Text
                      style={[styles.title, isSelected && styles.titleSelected]}
                      numberOfLines={1}
                    >
                      {item.title[language]}
                    </Text>
                    <View
                      style={[
                        styles.categoryTag,
                        isSelected
                          ? styles.categoryTagSelected
                          : styles.categoryTagUnselected,
                      ]}
                    >
                      <Text style={styles.categoryText}>
                        {item.category.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                  {isSelected ? (
                    <View style={styles.checkCircle}>
                      <Check size={12} color={ACCENT} strokeWidth={3} />
                    </View>
                  ) : (
                    <Music2 size={20} color="#94A3B8" />
                  )}
                </Pressable>
              );
            }}
          />

          <View style={[styles.footer, { paddingBottom: 20 + insets.bottom }]}>
            <Pressable style={styles.confirmButton} onPress={handleConfirm}>
              <Text style={styles.confirmButtonText}>{t.confirmSelection}</Text>
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
    backgroundColor: "rgba(0,0,0,0.4)",
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
    paddingBottom: 8,
    paddingTop: 6,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(178, 66, 1, 0.2)",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontFamily: "AnekTamil-SemiBold",
    color: "#1C1917",
  },
  headerSpacer: { width: 36, height: 36 },
  closeButton: {
    width: 24,
    height: 24,
    borderRadius: 24,
    backgroundColor: "rgba(178, 66, 1, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  filterRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 8,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(178, 66, 1, 0.1)",
  },
  filterTab: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    gap: 4,
  },
  filterTabActive: {
    backgroundColor: LIGHT_ORANGE_BG,
    borderColor: ACCENT,
  },
  filterTabIcon: {},
  filterTabText: {
    fontSize: 13,
    fontFamily: "AnekTamil-Medium",
    color: "#64748B",
  },
  filterTabTextActive: {
    color: ACCENT,
  },
  listContent: { paddingBottom: 16 },
  separator: {
    height: 1,
    width: SCREEN_WIDTH,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  itemSelected: {
    backgroundColor: LIGHT_ORANGE_BG,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 14,
  },
  itemContent: { flex: 1 },
  title: {
    fontSize: 16,
    fontFamily: "AnekTamil-SemiBold",
    color: "#1C1917",
  },
  titleSelected: { color: "#1C1917" },
  categoryTag: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 4,
  },
  categoryTagSelected: {
    backgroundColor: LIGHT_ORANGE,
  },
  categoryTagUnselected: {
    backgroundColor: "#E2E8F0",
  },
  categoryText: {
    fontSize: 10,
    fontFamily: "AnekTamil-Medium",
    color: "#1C1917",
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 24,
    backgroundColor: LIGHT_ORANGE,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  footer: {
    padding: 20,
    paddingBottom: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(178, 66, 1, 0.2)",
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
