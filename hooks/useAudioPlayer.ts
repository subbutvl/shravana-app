import {
  setAudioModeAsync,
  useAudioPlayer,
  useAudioPlayerStatus,
} from "expo-audio";
import { Image } from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Song } from "../types/song";

export type PlaybackState = {
  isPlaying: boolean;
  currentSong: Song | null;
  currentTime: number;
  duration: number;
};

export type UseAudioPlayerReturn = PlaybackState & {
  loadAndPlay: (song: Song) => void;
  playPause: () => void;
  stop: () => void;
  replay: () => void;
  seekTo: (seconds: number) => void;
  setVolume: (volume: number) => void;
};

export function useMantraAudioPlayer(
  onPlaybackComplete?: () => void,
): UseAudioPlayerReturn {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const onCompleteRef = useRef(onPlaybackComplete);
  onCompleteRef.current = onPlaybackComplete;

  const player = useAudioPlayer(null, { updateInterval: 500 });
  const status = useAudioPlayerStatus(player);

  useEffect(() => {
    setAudioModeAsync({
      playsInSilentMode: true,
      shouldPlayInBackground: true,
      interruptionMode: "duckOthers",
    });
  }, []);

  const didJustFinishHandled = useRef(false);
  useEffect(() => {
    const sub = player.addListener(
      "playbackStatusUpdate",
      (s: { didJustFinish?: boolean; playing?: boolean }) => {
        if (s.didJustFinish && !didJustFinishHandled.current) {
          didJustFinishHandled.current = true;
          onCompleteRef.current?.();
        }
        if (s.playing) {
          didJustFinishHandled.current = false;
        }
      },
    );
    return () => sub.remove();
  }, [player.id]);

  const loadAndPlay = useCallback(
    (song: Song) => {
      player.replace(song.audio);
      setCurrentSong(song);
      player.play();
      try {
        const artworkUrl = Image.resolveAssetSource(song.image).uri;
        player.setActiveForLockScreen(true, {
          title: song.title.en,
          artist: "Shravana",
          artworkUrl,
        });
      } catch {}
    },
    [player],
  );

  const playPause = useCallback(() => {
    if (status.playing) {
      player.pause();
    } else {
      if (currentSong) {
        player.play();
      }
    }
  }, [player, status.playing, currentSong]);

  const stop = useCallback(() => {
    player.pause();
    player.seekTo(0);
  }, [player]);

  const replay = useCallback(() => {
    player.seekTo(0);
    player.play();
  }, [player]);

  const seekTo = useCallback(
    (seconds: number) => {
      player.seekTo(seconds);
    },
    [player],
  );

  const setVolume = useCallback(
    (volume: number) => {
      player.volume = volume;
    },
    [player],
  );

  return {
    isPlaying: status.playing,
    currentSong,
    currentTime: status.currentTime ?? 0,
    duration: status.duration ?? 0,
    loadAndPlay,
    playPause,
    stop,
    replay,
    seekTo,
    setVolume,
  };
}
