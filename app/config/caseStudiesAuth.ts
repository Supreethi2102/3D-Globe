const STORAGE_KEY = 'case-studies-unlocked';

/** Used when VITE_CASE_STUDIES_PASSWORD is not set, so hosted builds stay protected. */
const FALLBACK_PASSWORD = 'Twistnz99';

/** Password from Vite env, falling back to the built-in one. */
export function getCaseStudiesPassword(): string {
  const fromEnv = (import.meta.env.VITE_CASE_STUDIES_PASSWORD as string | undefined)?.trim();
  return fromEnv && fromEnv.length > 0 ? fromEnv : FALLBACK_PASSWORD;
}

export function isCaseStudiesPasswordRequired(): boolean {
  return getCaseStudiesPassword().length > 0;
}

export function isCaseStudiesUnlocked(): boolean {
  if (!isCaseStudiesPasswordRequired()) return true;
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

export function unlockCaseStudies(): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, '1');
  } catch {
    /* private mode / blocked storage — unlock still works for this page view via React state */
  }
}

export function verifyCaseStudiesPassword(input: string): boolean {
  const expected = getCaseStudiesPassword();
  if (!expected) return true;
  return input === expected;
}
