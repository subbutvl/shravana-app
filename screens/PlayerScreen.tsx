import AsyncStorage from "@react-native-async-storage/async-storage";
import { Heart, Music2 } from "lucide-react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  LanguageSwitcher,
  type Language,
} from "../components/LanguageSwitcher";
import { ModeSelector, type Mode } from "../components/ModeSelector";
import { OptionsSelector } from "../components/OptionsSelector";
import { PlayerControls } from "../components/PlayerControls";
import { SongCover } from "../components/SongCover";
import { MantraInfo } from "../components/MantraInfo";
import { SongDrawer } from "../components/SongDrawer";
import { songs } from "../data/songs";
import { useMantraAudioPlayer } from "../hooks/useAudioPlayer";
import { useFavorites } from "../hooks/useFavorites";
import { useTranslations } from "../hooks/useTranslations";
import type { Song } from "../types/song";

function getRandomSong(current: Song | null): Song {
  if (songs.length <= 1) return songs[0];
  const others = songs.filter((s) => s.id !== current?.id);
  return others[Math.floor(Math.random() * others.length)];
}

export default function PlayerScreen() {
  const insets = useSafeAreaInsets();
  const [language, setLanguage] = useState<Language>("en");
  const [selectedSong, setSelectedSong] = useState<Song>(songs[0]);

  useEffect(() => {
    AsyncStorage.getItem("lastSongId").then((id) => {
      if (!id) return;
      const found = songs.find((s) => s.id === id);
      if (found) setSelectedSong(found);
    });
  }, []);
  const [mode, setMode] = useState<Mode>("timer");
  const [timerValue, setTimerValue] = useState(15);
  const [repetitionValue, setRepetitionValue] = useState(11);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [remainingRepetitions, setRemainingRepetitions] = useState<
    number | null
  >(null);
  const [timerSecondsLeft, setTimerSecondsLeft] = useState(0);
  const [replayInProgress, setReplayInProgress] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isPlayingRef = useRef(false);
  const audioRef = useRef<ReturnType<typeof useMantraAudioPlayer> | null>(null);
  const replayInProgressRef = useRef(false);

  const handlePlaybackComplete = useCallback(() => {
    if (mode === "timer") {
      if (timerRef.current !== null) {
        replayInProgressRef.current = true;
        setReplayInProgress(true);
        audioRef.current?.replay();
        setTimeout(() => {
          replayInProgressRef.current = false;
          setReplayInProgress(false);
        }, 400);
      }
      return;
    }
    if (mode !== "repetition") return;
    setRemainingRepetitions((prev) => {
      if (prev === null) return null;
      const next = prev - 1;
      console.log("[Repetition] Song finished, remaining:", next);
      if (next <= 0) {
        console.log("[Repetition] Complete, stopping");
        setReplayInProgress(false);
        audioRef.current?.stop();
        return null;
      }
      setReplayInProgress(true);
      audioRef.current?.replay();
      setTimeout(() => setReplayInProgress(false), 400);
      return next;
    });
  }, [mode]);

  const audio = useMantraAudioPlayer(handlePlaybackComplete);
  audioRef.current = audio;
  const { isPlaying, currentSong, currentTime, duration, loadAndPlay, playPause, stop, replay, seekTo, setVolume } =
    audio;

  isPlayingRef.current = isPlaying;

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setTimerSecondsLeft(0);
  }, []);

  useEffect(() => {
    if (mode !== "timer" || !isPlaying) return;
    if (timerRef.current !== null) return;
    const totalSeconds = timerValue * 60;
    setTimerSecondsLeft(totalSeconds);
    console.log("[Timer] Started countdown:", timerValue, "min");
    timerRef.current = setInterval(() => {
      setTimerSecondsLeft((prev) => {
        if (prev <= 1) {
          console.log("[Timer] Reached zero, stopping");
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          stop();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (replayInProgressRef.current) return;
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [mode, isPlaying, timerValue, stop]);

  useEffect(() => {
    if (!isPlaying && !replayInProgress) {
      clearTimer();
      if (mode === "repetition") {
        setRemainingRepetitions(null);
      }
    }
  }, [isPlaying, mode, replayInProgress, clearTimer]);

  const handleStop = useCallback(() => {
    replayInProgressRef.current = false;
    setReplayInProgress(false);
    stop();
    clearTimer();
    setRemainingRepetitions(null);
  }, [stop, clearTimer]);

  const handlePlayPause = useCallback(() => {
    const shouldLoad = !currentSong || currentSong.id !== selectedSong.id;
    if (shouldLoad) {
      loadAndPlay(selectedSong);
      if (mode === "repetition") {
        setRemainingRepetitions(repetitionValue);
      }
      return;
    }
    if (isPlaying) {
      playPause();
    } else {
      if (mode === "repetition" && remainingRepetitions === null) {
        setRemainingRepetitions(repetitionValue);
      }
      playPause();
    }
  }, [
    currentSong,
    selectedSong,
    isPlaying,
    mode,
    timerValue,
    repetitionValue,
    remainingRepetitions,
    loadAndPlay,
    playPause,
  ]);

  const handleRandom = useCallback(() => {
    const next = getRandomSong(selectedSong);
    setSelectedSong(next);
    AsyncStorage.setItem("lastSongId", next.id);
    if (isPlaying) {
      loadAndPlay(next);
      if (mode === "repetition") {
        setRemainingRepetitions(repetitionValue);
      }
    }
  }, [selectedSong, isPlaying, mode, repetitionValue, loadAndPlay]);

  const handleRepetitionChange = useCallback((val: number) => {
    setRepetitionValue((prevVal) => {
      setRemainingRepetitions((prev) => {
        if (prev === null) return null;
        return val > prevVal ? prev + (val - prevVal) : Math.min(prev, val);
      });
      return val;
    });
  }, []);

  const handleSelectSong = useCallback(
    (song: Song) => {
      setSelectedSong(song);
      AsyncStorage.setItem("lastSongId", song.id);
      if (isPlayingRef.current) {
        loadAndPlay(song);
        if (mode === "repetition") {
          setRemainingRepetitions(repetitionValue);
        }
      }
    },
    [mode, repetitionValue, loadAndPlay],
  );

  const { favorites, toggleFavorite } = useFavorites();
  const t = useTranslations(language);

  const canSwitchMode = !isPlaying && !replayInProgress;
  const isPlayingUI = isPlaying || replayInProgress;

  const displaySong = isPlayingUI
    ? (currentSong ?? selectedSong)
    : selectedSong;
  const displayTitle = displaySong?.title[language] ?? "";

  return (
    <ImageBackground
      source={require("../assets/images/bg.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: 20 + insets.bottom },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerRow}>
          <View style={styles.headerSpacer} />
          <LanguageSwitcher
            language={language}
            onLanguageChange={setLanguage}
          />
        </View>

        <Pressable
          style={styles.coverWrapper}
          onPress={() => !isPlayingUI && setDrawerOpen(true)}
          disabled={isPlayingUI}
        >
          <SongCover source={displaySong.image} />
        </Pressable>

        <View style={styles.titleRow}>
          <Pressable
            onPress={() => toggleFavorite(displaySong.id)}
            hitSlop={12}
            style={styles.favoriteIcon}
          >
            <Heart
              size={18}
              color="#B24201"
              fill={favorites.has(displaySong.id) ? "#B24201" : "none"}
            />
          </Pressable>
          <Text style={styles.title} numberOfLines={1}>
            {displayTitle}
          </Text>
          <Pressable
            onPress={() => !isPlayingUI && setDrawerOpen(true)}
            hitSlop={12}
            style={[
              styles.changeIcon,
              isPlayingUI && styles.changeIconDisabled,
            ]}
            disabled={isPlayingUI}
          >
            <Music2 size={18} color={isPlayingUI ? "#A8A29E" : "#B24201"} />
          </Pressable>
        </View>

        <View style={styles.tags}>
          <Text style={styles.categoryTag}>
            {displaySong.category.toUpperCase()}
          </Text>
        </View>

        <MantraInfo song={displaySong} language={language} />

        <View style={styles.controls}>
          <PlayerControls
            isPlaying={isPlayingUI}
            onStop={handleStop}
            onPlayPause={handlePlayPause}
            onRandom={handleRandom}
            randomDisabled={isPlayingUI}
            currentTime={currentTime}
            duration={duration}
            onSeek={seekTo}
            onVolumeChange={setVolume}
          />
        </View>

        <View style={styles.modeSection}>
          <ModeSelector
            mode={mode}
            onChange={setMode}
            disabled={!canSwitchMode}
            language={language}
          />
        </View>

        <View style={styles.optionsSection}>
          <OptionsSelector
            mode={mode}
            timerValue={timerValue}
            repetitionValue={repetitionValue}
            onTimerChange={setTimerValue}
            onRepetitionChange={handleRepetitionChange}
            disabled={false}
            language={language}
          />
        </View>

        {mode === "repetition" &&
          remainingRepetitions !== null &&
          isPlayingUI && (
            <Text style={styles.remaining}>
              {t.remaining}: {remainingRepetitions} / {repetitionValue}
            </Text>
          )}

        {mode === "timer" && isPlayingUI && timerSecondsLeft > 0 && (
          <Text style={styles.remaining}>
            {t.timeLeft}: {Math.floor(timerSecondsLeft / 60)}:
            {String(timerSecondsLeft % 60).padStart(2, "0")}
          </Text>
        )}

        <SongDrawer
          visible={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          songs={songs}
          selectedSong={selectedSong}
          onSelectSong={handleSelectSong}
          language={language}
          favorites={favorites}
        />
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flex: 1 },
  content: { padding: 20 },
  headerRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 0,
  },
  headerSpacer: { flex: 1 },
  coverWrapper: { alignItems: "center", marginTop: 8, marginBottom: 8 },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 2,
  },
  title: {
    fontSize: 24,
    fontFamily: "AnekTamil-Medium",
    color: "#1E293B",
    textAlign: "center",
  },
  favoriteIcon: {
    paddingRight: 8,
  },
  changeIcon: {
    paddingLeft: 8,
  },
  changeIconDisabled: { opacity: 0.5 },
  tags: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 24,
  },
  categoryTag: {
    fontSize: 10,
    fontFamily: "AnekTamil-Medium",
    letterSpacing: 0.5,
    color: "#78350F",
    backgroundColor: "#F5F0E6",
    borderWidth: 1,
    borderColor: "#D4C4A8",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  controls: { marginBottom: 24, alignItems: "center" },
  modeSection: { marginBottom: 12, alignItems: "center" },
  optionsSection: { marginBottom: 12, alignItems: "center" },
  remaining: {
    fontSize: 14,
    fontFamily: "AnekTamil-Medium",
    color: "#78350F",
    textAlign: "center",
  },
});
