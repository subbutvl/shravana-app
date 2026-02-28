import {
  setAudioModeAsync,
  useAudioPlayer,
  useAudioPlayerStatus,
} from "expo-audio";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Song } from "../types/song";

export type PlaybackState = {
  isPlaying: boolean;
  currentSong: Song | null;
};

export type UseAudioPlayerReturn = PlaybackState & {
  loadAndPlay: (song: Song) => void;
  playPause: () => void;
  stop: () => void;
  replay: () => void;
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

  return {
    isPlaying: status.playing,
    currentSong,
    loadAndPlay,
    playPause,
    stop,
    replay,
  };
}
