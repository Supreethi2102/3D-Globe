const STORAGE_KEY = 'case-studies-unlocked';

/** Password from Vite env. Empty/unset = case studies stay open. */
export function getCaseStudiesPassword(): string {
  return (import.meta.env.VITE_CASE_STUDIES_PASSWORD as string | undefined)?.trim() ?? '';
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
