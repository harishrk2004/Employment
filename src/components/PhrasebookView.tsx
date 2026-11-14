import { useState } from "react";
import { CheckCircle2, Circle, Loader2, Trash2, Volume2 } from "lucide-react";
import { LANGUAGES, type SavedPhrase } from "../types/language";

interface PhrasebookViewProps {
  phrases: SavedPhrase[];
  playingPhraseId: string | null;
  onPronounce: (phrase: SavedPhrase) => void;
  onToggleMastered: (id: string) => void;
  onRemovePhrase: (id: string) => void;
}

export function PhrasebookView({
  phrases,
  playingPhraseId,
  onPronounce,
  onToggleMastered,
  onRemovePhrase,
}: PhrasebookViewProps) {
  const [filterLang, setFilterLang] = useState<string>("all");

  const availableLangCodes = Array.from(new Set(phrases.map((p) => p.languageCode)));
  const filtered =
    filterLang === "all"
      ? phrases
      : phrases.filter((p) => p.languageCode === filterLang);

  const masteredCount = phrases.filter((p) => p.mastered).length;

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-slate-900">
            Saved Phrasebook
          </h1>
          <p className="mt-1.5 text-sm text-slate-600">
            <span className="tabular-nums font-medium text-slate-900">{phrases.length}</span>{" "}
            {phrases.length === 1 ? "phrase" : "phrases"} captured
            <span className="mx-2 text-slate-400" aria-hidden="true">·</span>
            <span className="tabular-nums font-medium text-slate-900">{masteredCount}</span>{" "}
            mastered
          </p>
        </div>

        {availableLangCodes.length > 0 && (
          <div className="flex flex-wrap items-center gap-1 rounded-lg bg-slate-200/70 p-1">
            <button
              type="button"
              onClick={() => setFilterLang("all")}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                filterLang === "all"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All languages
            </button>
            {availableLangCodes.map((code) => {
              const langName = LANGUAGES.find((l) => l.code === code)?.name || code;
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => setFilterLang(code)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                    filterLang === code
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {langName}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white px-6 py-16 text-center">
          <p className="font-display text-xl font-medium text-slate-900">
            Your phrasebook is empty
          </p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-600">
            During any conversation, click Check phrasing or Translate & unpack on a turn to save natural expressions and vocabulary here.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
          {filtered.map((item) => {
            const isPlaying = playingPhraseId === item.id;
            return (
              <div
                key={item.id}
                className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="space-y-1">
                  <div className="text-xs text-slate-500">
                    <span>{item.languageName}</span>
                    <span className="mx-1.5" aria-hidden="true">·</span>
                    <span>{item.mastered ? "Mastered" : "Practicing"}</span>
                  </div>
                  <p className="font-display text-lg font-medium text-slate-900">
                    {item.phrase}
                  </p>
                  <p className="text-sm text-slate-700">{item.translation}</p>
                  {item.note && (
                    <p className="text-xs text-slate-500">{item.note}</p>
                  )}
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => onPronounce(item)}
                    disabled={isPlaying}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 whitespace-nowrap cursor-pointer"
                  >
                    {isPlaying ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Volume2 className="h-3.5 w-3.5" />
                    )}
                    <span>Listen</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onToggleMastered(item.id)}
                    className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium whitespace-nowrap cursor-pointer ${
                      item.mastered
                        ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {item.mastered ? (
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    ) : (
                      <Circle className="h-3.5 w-3.5" />
                    )}
                    <span>{item.mastered ? "Mastered" : "Mark mastered"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onRemovePhrase(item.id)}
                    aria-label={`Remove ${item.phrase}`}
                    className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
