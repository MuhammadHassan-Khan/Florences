import { useRef, useState } from "react";

import styles from "./MusicControl.module.css";

type Status = "stopped" | "playing" | "unavailable";

/**
 * Music control with explicit user activation (ARCHITECTURE §9: audio
 * must never start unexpectedly). Playback state is local UI state;
 * failure to load or play degrades to a disabled, labelled control.
 */
export default function MusicControl({ src, title }: { src: string; title: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // Status is keyed to the track source so a track change always starts
  // from "stopped" without an effect; the keyed <audio> is remounted, which
  // also stops any previous playback.
  const [playback, setPlayback] = useState<{ src: string; status: Status }>({
    src,
    status: "stopped",
  });
  const status: Status = playback.src === src ? playback.status : "stopped";

  function setStatus(next: Status) {
    setPlayback({ src, status: next });
  }

  async function togglePlayback() {
    const audio = audioRef.current;
    if (!audio) return;

    if (status === "playing") {
      audio.pause();
      setStatus("stopped");
      return;
    }

    try {
      await audio.play();
      setStatus("playing");
    } catch {
      // Decode failure, missing file, or browser blocking playback.
      setStatus("unavailable");
    }
  }

  const unavailable = status === "unavailable";
  const playing = status === "playing";

  return (
    <div className={styles.control}>
      <audio
        key={src}
        ref={audioRef}
        src={src}
        loop
        preload="none"
        onError={() => setStatus("unavailable")}
        onEnded={() => setStatus("stopped")}
      />
      <button
        type="button"
        className={styles.button}
        onClick={togglePlayback}
        disabled={unavailable}
        aria-pressed={playing}
        aria-label={
          unavailable
            ? "Music is not available in this demo"
            : playing
              ? `Pause ${title}`
              : `Play ${title}`
        }
        title={unavailable ? "Music not available in this demo" : title}
      >
        <span className={styles.icon} aria-hidden="true">
          {unavailable ? "♪" : playing ? "❚❚" : "♪"}
        </span>
        <span className={styles.srOnly}>
          {unavailable ? "music unavailable" : playing ? "playing" : "paused"}
        </span>
      </button>
      {!unavailable ? (
        <span className={styles.caption} aria-hidden="true">
          {playing ? "Music on" : "Music"}
        </span>
      ) : null}
    </div>
  );
}
