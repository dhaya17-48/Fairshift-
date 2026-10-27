import { describe, expect, it } from 'vitest';
import { SUPPORTED_LANGUAGES, TRANSLATIONS, TranslationDictionary } from './translations';
import { LanguageCode } from '../types';

describe('FairShift Multilingual Translations (SDG 8)', () => {
  const canonicalKeys = Object.keys(TRANSLATIONS.en) as (keyof TranslationDictionary)[];

  it('provides translations for all 7 supported languages', () => {
    expect(SUPPORTED_LANGUAGES.length).toBe(7);
    const expectedCodes: LanguageCode[] = ['en', 'hi', 'ta', 'te', 'bn', 'mr', 'kn'];
    expect(SUPPORTED_LANGUAGES.map((l) => l.code).sort()).toEqual(expectedCodes.sort());
  });

  SUPPORTED_LANGUAGES.forEach(({ code, label, nativeLabel }) => {
    describe(`Language: ${label} (${nativeLabel}) [${code}]`, () => {
      it(`defines the dictionary for ${code}`, () => {
        expect(TRANSLATIONS[code]).toBeDefined();
      });

      canonicalKeys.forEach((key) => {
        it(`contains valid non-empty translation for key: "${String(key)}"`, () => {
          const dict = TRANSLATIONS[code];
          expect(dict).toHaveProperty(key);

          const val = dict[key];
          expect(val).toBeDefined();

          if (typeof val === 'string') {
            expect(val.trim().length).toBeGreaterThan(0);
          } else if (typeof val === 'function') {
            // Test callables
            if (key === 'speechTextTemplate') {
              const res = (val as Function)(3680, 40, 0, 320);
              expect(typeof res).toBe('string');
              expect(res.trim().length).toBeGreaterThan(0);
            } else if (key === 'payslipSubtitle') {
              const res = (val as Function)(100);
              expect(typeof res).toBe('string');
              expect(res.trim().length).toBeGreaterThan(0);
            } else if (key === 'activeSectorInfo') {
              const res = (val as Function)(100);
              expect(typeof res).toBe('string');
              expect(res.trim().length).toBeGreaterThan(0);
            } else if (key === 'announceShiftLogged') {
              const res = (val as Function)(8);
              expect(typeof res).toBe('string');
              expect(res.trim().length).toBeGreaterThan(0);
            } else if (key === 'announceSectorSwitched') {
              const res = (val as Function)('Construction Site');
              expect(typeof res).toBe('string');
              expect(res.trim().length).toBeGreaterThan(0);
            } else if (key === 'regularHoursCalc') {
              const res = (val as Function)(40, 100);
              expect(typeof res).toBe('string');
              expect(res.trim().length).toBeGreaterThan(0);
            } else if (key === 'overtimeHoursCalc') {
              const res = (val as Function)(10, 200);
              expect(typeof res).toBe('string');
              expect(res.trim().length).toBeGreaterThan(0);
            } else if (key === 'grossHoursCalc') {
              const res = (val as Function)(50);
              expect(typeof res).toBe('string');
              expect(res.trim().length).toBeGreaterThan(0);
            } else if (key === 'formatDay') {
              const res = (val as Function)('Mon');
              expect(typeof res).toBe('string');
              expect(res.trim().length).toBeGreaterThan(0);
            } else if (key === 'formatRole') {
              const res = (val as Function)('Masonry Specialist');
              expect(typeof res).toBe('string');
              expect(res.trim().length).toBeGreaterThan(0);
            }
          }
        });
      });

      it(`has no missing keys compared to English dictionary`, () => {
        const langKeys = Object.keys(TRANSLATIONS[code]);
        const missingKeys = canonicalKeys.filter((k) => !langKeys.includes(k));
        expect(
          missingKeys,
          `Language "${code}" is missing translation keys: ${missingKeys.join(', ')}`
        ).toEqual([]);
      });
    });
  });

  it('contains expected Tamil translations for key Worker App strings', () => {
    const ta = TRANSLATIONS.ta;
    expect(ta.viewPayslip).toBe('சம்பள சீட்டை காண்க');
    expect(ta.weeklyTakeHome).toBe('வாராந்திர கைக்கு வரும் தொகை');
    expect(ta.addShiftButton).toBe('பணி நேரத்தை சேர்');
    expect(ta.opt9h).toContain('9 மணி நேரம்');
    expect(ta.opt9h).toContain('2x');
    expect(ta.overtimeNotice).toContain('>8 மணி');
    expect(ta.appTagline).toContain('2x');
    expect(ta.appFooter).toContain('ஃபேர்ஷிப்ட்');
  });
});
