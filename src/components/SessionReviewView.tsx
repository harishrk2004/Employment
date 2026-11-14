import { BookPlus, Check, Loader2, Sparkles } from "lucide-react";
import type { SessionReview, VocabularyItem } from "../types/language";

interface SessionReviewViewProps {
  reviews: SessionReview[];
  hasActiveTranscript: boolean;
  isGeneratingReview: boolean;
  savedPhrasesSet: Set<string>;
  onGenerateReview: () => void;
  onSavePhrase: (item: VocabularyItem, languageName: string) => void;
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs.toString().padStart(2, "0")}s`;
}

export function SessionReviewView({
  reviews,
  hasActiveTranscript,
  isGeneratingReview,
  savedPhrasesSet,
  onGenerateReview,
  onSavePhrase,
}: SessionReviewViewProps) {
  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-slate-900">
            Session Reviews
          </h1>
          <p className="mt-1.5 text-sm text-slate-600">
            Structured coaching notes generated from your live spoken sessions.
          </p>
        </div>

        <button
          type="button"
          onClick={onGenerateReview}
          disabled={!hasActiveTranscript || isGeneratingReview}
          className="inline-flex items-center gap-2 rounded-lg bg-sky-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-sky-800 disabled:opacity-40 whitespace-nowrap shrink-0 cursor-pointer"
        >
          {isGeneratingReview ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
          <span>{isGeneratingReview ? "Generating review..." : "Analyze current session"}</span>
        </button>
      </div>

      {reviews.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white px-6 py-16 text-center">
          <p className="font-display text-xl font-medium text-slate-900">
            No session reviews yet
          </p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-600">
            Have a short spoken exchange in the Practice Studio, then click Analyze current session to receive personalized strengths, focus areas, and phrases to keep.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="rounded-xl border border-slate-200 bg-white p-6 space-y-5"
            >
              <div className="flex flex-col gap-2 border-b border-slate-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-xs text-slate-500">
                    <span>{review.languageName}</span>
                    <span className="mx-1.5" aria-hidden="true">·</span>
                    <span>{review.level}</span>
                    <span className="mx-1.5" aria-hidden="true">·</span>
                    <span>
                      {new Date(review.createdAt).toLocaleDateString([], {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <h2 className="mt-1 font-display text-xl font-semibold text-slate-900">
                    {review.scenarioTitle}
                  </h2>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-600 font-mono tabular-nums">
                  <span>{formatDuration(review.durationSeconds)}</span>
                  <span aria-hidden="true">·</span>
                  <span>{review.turnCount} turns</span>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-slate-700">{review.summary}</p>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <h3 className="text-xs font-semibold text-emerald-800">
                    What worked well
                  </h3>
                  <ul className="mt-2 space-y-2 text-sm text-slate-700">
                    {review.strengths.map((s, idx) => (
                      <li key={idx} className="leading-relaxed">
                        • {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xs font-semibold text-amber-800">
                    Next focus areas
                  </h3>
                  <ul className="mt-2 space-y-2 text-sm text-slate-700">
                    {review.focusAreas.map((f, idx) => (
                      <li key={idx} className="leading-relaxed">
                        • {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {review.recommendedPhrases.length > 0 && (
                <div className="border-t border-slate-100 pt-4">
                  <h3 className="text-xs font-semibold text-slate-900">
                    High-value phrases from this session
                  </h3>
                  <div className="mt-3 divide-y divide-slate-100">
                    {review.recommendedPhrases.map((item) => {
                      const isSaved = savedPhrasesSet.has(item.phrase.toLowerCase());
                      return (
                        <div
                          key={item.phrase}
                          className="flex items-start justify-between gap-4 py-2.5 text-sm"
                        >
                          <div>
                            <p className="font-medium text-slate-900">{item.phrase}</p>
                            <p className="text-xs text-slate-600">
                              {item.translation} — {item.note}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => onSavePhrase(item, review.languageName)}
                            disabled={isSaved}
                            className="inline-flex items-center gap-1 text-xs font-medium text-sky-700 hover:text-sky-900 disabled:text-emerald-700 whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            {isSaved ? (
                              <>
                                <Check className="h-3.5 w-3.5" />
                                <span>Saved</span>
                              </>
                            ) : (
                              <>
                                <BookPlus className="h-3.5 w-3.5" />
                                <span>Save</span>
                              </>
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
