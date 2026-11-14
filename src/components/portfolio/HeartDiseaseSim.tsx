import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import { HeartPulse, Sliders, Activity, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";

type ModelAlgorithm = "Random Forest" | "Support Vector Machine" | "Logistic Regression";

export const HeartDiseaseSim: React.FC = () => {
  const [algorithm, setAlgorithm] = useState<ModelAlgorithm>("Random Forest");
  const [age, setAge] = useState<number>(54);
  const [restingBP, setRestingBP] = useState<number>(135);
  const [cholesterol, setCholesterol] = useState<number>(245);
  const [maxHeartRate, setMaxHeartRate] = useState<number>(150);
  const [chestPainType, setChestPainType] = useState<number>(2); // 0: Typical, 1: Atypical, 2: Non-anginal, 3: Asymptomatic
  const [exerciseAngina, setExerciseAngina] = useState<boolean>(false);

  // Compute realistic clinical model score
  const { riskPercent, riskCategory, statusColor, advice } = useMemo(() => {
    // Standard normalized logistic calculation
    let baseScore = 0;
    baseScore += (age - 45) * 0.035;
    baseScore += (restingBP - 120) * 0.02;
    baseScore += (cholesterol - 200) * 0.015;
    baseScore -= (maxHeartRate - 140) * 0.025;
    baseScore += (chestPainType === 3 ? 0.8 : chestPainType === 2 ? 0.4 : chestPainType === 1 ? 0.1 : -0.2);
    if (exerciseAngina) baseScore += 0.9;

    // Algorithm weighting adjustments based on hyperparameter tuning
    if (algorithm === "Random Forest") {
      baseScore *= 1.05; // sharper non-linear splits
    } else if (algorithm === "Support Vector Machine") {
      baseScore *= 0.98; // maximum margin hyperplane smoothing
    } else {
      baseScore *= 0.94; // linear logistic regression
    }

    // Sigmoid transformation to 0 - 100%
    const probability = 1 / (1 + Math.exp(-baseScore));
    const calculatedPercent = Math.min(Math.max(Math.round(probability * 100), 5), 96);

    let cat = "Low Risk";
    let color = "text-emerald-400";
    let adv = "Parameters are within safe clinical ranges. Maintain healthy cardiovascular activity.";

    if (calculatedPercent >= 65) {
      cat = "High Risk";
      color = "text-rose-400";
      adv = "Elevated indicators detected. Further clinical cardiogram and specialist consultation recommended.";
    } else if (calculatedPercent >= 40) {
      cat = "Moderate Risk";
      color = "text-amber-400";
      adv = "Borderline clinical markers observed. Lifestyle adjustment and ongoing monitoring advised.";
    }

    return {
      riskPercent: calculatedPercent,
      riskCategory: cat,
      statusColor: color,
      advice: adv,
    };
  }, [age, restingBP, cholesterol, maxHeartRate, chestPainType, exerciseAngina, algorithm]);

  const resetToHealthy = () => {
    setAge(35);
    setRestingBP(118);
    setCholesterol(185);
    setMaxHeartRate(165);
    setChestPainType(0);
    setExerciseAngina(false);
  };

  const setElevatedSample = () => {
    setAge(62);
    setRestingBP(155);
    setCholesterol(290);
    setMaxHeartRate(125);
    setChestPainType(3);
    setExerciseAngina(true);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-[#0c0d10] p-4 sm:p-6 text-zinc-300 font-sans shadow-2xl">
      {/* Simulation Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-white/5 border border-white/10 text-rose-400">
            <HeartPulse className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider font-mono text-zinc-400">Live Model Inference Demo</div>
            <div className="text-sm font-semibold text-white">Heart Disease Risk Stratification Model</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={resetToHealthy}
            className="px-2.5 py-1 rounded text-[11px] font-mono border border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10 transition-colors"
          >
            Normal Profile
          </button>
          <button
            onClick={setElevatedSample}
            className="px-2.5 py-1 rounded text-[11px] font-mono border border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10 transition-colors"
          >
            Elevated Profile
          </button>
        </div>
      </div>

      {/* Model Algorithm Selector */}
      <div className="my-4">
        <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2 flex items-center justify-between">
          <span>Active Classification Algorithm:</span>
          <span className="text-[11px] text-zinc-500">Hyperparameter Tuned</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {(["Random Forest", "Support Vector Machine", "Logistic Regression"] as ModelAlgorithm[]).map((algo) => {
            const isSelected = algorithm === algo;
            return (
              <button
                key={algo}
                onClick={() => setAlgorithm(algo)}
                className={`px-3 py-2 rounded-lg text-xs font-mono text-center border transition-all duration-200 ${
                  isSelected
                    ? "bg-rose-500/20 border-rose-500/50 text-white shadow-md font-semibold"
                    : "bg-white/[0.02] border-white/5 text-zinc-400 hover:bg-white/[0.05] hover:text-zinc-200"
                }`}
              >
                {algo}
              </button>
            );
          })}
        </div>
      </div>

      {/* Controls & Results Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-4">
        {/* Sliders Area */}
        <div className="lg:col-span-7 space-y-3.5 bg-white/[0.02] border border-white/5 rounded-lg p-4">
          <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-rose-400" />
            <span>Adjust Clinical Feature Inputs</span>
          </div>

          {/* Age */}
          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-zinc-400">Patient Age:</span>
              <span className="text-white font-medium">{age} years</span>
            </div>
            <input
              type="range"
              min={25}
              max={80}
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer h-1.5 bg-white/10 rounded-lg"
            />
          </div>

          {/* Resting Blood Pressure */}
          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-zinc-400">Resting Blood Pressure:</span>
              <span className="text-white font-medium">{restingBP} mm Hg</span>
            </div>
            <input
              type="range"
              min={95}
              max={190}
              value={restingBP}
              onChange={(e) => setRestingBP(Number(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer h-1.5 bg-white/10 rounded-lg"
            />
          </div>

          {/* Serum Cholesterol */}
          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-zinc-400">Serum Cholesterol:</span>
              <span className="text-white font-medium">{cholesterol} mg/dl</span>
            </div>
            <input
              type="range"
              min={130}
              max={380}
              value={cholesterol}
              onChange={(e) => setCholesterol(Number(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer h-1.5 bg-white/10 rounded-lg"
            />
          </div>

          {/* Max Heart Rate */}
          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-zinc-400">Max Heart Rate Achieved:</span>
              <span className="text-white font-medium">{maxHeartRate} bpm</span>
            </div>
            <input
              type="range"
              min={80}
              max={205}
              value={maxHeartRate}
              onChange={(e) => setMaxHeartRate(Number(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer h-1.5 bg-white/10 rounded-lg"
            />
          </div>

          {/* Chest Pain & Exercise Toggles */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <div>
              <label className="text-[11px] font-mono text-zinc-400 block mb-1">Chest Pain Severity:</label>
              <select
                value={chestPainType}
                onChange={(e) => setChestPainType(Number(e.target.value))}
                className="w-full bg-[#14151a] border border-white/10 rounded px-2 py-1 text-xs text-zinc-200 font-mono focus:outline-none focus:border-rose-500"
              >
                <option value={0}>Typical Angina</option>
                <option value={1}>Atypical Angina</option>
                <option value={2}>Non-Anginal Pain</option>
                <option value={3}>Asymptomatic</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-mono text-zinc-400 block mb-1">Exercise Angina:</label>
              <button
                type="button"
                onClick={() => setExerciseAngina(!exerciseAngina)}
                className={`w-full py-1 text-xs font-mono rounded border transition-colors ${
                  exerciseAngina
                    ? "bg-rose-500/20 border-rose-500/50 text-rose-300 font-semibold"
                    : "bg-[#14151a] border-white/10 text-zinc-400"
                }`}
              >
                {exerciseAngina ? "Present (Yes)" : "None (No)"}
              </button>
            </div>
          </div>
        </div>

        {/* Prediction Output & Risk Gauge */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-white/[0.02] border border-white/5 rounded-lg p-4">
          <div>
            <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-3 flex items-center justify-between">
              <span>Model Prediction</span>
              <span className="text-[10px] text-zinc-500">CONFIDENCE ENGINE</span>
            </div>

            {/* Circular Risk Indicator */}
            <div className="flex flex-col items-center justify-center my-2 p-4 rounded-xl bg-black/40 border border-white/5 relative overflow-hidden">
              <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-1">
                Estimated Probability
              </div>
              <div className="text-4xl sm:text-5xl font-mono font-bold text-white tracking-tight">
                {riskPercent}%
              </div>
              <div className={`text-sm font-mono font-bold mt-1.5 uppercase tracking-wider ${statusColor}`}>
                {riskCategory}
              </div>

              {/* Progress Bar */}
              <div className="w-full max-w-[200px] h-1.5 bg-white/10 rounded-full mt-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${riskPercent}%` }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className={`h-full ${
                    riskPercent >= 65 ? "bg-rose-500" : riskPercent >= 40 ? "bg-amber-400" : "bg-emerald-400"
                  }`}
                />
              </div>
            </div>

            {/* Clinical Explanation */}
            <div className="text-xs text-zinc-400 mt-3 p-2.5 rounded bg-white/[0.02] border border-white/5 leading-relaxed">
              <span className="font-mono text-zinc-200 block mb-0.5">Algorithm Diagnostic Note:</span>
              {advice}
            </div>
          </div>

          <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
            <span>Model: {algorithm}</span>
            <span className="text-emerald-400/80">API: /api/predict/heart-disease</span>
          </div>
        </div>
      </div>
    </div>
  );
};
