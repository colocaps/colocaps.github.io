import { describe, expect, it } from 'vitest';
import { resolveLocale } from '../../src/shared/locale/resolve-locale';

describe('resolveLocale', () => {
  it('prefers a stored locale over the browser languages', () => {
    expect(resolveLocale({ stored: 'en', languages: ['es-AR'] })).toBe('en');
  });

  it('ignores a stored value that is not a shipped locale', () => {
    expect(resolveLocale({ stored: 'fr', languages: ['en-US'] })).toBe('en');
  });

  it('picks the first browser language we ship, by primary subtag', () => {
    expect(resolveLocale({ stored: null, languages: ['fr-FR', 'en-GB', 'es'] })).toBe('en');
    expect(resolveLocale({ stored: null, languages: ['es-AR'] })).toBe('es');
  });

  it('falls back to es when nothing matches', () => {
    expect(resolveLocale({ stored: null, languages: ['de', 'ja'] })).toBe('es');
    expect(resolveLocale({ stored: null, languages: [] })).toBe('es');
  });
});
