import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldAlert, ShieldCheck, Eye, Smartphone, AlertTriangle, Activity, Camera, Cpu } from "lucide-react";

interface Scenario {
  id: string;
  label: string;
  icon: React.ReactNode;
  riskLevel: "SAFE" | "WARNING" | "CRITICAL";
  confidence: number;
  gazeAngle: string;
  headPose: string;
  sensorAnomaly: string;
  actionRequired: string;
  visualBox: { x: number; y: number; width: number; height: number; label: string };
}

const SCENARIOS: Scenario[] = [
  {
    id: "attentive",
    label: "Attentive Driving",
    icon: <Eye className="w-3.5 h-3.5" />,
    riskLevel: "SAFE",
    confidence: 98.4,
    gazeAngle: "0° (Forward Road Axis)",
    headPose: "Neutral (Pitch: +2°, Yaw: 0°)",
    sensorAnomaly: "None (Steering Variance: 0.02)",
    actionRequired: "Normal Monitoring Active",
    visualBox: { x: 32, y: 22, width: 36, height: 42, label: "Face Tracked: Focused" },
  },
  {
    id: "phone",
    label: "Mobile Phone Use",
    icon: <Smartphone className="w-3.5 h-3.5" />,
    riskLevel: "CRITICAL",
    confidence: 96.2,
    gazeAngle: "-38° (Downward Handheld)",
    headPose: "Deviated (Pitch: -28°, Yaw: +15°)",
    sensorAnomaly: "Sudden Steering Micro-Corrections",
    actionRequired: "Trigger Audio Alert: Eyes On Road",
    visualBox: { x: 42, y: 48, width: 28, height: 32, label: "Handheld Phone Detected" },
  },
  {
    id: "drowsy",
    label: "Drowsiness / Microsleep",
    icon: <AlertTriangle className="w-3.5 h-3.5" />,
    riskLevel: "CRITICAL",
    confidence: 93.8,
    gazeAngle: "Eyelid Closure (PERCLOS > 0.8)",
    headPose: "Slumped (Pitch: -34°)",
    sensorAnomaly: "Lane Drift Tendency Detected",
    actionRequired: "Immediate Haptic & Cabin Warning",
    visualBox: { x: 30, y: 24, width: 40, height: 45, label: "Prolonged Eye Closure" },
  },
  {
    id: "mirror",
    label: "Reaching / Side Looking",
    icon: <Activity className="w-3.5 h-3.5" />,
    riskLevel: "WARNING",
    confidence: 89.5,
    gazeAngle: "+48° (Off-Road Right)",
    headPose: "Turned (Yaw: +52°)",
    sensorAnomaly: "Inconsistent Throttle Pressure",
    actionRequired: "Pre-alert Warning Timer (1.8s)",
    visualBox: { x: 48, y: 25, width: 35, height: 40, label: "Significant Yaw Deviation" },
  },
];

export const DistractionSim: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>("phone");
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [serverLatency, setServerLatency] = useState<number>(24);
  const current = SCENARIOS.find((s) => s.id === selectedId) || SCENARIOS[0];

  const handleSelectScenario = async (id: string) => {
    setSelectedId(id);
    setIsEvaluating(true);

    try {
      const res = await fetch("/api/predict/distraction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenarioId: id }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.latencyMs) {
          setServerLatency(data.latencyMs);
        }
      }
    } catch {
      // Graceful offline fallback
    } finally {
      setIsEvaluating(false);
    }
  };

  const getRiskColor = (level: Scenario["riskLevel"]) => {
    switch (level) {
      case "SAFE":
        return { text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30", badge: "bg-emerald-500 text-black" };
      case "WARNING":
        return { text: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30", badge: "bg-amber-400 text-black" };
      case "CRITICAL":
        return { text: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/30", badge: "bg-rose-500 text-white" };
    }
  };

  const colors = getRiskColor(current.riskLevel);

  return (
    <div className="rounded-xl border border-white/10 bg-[#0c0d10] p-4 sm:p-6 text-zinc-300 font-sans shadow-2xl">
      {/* Simulation Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-white/5 border border-white/10 text-emerald-400">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider font-mono text-zinc-400">Live Model Inference Demo</div>
            <div className="text-sm font-semibold text-white">Driver Distraction & Vision Analytics</div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>BACKEND LATENCY: {serverLatency}MS</span>
          <span className="text-white/20">|</span>
          <span>FPS: 30.0</span>
        </div>
      </div>

      {/* Scenario Selectors */}
      <div className="my-4">
        <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2 block">
          Select Simulated Driver Behavioral State:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {SCENARIOS.map((scenario) => {
            const isSelected = scenario.id === selectedId;
            return (
              <button
                key={scenario.id}
                onClick={() => handleSelectScenario(scenario.id)}
                className={`relative px-3 py-2.5 rounded-lg text-xs font-medium text-left transition-all duration-200 border flex items-center gap-2 ${
                  isSelected
                    ? "bg-white/10 border-white/30 text-white shadow-lg"
                    : "bg-white/[0.02] border-white/5 text-zinc-400 hover:bg-white/[0.05] hover:text-zinc-200"
                }`}
              >
                <span>{scenario.icon}</span>
                <span className="truncate">{scenario.label}</span>
                {isSelected && (
                  <motion.div
                    layoutId="activeScenarioIndicator"
                    className="absolute inset-0 rounded-lg border-2 border-emerald-400/50 pointer-events-none"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Simulator Main Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-4">
        {/* Synthetic Camera & Bounding Box Feed */}
        <div className="lg:col-span-6 relative aspect-video bg-black/60 rounded-lg border border-white/10 overflow-hidden flex flex-col justify-between p-3">
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 z-10">
            <span className="flex items-center gap-1.5 text-rose-400">
              <Camera className="w-3.5 h-3.5" />
              <span>LIVE CAM // SENSOR_01</span>
            </span>
            <span>MODEL: RESNET-CV-EXTRACTOR</span>
          </div>

          {/* Grid overlay for computer vision aesthetic */}
          <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 pointer-events-none opacity-20">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="border border-white/20" />
            ))}
          </div>

          {/* Driver Silhouette & Dynamic Detection Box */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Ambient Driver Graphic */}
            <div className="relative w-40 h-40 opacity-40">
              <div className="w-20 h-20 rounded-full border border-dashed border-zinc-500 mx-auto mt-4" />
              <div className="w-36 h-20 rounded-t-3xl border border-zinc-600 mx-auto mt-2" />
            </div>

            {/* Dynamic Bounding Box from CV */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: "absolute",
                  left: `${current.visualBox.x}%`,
                  top: `${current.visualBox.y}%`,
                  width: `${current.visualBox.width}%`,
                  height: `${current.visualBox.height}%`,
                }}
                className={`rounded border-2 ${colors.border} bg-white/[0.04] p-1 flex flex-col justify-between shadow-lg backdrop-blur-[1px]`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[9px] font-mono px-1 py-0.5 rounded font-bold ${colors.badge}`}>
                    {current.riskLevel}
                  </span>
                  <span className="text-[9px] font-mono text-white/70">{current.confidence}%</span>
                </div>
                <div className="text-[9px] font-mono text-white bg-black/80 px-1 py-0.5 rounded truncate">
                  {current.visualBox.label}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Feed Overlay */}
          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 z-10 bg-black/50 p-1.5 rounded backdrop-blur-sm">
            <span>TARGET: DRIVER CABIN</span>
            <span className={colors.text}>STATUS: {current.riskLevel}</span>
          </div>
        </div>

        {/* Feature Extraction & Telemetry Panel */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-3 bg-white/[0.02] border border-white/5 rounded-lg p-3.5">
          <div>
            <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">
              Extracted Feature Telemetry
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded bg-white/[0.02] border border-white/5">
                <span className="text-zinc-400 font-mono">Gaze Deviation:</span>
                <span className="font-mono text-white font-medium">{current.gazeAngle}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-white/[0.02] border border-white/5">
                <span className="text-zinc-400 font-mono">Head Pose Vector:</span>
                <span className="font-mono text-white font-medium">{current.headPose}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-white/[0.02] border border-white/5">
                <span className="text-zinc-400 font-mono">Sensor Telemetry:</span>
                <span className="font-mono text-white font-medium">{current.sensorAnomaly}</span>
              </div>
            </div>
          </div>

          {/* Model Confidence Meter */}
          <div className="pt-2 border-t border-white/5">
            <div className="flex items-center justify-between text-xs font-mono mb-1.5">
              <span className="text-zinc-400">Inference Confidence Score</span>
              <span className="text-white font-bold">{current.confidence}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${current.confidence}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`h-full ${
                  current.riskLevel === "SAFE"
                    ? "bg-emerald-400"
                    : current.riskLevel === "WARNING"
                    ? "bg-amber-400"
                    : "bg-rose-500"
                }`}
              />
            </div>
          </div>

          {/* Action Trigger */}
          <div className={`p-2.5 rounded-lg border flex items-center gap-2.5 ${colors.bg} ${colors.border}`}>
            {current.riskLevel === "SAFE" ? (
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <ShieldAlert className={`w-5 h-5 shrink-0 ${colors.text}`} />
            )}
            <div className="text-xs">
              <div className="font-bold text-white uppercase font-mono tracking-wide">System Action Required:</div>
              <div className="text-zinc-300">{current.actionRequired}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
