import { useEffect, useRef } from "react";
import { GaplessAudioPlayer } from "../utils/audio";

interface WaveformStageProps {
  connectionState: "idle" | "connecting" | "connected" | "error";
  isMuted: boolean;
  isTutorSpeaking: boolean;
  micAnalyser: AnalyserNode | null;
  player: GaplessAudioPlayer | null;
  languageName: string;
  voiceName: string;
}

export function WaveformStage({
  connectionState,
  isMuted,
  isTutorSpeaking,
  micAnalyser,
  player,
  languageName,
  voiceName,
}: WaveformStageProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const barCount = 40;
    const freqBuffer = new Uint8Array(new ArrayBuffer(128));
    const smoothed = new Float32Array(barCount);
    let rafId = 0;

    const draw = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      if (canvas.width !== Math.floor(rect.width * dpr) || canvas.height !== Math.floor(rect.height * dpr)) {
        canvas.width = Math.floor(rect.width * dpr);
        canvas.height = Math.floor(rect.height * dpr);
      }

      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      let hasActiveSignal = false;
      let activeColor = "#94A3B8";

      if (connectionState === "connected") {
        if (player && player.getFrequencyData(freqBuffer)) {
          hasActiveSignal = true;
          activeColor = "#0284C7";
        } else if (micAnalyser && !isMuted) {
          micAnalyser.getByteFrequencyData(freqBuffer);
          hasActiveSignal = true;
          activeColor = "#059669";
        }
      }

      const centerY = height / 2;
      const step = width / barCount;
      const barWidth = Math.max(2 * dpr, step * 0.46);

      for (let i = 0; i < barCount; i++) {
        let targetNorm = 0.06;
        if (hasActiveSignal) {
          const binIndex = Math.min(freqBuffer.length - 1, Math.floor((i / barCount) * 44) + 2);
          const raw = freqBuffer[binIndex] / 255;
          // Symmetrical acoustic envelope tapering at edges
          const edgeWeight = Math.sin(((i + 0.5) / barCount) * Math.PI);
          targetNorm = Math.max(0.08, raw * (0.55 + edgeWeight * 0.65));
        } else if (connectionState === "connecting" && !prefersReducedMotion) {
          targetNorm = 0.1 + 0.08 * Math.sin(performance.now() * 0.005 + i * 0.35);
        }

        const lerp = prefersReducedMotion ? 1 : 0.24;
        smoothed[i] += (targetNorm - smoothed[i]) * lerp;

        const barHeight = Math.max(4 * dpr, smoothed[i] * (height * 0.78));
        const x = i * step + (step - barWidth) / 2;
        const y = centerY - barHeight / 2;

        ctx.fillStyle = hasActiveSignal ? activeColor : "#CBD5E1";
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, barWidth / 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafId);
  }, [connectionState, isMuted, micAnalyser, player]);

  const statusLabel =
    connectionState === "connecting"
      ? "Connecting voice channel..."
      : connectionState === "connected"
      ? isTutorSpeaking
        ? `${voiceName} is speaking`
        : isMuted
        ? "Microphone muted"
        : `Listening in ${languageName}`
      : connectionState === "error"
      ? "Connection interrupted"
      : "Ready for voice practice";

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
          {connectionState === "connected" && (
            <span
              className={`h-2 w-2 rounded-full ${
                isTutorSpeaking
                  ? "bg-sky-600"
                  : isMuted
                  ? "bg-amber-500"
                  : "bg-emerald-600 animate-pulse"
              }`}
              aria-hidden="true"
            />
          )}
          <span>{statusLabel}</span>
        </div>
        <span className="text-xs text-slate-500">
          {connectionState === "connected" ? "Live audio" : "16kHz / 24kHz PCM"}
        </span>
      </div>

      <canvas
        ref={canvasRef}
        className="h-20 w-full block"
        aria-label="Live voice waveform visualization"
      />
    </div>
  );
}
