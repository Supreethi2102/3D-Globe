export const INTRO_STORAGE_KEY = 'portfolio-intro-seen';

export type IntroGreeting = {
  text: string;
  lang: string;
};

/**
 * Cinematic greeting run drawn from the splash frames.
 * Geo packs can replace this later; Kia ora always lands last.
 */
export const DEFAULT_GREETINGS: IntroGreeting[] = [
  { text: 'Hello', lang: 'en' },
  { text: '你好', lang: 'zh' },
  { text: 'Bonjour', lang: 'fr' },
  { text: 'नमस्ते', lang: 'hi' },
  { text: 'Hola', lang: 'es' },
  { text: 'こんにちは', lang: 'ja' },
  { text: 'مرحبا', lang: 'ar' },
  { text: 'Hallo', lang: 'de' },
  { text: 'Ciao', lang: 'it' },
  { text: '안녕하세요', lang: 'ko' },
  { text: 'Xin chào', lang: 'vi' },
  { text: 'Talofa', lang: 'sm' },
  { text: 'Bula', lang: 'fj' },
  { text: "G'day", lang: 'en-AU' },
  { text: 'Kia ora', lang: 'mi' },
];

export const INTRO_TAGLINE =
  'From kia ora to konnichiwa, every hello has a story. Welcome to mine.';

/** How long a mid greeting stays readable before the next fall. */
export const GREETING_HOLD_MS = 420;
/** Fall / zoom transition duration for mid greetings. Keep in sync with intro-fall-in/out. */
export const GREETING_SLAM_MS = 460;
/** Final greeting zoom-in duration. */
export const FINALE_ZOOM_MS = 560;
/** Brief pause on Kia ora + tagline before the full-page zoom. */
export const FINALE_HOLD_MS = 700;
/** Kia ora expands to cover the page, then reveal home. */
export const FINALE_EXPAND_MS = 1000;
/** Safety auto-dismiss if sequencing stalls. */
export const INTRO_AUTO_DISMISS_MS = 22000;

export function hasSeenIntro(): boolean {
  try {
    return localStorage.getItem(INTRO_STORAGE_KEY) === '1';
  } catch {
    return true;
  }
}

export function markIntroSeen(): void {
  try {
    localStorage.setItem(INTRO_STORAGE_KEY, '1');
  } catch {
    /* ignore */
  }
}

export function shouldShowIntro(pathname: string): boolean {
  return pathname === '/' && !hasSeenIntro();
}
