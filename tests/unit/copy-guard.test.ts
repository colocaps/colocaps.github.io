import { describe, expect, it } from 'vitest';
import { en } from '../../src/i18n/en';
import { es } from '../../src/i18n/es';

// The architecture claims are exact facts; these tests stop a copy edit from drifting them.
describe.each([
  ['es', es],
  ['en', en],
])('architecture copy (%s)', (_locale, dictionary) => {
  const { flux, multitenant, fpa, whatsnew } = dictionary.architecture;

  it('keeps the Flux numbers and transport', () => {
    expect(flux.body).toContain('1M');
    expect(flux.body).toContain('24 h');
    expect(flux.body).toContain('WebSockets');
    expect(flux.body).toContain('~3');
    expect(flux.body).toContain('100%');
    expect(flux.body).not.toMatch(/react/i);
  });

  it('keeps the Multitenant claim', () => {
    expect(multitenant.body).toContain('ueno empresas');
    expect(multitenant.body).toContain('ueno bank');
    expect(multitenant.body).toContain('microapps');
  });

  it('names the FPA in full with its acronym and routes data to New Relic', () => {
    expect(fpa.name).toBe('Flutter Performance Agent (FPA)');
    expect(fpa.body).toContain('New Relic');
    expect(fpa.body).toMatch(/rebuilds/);
  });

  it('keeps WhatsNew as an AI release pipeline to Slack', () => {
    expect(whatsnew.name).toBe('WhatsNew');
    expect(whatsnew.body).toMatch(/Slack/i);
    expect(whatsnew.body).toMatch(/diff/i);
    expect(whatsnew.body).toMatch(/AI|IA/);
  });
});

describe('public content', () => {
  const everything = JSON.stringify([es, en]);

  it('exposes no phone number or street address', () => {
    expect(everything).not.toMatch(/\+54|351|Malvinas/);
  });

  it('mentions the FPA acronym only after the full name appears', () => {
    for (const dictionary of [es, en]) {
      const serialised = JSON.stringify(dictionary);
      expect(serialised.indexOf('FPA')).toBe(serialised.indexOf('Flutter Performance Agent (FPA)') + 'Flutter Performance Agent ('.length);
    }
  });
});
