import { useState, type FormEvent } from "react";
import { BookPlus, Check, Loader2, Send, Sparkles, Volume2 } from "lucide-react";
import type { TranscriptTurn, VocabularyItem } from "../types/language";

interface TranscriptPanelProps {
  turns: TranscriptTurn[];
  connectionState: "idle" | "connecting" | "connected" | "error";
  languageName: string;
  voiceName: string;
  analyzingTurnId: string | null;
  translatingTurnId: string | null;
  playingTurnId: string | null;
  savedPhrasesSet: Set<string>;
  onAnalyzeTurn: (turnId: string) => void;
  onTranslateTurn: (turnId: string) => void;
  onReplayTurn: (turnId: string, text: string) => void;
  onSavePhrase: (item: VocabularyItem) => void;
  onSendText: (text: string) => void;
}

export function TranscriptPanel({
  turns,
  connectionState,
  languageName,
  voiceName,
  analyzingTurnId,
  translatingTurnId,
  playingTurnId,
  savedPhrasesSet,
  onAnalyzeTurn,
  onTranslateTurn,
  onReplayTurn,
  onSavePhrase,
  onSendText,
}: TranscriptPanelProps) {
  const [draftText, setDraftText] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!draftText.trim() || connectionState !== "connected") return;
    onSendText(draftText.trim());
    setDraftText("");
  };

  return (
    <section
      aria-label="Conversation transcript"
      className="flex h-full min-h-[540px] flex-col rounded-xl border border-slate-200 bg-white"
    >
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Conversation Transcript</h2>
          <p className="text-xs text-slate-500">
            Spoken dialogue with instant phrasing feedback and phrasebook capture
          </p>
        </div>
        <span className="font-mono text-xs text-slate-500 tabular-nums">
          {turns.length} {turns.length === 1 ? "turn" : "turns"}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
        {turns.length === 0 ? (
          <div className="flex h-full min-h-[320px] flex-col items-center justify-center text-center px-4">
            <p className="font-display text-xl font-medium text-slate-900">
              {connectionState === "connected"
                ? `Speak naturally in ${languageName}`
                : "Start a voice session when you are ready"}
            </p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-600">
              {connectionState === "connected"
                ? `${voiceName} is listening. Say hello or respond to the opening prompt—your live transcript will appear here.`
                : `Choose your language, proficiency level, and scenario on the left, then select Start Conversation to speak in real time.`}
            </p>
          </div>
        ) : (
          turns.map((turn) => {
            const isUser = turn.role === "user";
            const isAnalyzing = analyzingTurnId === turn.id;
            const isTranslating = translatingTurnId === turn.id;
            const isPlaying = playingTurnId === turn.id;

            return (
              <article
                key={turn.id}
                className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
              >
                <div className="mb-1.5 flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-medium text-slate-700">
                    {isUser ? "You" : `${voiceName} (${languageName})`}
                  </span>
                  <span aria-hidden="true">·</span>
                  <time className="font-mono tabular-nums">
                    {new Date(turn.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </time>
                  {!turn.isFinal && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="text-sky-700">Transcribing</span>
                    </>
                  )}
                </div>

                <div
                  className={`max-w-[85%] rounded-xl px-4 py-3 text-[15px] leading-relaxed ${
                    isUser
                      ? "bg-slate-900 text-white"
                      : "border border-slate-200 bg-slate-50 text-slate-900"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{turn.text}</p>
                </div>

                {turn.isFinal && turn.text.trim().length > 0 && (
                  <div className="mt-2 flex flex-wrap items-center gap-4 text-xs">
                    {isUser ? (
                      <button
                        type="button"
                        onClick={() => onAnalyzeTurn(turn.id)}
                        disabled={isAnalyzing}
                        className="inline-flex items-center gap-1.5 font-medium text-sky-700 hover:text-sky-900 disabled:opacity-50 whitespace-nowrap cursor-pointer"
                      >
                        {isAnalyzing ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Sparkles className="h-3.5 w-3.5" />
                        )}
                        <span>{turn.analysis ? "Refresh phrasing check" : "Check phrasing"}</span>
                      </button>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => onTranslateTurn(turn.id)}
                          disabled={isTranslating}
                          className="inline-flex items-center gap-1.5 font-medium text-sky-700 hover:text-sky-900 disabled:opacity-50 whitespace-nowrap cursor-pointer"
                        >
                          {isTranslating && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                          <span>{turn.translation ? "Hide breakdown" : "Translate & unpack"}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => onReplayTurn(turn.id, turn.text)}
                          disabled={isPlaying}
                          className="inline-flex items-center gap-1.5 font-medium text-slate-600 hover:text-slate-900 disabled:opacity-50 whitespace-nowrap cursor-pointer"
                        >
                          {isPlaying ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <Volume2 className="h-3.5 w-3.5" />
                          )}
                          <span>Listen slowly</span>
                        </button>
                      </>
                    )}
                  </div>
                )}

                {turn.analysis && (
                  <div className="mt-3 w-full max-w-[85%] rounded-xl border border-slate-200 bg-slate-50/90 p-4 text-sm">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span
                        className={`text-xs font-semibold ${
                          turn.analysis.isNatural ? "text-emerald-700" : "text-amber-700"
                        }`}
                      >
                        {turn.analysis.isNatural
                          ? "Natural phrasing"
                          : "More natural alternative"}
                      </span>
                    </div>
                    <p className="font-medium text-slate-900">
                      {turn.analysis.naturalAlternative}
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                      {turn.analysis.explanation}
                    </p>

                    {turn.analysis.vocabulary.length > 0 && (
                      <div className="mt-3 border-t border-slate-200 pt-3 space-y-2">
                        {turn.analysis.vocabulary.map((vocab) => {
                          const key = vocab.phrase.toLowerCase();
                          const isSaved = savedPhrasesSet.has(key);
                          return (
                            <div
                              key={vocab.phrase}
                              className="flex items-start justify-between gap-3 text-xs"
                            >
                              <div>
                                <span className="font-semibold text-slate-900">
                                  {vocab.phrase}
                                </span>
                                <span className="mx-1.5 text-slate-400">·</span>
                                <span className="text-slate-600">{vocab.translation}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => onSavePhrase(vocab)}
                                disabled={isSaved}
                                className="inline-flex items-center gap-1 font-medium text-sky-700 hover:text-sky-900 disabled:text-emerald-700 whitespace-nowrap shrink-0 cursor-pointer"
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
                    )}
                  </div>
                )}

                {turn.translation && (
                  <div className="mt-3 w-full max-w-[85%] rounded-xl border border-slate-200 bg-white p-4 text-sm">
                    <p className="font-medium text-slate-900">
                      {turn.translation.translation}
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                      <span className="font-medium text-slate-700">Breakdown: </span>
                      {turn.translation.literalBreakdown}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-600">
                      <span className="font-medium text-slate-700">Pronunciation: </span>
                      {turn.translation.pronunciationTip}
                    </p>

                    {turn.translation.keyPhrases.length > 0 && (
                      <div className="mt-3 border-t border-slate-200 pt-3 space-y-2">
                        {turn.translation.keyPhrases.map((vocab) => {
                          const key = vocab.phrase.toLowerCase();
                          const isSaved = savedPhrasesSet.has(key);
                          return (
                            <div
                              key={vocab.phrase}
                              className="flex items-start justify-between gap-3 text-xs"
                            >
                              <div>
                                <span className="font-semibold text-slate-900">
                                  {vocab.phrase}
                                </span>
                                <span className="mx-1.5 text-slate-400">·</span>
                                <span className="text-slate-600">{vocab.translation}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => onSavePhrase(vocab)}
                                disabled={isSaved}
                                className="inline-flex items-center gap-1 font-medium text-sky-700 hover:text-sky-900 disabled:text-emerald-700 whitespace-nowrap shrink-0 cursor-pointer"
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
                    )}
                  </div>
                )}
              </article>
            );
          })
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="border-t border-slate-200 px-6 py-4 flex items-center gap-3"
      >
        <input
          type="text"
          value={draftText}
          onChange={(e) => setDraftText(e.target.value)}
          disabled={connectionState !== "connected"}
          placeholder={
            connectionState === "connected"
              ? `Type a message in ${languageName} or ask a quick question...`
              : "Connect a live session to send voice or text messages"
          }
          className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-600 focus:bg-white focus:outline-none disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={connectionState !== "connected" || !draftText.trim()}
          className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-40 whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Send className="h-4 w-4" />
          <span>Send</span>
        </button>
      </form>
    </section>
  );
}
