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
import { LoopDrawer } from "../components/LoopDrawer";
import { MantraInfoDrawer } from "../components/MantraInfoDrawer";
import { type Mode } from "../components/ModeSelector";
import { PlayerControls } from "../components/PlayerControls";
import { SongCover } from "../components/SongCover";
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

  // Persist last played song
  useEffect(() => {
    AsyncStorage.getItem("lastSongId").then((id) => {
      if (!id) return;
      const found = songs.find((s) => s.id === id);
      if (found) setSelectedSong(found);
    });
  }, []);

  // Loop settings
  const [mode, setMode] = useState<Mode>("none");
  const [timerValue, setTimerValue] = useState(15);
  const [repetitionValue, setRepetitionValue] = useState(11);

  // Drawer visibility
  const [songDrawerOpen, setSongDrawerOpen] = useState(false);
  const [loopDrawerOpen, setLoopDrawerOpen] = useState(false);
  const [mantraInfoOpen, setMantraInfoOpen] = useState(false);

  // Runtime state
  const [remainingRepetitions, setRemainingRepetitions] = useState<number | null>(null);
  const [timerSecondsLeft, setTimerSecondsLeft] = useState(0);
  const [replayInProgress, setReplayInProgress] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isPlayingRef = useRef(false);
  const audioRef = useRef<ReturnType<typeof useMantraAudioPlayer> | null>(null);
  const replayInProgressRef = useRef(false);

  // ── Playback complete handler ──────────────────────────────────────────────
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
    if (mode !== "repetition") return; // "none" — audio just stops
    setRemainingRepetitions((prev) => {
      if (prev === null) return null;
      const next = prev - 1;
      if (next <= 0) {
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
  const {
    isPlaying,
    currentSong,
    currentTime,
    duration,
    loadAndPlay,
    playPause,
    stop,
    replay,
    seekTo,
  } = audio;

  isPlayingRef.current = isPlaying;

  // ── Timer countdown ────────────────────────────────────────────────────────
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
    timerRef.current = setInterval(() => {
      setTimerSecondsLeft((prev) => {
        if (prev <= 1) {
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
      if (mode === "repetition") setRemainingRepetitions(null);
    }
  }, [isPlaying, mode, replayInProgress, clearTimer]);

  // ── Controls ───────────────────────────────────────────────────────────────
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
      if (mode === "repetition") setRemainingRepetitions(repetitionValue);
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
    repetitionValue,
    remainingRepetitions,
    loadAndPlay,
    playPause,
  ]);

  const handlePrev = useCallback(() => {
    replay();
  }, [replay]);

  const handleNext = useCallback(() => {
    const next = getRandomSong(selectedSong);
    setSelectedSong(next);
    AsyncStorage.setItem("lastSongId", next.id);
    loadAndPlay(next);
    if (mode === "repetition") setRemainingRepetitions(repetitionValue);
  }, [selectedSong, mode, repetitionValue, loadAndPlay]);

  const handleSelectSong = useCallback(
    (song: Song) => {
      setSelectedSong(song);
      AsyncStorage.setItem("lastSongId", song.id);
      if (isPlayingRef.current) {
        loadAndPlay(song);
        if (mode === "repetition") setRemainingRepetitions(repetitionValue);
      }
    },
    [mode, repetitionValue, loadAndPlay],
  );

  // ── Loop drawer confirm ────────────────────────────────────────────────────
  const handleLoopConfirm = useCallback(
    (newMode: Mode, newTimer: number, newRep: number) => {
      setMode(newMode);
      setTimerValue(newTimer);
      setRepetitionValue(newRep);
      if (newMode !== "timer") clearTimer();
      if (newMode !== "repetition") setRemainingRepetitions(null);
      if (newMode === "repetition" && isPlayingRef.current) {
        setRemainingRepetitions(newRep);
      }
    },
    [clearTimer],
  );

  // ── Derived state ──────────────────────────────────────────────────────────
  const { favorites, toggleFavorite } = useFavorites();
  const t = useTranslations(language);

  const isPlayingUI = isPlaying || replayInProgress;
  const displaySong = isPlayingUI ? (currentSong ?? selectedSong) : selectedSong;
  const displayTitle = displaySong?.title[language] ?? "";

  // Loop info text shown below progress bar
  let loopInfoText: string | null = null;
  if (mode === "timer") {
    if (isPlayingUI && timerSecondsLeft > 0) {
      loopInfoText = `${t.timeLeft}: ${Math.floor(timerSecondsLeft / 60)}:${String(timerSecondsLeft % 60).padStart(2, "0")}`;
    } else if (!isPlayingUI) {
      loopInfoText = `${t.timer} · ${timerValue}${t.minutes}`;
    }
  } else if (mode === "repetition") {
    if (isPlayingUI && remainingRepetitions !== null) {
      loopInfoText = `${t.remaining}: ${remainingRepetitions} / ${repetitionValue}`;
    } else if (!isPlayingUI) {
      loopInfoText = `${t.repetition} · ${repetitionValue}${t.times}`;
    }
  }

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
          { paddingBottom: 24 + insets.bottom },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ── */}
        <View style={styles.headerRow}>
          <View style={styles.headerSpacer} />
          <LanguageSwitcher language={language} onLanguageChange={setLanguage} />
        </View>

        {/* ── Cover art ── */}
        <Pressable
          style={styles.coverWrapper}
          onPress={() => setSongDrawerOpen(true)}
        >
          <SongCover source={displaySong.image} />
        </Pressable>

        {/* ── Title row ── */}
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
            onPress={() => setSongDrawerOpen(true)}
            hitSlop={12}
            style={styles.changeIcon}
          >
            <Music2 size={18} color="#B24201" />
          </Pressable>
        </View>

        {/* ── Category tag ── */}
        <View style={styles.tags}>
          <Text style={styles.categoryTag}>
            {displaySong.category.toUpperCase()}
          </Text>
        </View>

        {/* ── Spotify-style controls ── */}
        <View style={styles.controls}>
          <PlayerControls
            isPlaying={isPlayingUI}
            mode={mode}
            onPlayPause={handlePlayPause}
            onStop={handleStop}
            onPrev={handlePrev}
            onNext={handleNext}
            onLoopPress={() => setLoopDrawerOpen(true)}
            currentTime={currentTime}
            duration={duration}
            onSeek={seekTo}
            loopInfoText={loopInfoText}
            onAboutMantraPress={() => setMantraInfoOpen(true)}
            language={language}
          />
        </View>

        {/* ── Drawers ── */}
        <SongDrawer
          visible={songDrawerOpen}
          onClose={() => setSongDrawerOpen(false)}
          songs={songs}
          selectedSong={selectedSong}
          onSelectSong={handleSelectSong}
          language={language}
          favorites={favorites}
        />

        <LoopDrawer
          visible={loopDrawerOpen}
          onClose={() => setLoopDrawerOpen(false)}
          mode={mode}
          timerValue={timerValue}
          repetitionValue={repetitionValue}
          onConfirm={handleLoopConfirm}
          language={language}
        />

        <MantraInfoDrawer
          visible={mantraInfoOpen}
          onClose={() => setMantraInfoOpen(false)}
          song={displaySong}
          language={language}
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
    flex: 1,
    fontSize: 22,
    fontFamily: "AnekTamil-Medium",
    color: "#1E293B",
    textAlign: "center",
  },
  favoriteIcon: { paddingRight: 8 },
  changeIcon: { paddingLeft: 8 },
  tags: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 20,
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
  controls: { marginBottom: 8, alignItems: "center", width: "100%" },
});
