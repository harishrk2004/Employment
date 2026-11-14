export type ProficiencyLevel = 'Beginner (A1–A2)' | 'Intermediate (B1–B2)' | 'Advanced (C1–C2)';

export type TutorVoiceName = 'Zephyr' | 'Kore' | 'Puck' | 'Charon' | 'Fenrir';

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  greetingHint: string;
}

export interface ScenarioOption {
  id: string;
  title: string;
  setting: string;
  description: string;
  goals: string[];
  imageUrl?: string;
  imageAlt?: string;
  rolePrompt: string;
}

export interface VoiceOption {
  name: TutorVoiceName;
  character: string;
}

export interface TranscriptTurn {
  id: string;
  role: 'user' | 'tutor';
  text: string;
  timestamp: number;
  isFinal: boolean;
  analysis?: TurnAnalysis | null;
  translation?: TurnTranslation | null;
}

export interface VocabularyItem {
  phrase: string;
  translation: string;
  note: string;
}

export interface TurnAnalysis {
  isNatural: boolean;
  naturalAlternative: string;
  explanation: string;
  vocabulary: VocabularyItem[];
}

export interface TurnTranslation {
  translation: string;
  literalBreakdown: string;
  pronunciationTip: string;
  keyPhrases: VocabularyItem[];
}

export interface SuggestedReply {
  targetText: string;
  translation: string;
  tone: string;
}

export interface SavedPhrase {
  id: string;
  languageCode: string;
  languageName: string;
  phrase: string;
  translation: string;
  note: string;
  mastered: boolean;
  savedAt: number;
}

export interface SessionReview {
  id: string;
  createdAt: number;
  languageName: string;
  level: ProficiencyLevel;
  scenarioTitle: string;
  durationSeconds: number;
  turnCount: number;
  summary: string;
  strengths: string[];
  focusAreas: string[];
  recommendedPhrases: VocabularyItem[];
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'es', name: 'Spanish', nativeName: 'Español', greetingHint: 'Hola, ¿cómo estás?' },
  { code: 'fr', name: 'French', nativeName: 'Français', greetingHint: 'Bonjour, comment allez-vous ?' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', greetingHint: 'こんにちは、お元気ですか？' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', greetingHint: 'Hallo, wie geht es Ihnen?' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano', greetingHint: 'Ciao, come stai?' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', greetingHint: 'Olá, tudo bem?' },
  { code: 'ko', name: 'Korean', nativeName: '한국어', greetingHint: '안녕하세요, 오늘 어떠세요?' },
  { code: 'zh', name: 'Mandarin', nativeName: '中文', greetingHint: '你好，今天怎么样？' },
];

export const PROFICIENCY_LEVELS: ProficiencyLevel[] = [
  'Beginner (A1–A2)',
  'Intermediate (B1–B2)',
  'Advanced (C1–C2)',
];

export const TUTOR_VOICES: VoiceOption[] = [
  { name: 'Zephyr', character: 'Warm & encouraging' },
  { name: 'Kore', character: 'Crisp & articulate' },
  { name: 'Puck', character: 'Playful & lively' },
  { name: 'Charon', character: 'Calm & measured' },
  { name: 'Fenrir', character: 'Expressive & dynamic' },
];

export const SCENARIOS: ScenarioOption[] = [
  {
    id: 'free-conversation',
    title: 'Open Conversation',
    setting: 'Daily life & culture',
    description: 'Relaxed, unscripted conversation about your day, interests, travel stories, or current thoughts.',
    goals: ['Warm greetings', 'Follow-up questions', 'Natural transitions'],
    rolePrompt: 'You are a friendly, attentive native-speaking conversation partner having an engaging daily chat.',
  },
  {
    id: 'neighborhood-cafe',
    title: 'Morning at a Neighborhood Café',
    setting: 'Hospitality & ordering',
    description: 'Order coffee and pastries, ask about daily specials, clarify dietary preferences, and settle the check politely.',
    goals: ['Polite requests', 'Menu questions', 'Paying the bill'],
    imageUrl: '/src/assets/images/scenario_paris_cafe_1794665695904.jpg',
    imageAlt: 'Morning espresso cup, croissant, and newspaper on a sidewalk café table',
    rolePrompt: 'You are a welcoming barista and server at a busy local neighborhood café. Stay warmly in character and guide the order naturally.',
  },
  {
    id: 'evening-izakaya',
    title: 'Evening Counter & Dining',
    setting: 'Social dining & recommendations',
    description: 'Ask the chef for seasonal recommendations, discuss flavors, and enjoy casual small talk at the counter.',
    goals: ['Asking recommendations', 'Describing taste', 'Casual banter'],
    imageUrl: '/src/assets/images/scenario_tokyo_izakaya_1794665696132.jpg',
    imageAlt: 'Warm evening dining counter with handmade ceramic plates and glowing paper lanterns',
    rolePrompt: 'You are a hospitable chef behind an intimate evening dining counter. Suggest seasonal dishes and chat naturally with your guest.',
  },
  {
    id: 'weekend-market',
    title: 'Weekend Food Market',
    setting: 'Shopping & everyday errands',
    description: 'Browse fresh produce, ask where ingredients come from, request specific weights or quantities, and ask for cooking tips.',
    goals: ['Quantities & prices', 'Ingredients & freshness', 'Everyday small talk'],
    imageUrl: '/src/assets/images/scenario_madrid_market_1794665696325.jpg',
    imageAlt: 'Sunlit indoor artisanal market stall with fresh oranges, crusty bread, and olives',
    rolePrompt: 'You are a knowledgeable, cheerful stall vendor at a bustling weekend food market. Help the learner choose fresh ingredients.',
  },
  {
    id: 'studio-interview',
    title: 'Studio & Career Conversation',
    setting: 'Professional & workplace',
    description: 'Introduce your background, describe a recent project clearly, and ask thoughtful questions about a team or role.',
    goals: ['Professional tone', 'Past project stories', 'Clarifying questions'],
    imageUrl: '/src/assets/images/scenario_career_studio_1794665696605.jpg',
    imageAlt: 'Sunlit architectural studio desk with an open linen notebook and pen by a tall window',
    rolePrompt: 'You are a thoughtful studio director having an informal introductory interview over coffee. Ask clear, realistic questions.',
  },
];
