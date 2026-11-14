import { useState } from "react";
import { ArrowRight, Compass } from "lucide-react";
import { SCENARIOS, type ScenarioOption } from "../types/language";

interface ScenariosViewProps {
  selectedScenarioId: string;
  languageName: string;
  onSelectAndStart: (scenario: ScenarioOption) => void;
}

function ScenarioThumbnail({ scenario }: { scenario: ScenarioOption }) {
  const [imgFailed, setImgFailed] = useState(false);

  if (!scenario.imageUrl || imgFailed) {
    return (
      <div className="flex aspect-[4/3] w-full flex-col items-center justify-center bg-slate-100 text-slate-500">
        <Compass className="h-8 w-8 text-slate-400" />
        <span className="mt-2 text-xs font-medium text-slate-600">{scenario.setting}</span>
      </div>
    );
  }

  return (
    <img
      src={scenario.imageUrl}
      alt={scenario.imageAlt || scenario.title}
      referrerPolicy="no-referrer"
      onError={() => setImgFailed(true)}
      className="aspect-[4/3] w-full object-cover"
    />
  );
}

export function ScenariosView({
  selectedScenarioId,
  languageName,
  onSelectAndStart,
}: ScenariosViewProps) {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-slate-900">
            Conversation Scenarios
          </h1>
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-600">
            Step into a grounded, real-world situation in {languageName}. Your partner adapts vocabulary and tone to match your level.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {SCENARIOS.map((scenario) => {
          const isSelected = scenario.id === selectedScenarioId;
          return (
            <article
              key={scenario.id}
              className={`flex flex-col overflow-hidden rounded-xl border bg-white transition-colors ${
                isSelected ? "border-sky-600" : "border-slate-200"
              }`}
            >
              <ScenarioThumbnail scenario={scenario} />
              <div className="flex flex-1 flex-col p-5">
                <div className="text-xs text-slate-500">
                  <span>{scenario.setting}</span>
                  {isSelected && (
                    <>
                      <span className="mx-1.5" aria-hidden="true">·</span>
                      <span className="font-medium text-sky-700">Active selection</span>
                    </>
                  )}
                </div>

                <h2 className="mt-1.5 font-display text-xl font-semibold text-slate-900">
                  {scenario.title}
                </h2>

                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  {scenario.description}
                </p>

                <div className="mt-4 border-t border-slate-100 pt-4 text-xs text-slate-500">
                  {scenario.goals.join(" · ")}
                </div>

                <button
                  type="button"
                  onClick={() => onSelectAndStart(scenario)}
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 whitespace-nowrap cursor-pointer"
                >
                  <span>Practice this scenario</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
