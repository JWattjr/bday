import { useState, useRef, useEffect, useCallback } from "react";
import { Music, VolumeX, SkipForward, SkipBack, Pause, Play } from "lucide-react";
import { config } from "../siteConfig";

export const AudioPlayer = ({
  trackIndex,
  setTrackIndex,
}: {
  trackIndex: number;
  setTrackIndex: (i: number) => void;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animFrameRef = useRef<number>(0);

  const songs = config.songs;
  const currentSong = songs[trackIndex];

  const loadTrack = useCallback(
    (index: number, autoplay: boolean) => {
      if (audioRef.current) {
        audioRef.current.pause();
        cancelAnimationFrame(animFrameRef.current);
      }
      const audio = new Audio(songs[index].url);
      audio.addEventListener("ended", () => {
        const next = (index + 1) % songs.length;
        setTrackIndex(next);
        loadTrack(next, true);
      });
      audioRef.current = audio;
      setProgress(0);
      if (autoplay) {
        audio.play().catch(() => {});
        setIsPlaying(true);
        tickProgress();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [songs]
  );

  useEffect(() => {
    loadTrack(0, false);
    return () => {
      if (audioRef.current) audioRef.current.pause();
      cancelAnimationFrame(animFrameRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tickProgress = () => {
    const update = () => {
      const a = audioRef.current;
      if (a && a.duration) setProgress((a.currentTime / a.duration) * 100);
      animFrameRef.current = requestAnimationFrame(update);
    };
    animFrameRef.current = requestAnimationFrame(update);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      cancelAnimationFrame(animFrameRef.current);
    } else {
      audioRef.current.play().catch(() => {});
      tickProgress();
    }
    setIsPlaying(!isPlaying);
  };

  const skip = (dir: 1 | -1) => {
    const next = (trackIndex + dir + songs.length) % songs.length;
    setTrackIndex(next);
    loadTrack(next, true);
  };

  // Collapsed FAB
  if (!expanded) {
    return (
      <button
        onClick={() => { setExpanded(true); if (!isPlaying) togglePlay(); }}
        className="fixed bottom-6 right-6 z-50 p-4 glass-card rounded-full text-rose transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Open music player"
      >
        {isPlaying ? <Music size={24} className="animate-pulse" /> : <VolumeX size={24} />}
      </button>
    );
  }

  return (
    <div
      className="fixed bottom-6 right-6 z-50 glass-card rounded-2xl p-4 w-72"
      style={{ animation: "slideUp .4s cubic-bezier(.16,1,.3,1) forwards" }}
    >
      <button
        onClick={() => setExpanded(false)}
        className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-deep-plum border border-glass-border text-rose text-xs flex items-center justify-center hover:bg-rose hover:text-midnight transition-colors"
        aria-label="Minimise player"
      >
        ✕
      </button>

      {/* Song title */}
      <div className="overflow-hidden mb-3">
        <p
          className="text-sm font-serif text-champagne whitespace-nowrap"
          style={{ animation: currentSong.title.length > 28 ? "marquee 8s linear infinite" : "none" }}
        >
          🎵 {currentSong.title}
        </p>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1 rounded-full bg-deep-plum/60 mb-3 overflow-hidden">
        <div
          className="h-full rounded-full transition-[width] duration-200"
          style={{ width: `${progress}%`, background: "linear-gradient(90deg, var(--color-rose), var(--color-champagne))" }}
        />
      </div>

      {/* Controls + Equalizer */}
      <div className="flex items-center justify-center gap-3">
        <button onClick={() => skip(-1)} className="p-2 rounded-full text-blush/70 hover:text-rose hover:bg-white/5 transition-colors" aria-label="Previous">
          <SkipBack size={18} />
        </button>

        <button onClick={togglePlay} className="p-3 rounded-full bg-rose/20 text-rose hover:bg-rose/30 transition-colors" aria-label={isPlaying ? "Pause" : "Play"}>
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>

        <button onClick={() => skip(1)} className="p-2 rounded-full text-blush/70 hover:text-rose hover:bg-white/5 transition-colors" aria-label="Next">
          <SkipForward size={18} />
        </button>

        {/* Animated equalizer bars */}
        <div className="flex items-end gap-[3px] h-4 ml-1">
          {[0.6, 1.0, 0.7, 1.0, 0.5].map((delay, i) => (
            <div
              key={i}
              className="w-[3px] rounded-full bg-rose origin-bottom"
              style={{
                height: "16px",
                animation: isPlaying ? `eq ${delay}s ease-in-out ${i * 0.07}s infinite alternate` : "none",
                transform: isPlaying ? undefined : "scaleY(0.25)",
                transition: "transform 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>

      <p className="text-center text-xs text-blush/40 mt-2 font-sans">
        {trackIndex + 1} / {songs.length}
      </p>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
};
