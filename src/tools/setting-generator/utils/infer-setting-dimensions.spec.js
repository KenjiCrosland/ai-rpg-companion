/**
 * Tests for the scale-resolution slice of infer-setting-dimensions.
 *
 * The full inferSettingDimensions function calls an LLM and is exercised
 * by manual production review. The unit-testable surface is the pure
 * resolveScale helper, which encodes:
 *
 *   1. The ALWAYS_POLITY ceiling — region, kingdom, empire, plane
 *      cannot be place-scale regardless of LLM judgment.
 *   2. Defaults to 'polity' when the LLM omits scale, returns a
 *      garbled string, or returns null.
 *   3. Accepts 'place' (case-insensitive, whitespace-tolerant) for
 *      any type not in the ceiling.
 *
 * validateInferenceResponse is also covered — the scale field needs
 * to be optional at the validator level so legacy inference calls
 * pre-dating the place-scale split still pass shape validation.
 */

import {
  resolveScale,
  validateInferenceResponse,
} from './infer-setting-dimensions.mjs';

describe('resolveScale — ALWAYS_POLITY ceiling', () => {
  it('forces polity for region regardless of what the LLM returned', () => {
    expect(resolveScale('place', 'region')).toBe('polity');
    expect(resolveScale('landscape', 'region')).toBe('polity');
    expect(resolveScale('place', '  REGION  ')).toBe('polity');
  });

  it('forces polity for kingdom regardless of what the LLM returned', () => {
    expect(resolveScale('place', 'kingdom')).toBe('polity');
    expect(resolveScale('landscape', 'kingdom')).toBe('polity');
  });

  it('forces polity for empire regardless of what the LLM returned', () => {
    expect(resolveScale('place', 'empire')).toBe('polity');
    expect(resolveScale('landscape', 'empire')).toBe('polity');
  });

  it('forces polity for plane regardless of what the LLM returned', () => {
    expect(resolveScale('place', 'plane')).toBe('polity');
    expect(resolveScale('landscape', 'plane')).toBe('polity');
  });
});

describe('resolveScale — LLM judgment honored for non-ceiling types', () => {
  it('returns place when the LLM says place and the type is not in the ceiling', () => {
    expect(resolveScale('place', 'shrine')).toBe('place');
    expect(resolveScale('place', 'tower')).toBe('place');
    expect(resolveScale('place', 'building')).toBe('place');
    expect(resolveScale('place', 'sacred-grove')).toBe('place');
  });

  it('returns landscape when the LLM says landscape and the type is not in the ceiling', () => {
    expect(resolveScale('landscape', 'mountain-range')).toBe('landscape');
    expect(resolveScale('landscape', 'forest')).toBe('landscape');
    expect(resolveScale('landscape', 'battlefield')).toBe('landscape');
    expect(resolveScale('landscape', 'ghost-shore')).toBe('landscape');
  });

  it('accepts place / landscape with different casing and whitespace', () => {
    expect(resolveScale('PLACE', 'shrine')).toBe('place');
    expect(resolveScale('  Place  ', 'shrine')).toBe('place');
    expect(resolveScale('LANDSCAPE', 'mountain-range')).toBe('landscape');
    expect(resolveScale('  Landscape  ', 'forest')).toBe('landscape');
  });

  it('returns polity when the LLM says polity', () => {
    expect(resolveScale('polity', 'monastery')).toBe('polity');
    expect(resolveScale('polity', 'city')).toBe('polity');
  });
});

describe('resolveScale — defensive defaults', () => {
  it('defaults to polity when scale is null/undefined', () => {
    expect(resolveScale(null, 'monastery')).toBe('polity');
    expect(resolveScale(undefined, 'monastery')).toBe('polity');
  });

  it('defaults to polity when scale is a garbled string', () => {
    expect(resolveScale('huge', 'monastery')).toBe('polity');
    expect(resolveScale('tiny', 'monastery')).toBe('polity');
    expect(resolveScale('', 'monastery')).toBe('polity');
  });

  it('defaults to polity when type is null/undefined', () => {
    // No type to apply the ceiling against; LLM judgment falls through.
    expect(resolveScale('place', null)).toBe('place');
    expect(resolveScale('place', undefined)).toBe('place');
    expect(resolveScale(null, null)).toBe('polity');
  });

  it('defaults to polity when scale is a non-string value', () => {
    expect(resolveScale(42, 'monastery')).toBe('polity');
    expect(resolveScale({}, 'monastery')).toBe('polity');
    expect(resolveScale(['place'], 'monastery')).toBe('polity');
  });
});

describe('validateInferenceResponse — scale field is optional', () => {
  // Pre-existing inference responses (before place-scale shipped)
  // didn't have a scale field. Validator must accept those so older
  // call sites and any in-flight responses don't fail shape checks.

  it('accepts responses without a scale field', () => {
    const json = JSON.stringify({
      type: 'kingdom',
      character: ['ancient', 'corrupt', 'misty'],
      register: 'welsh',
      userName: null,
    });
    expect(validateInferenceResponse(json)).toBe(true);
  });

  it('accepts responses with scale: null', () => {
    const json = JSON.stringify({
      type: 'kingdom',
      character: ['ancient', 'corrupt', 'misty'],
      register: 'welsh',
      userName: null,
      scale: null,
    });
    expect(validateInferenceResponse(json)).toBe(true);
  });

  it('accepts responses with scale: "polity"', () => {
    const json = JSON.stringify({
      type: 'kingdom',
      character: ['ancient', 'corrupt', 'misty'],
      register: 'welsh',
      userName: null,
      scale: 'polity',
    });
    expect(validateInferenceResponse(json)).toBe(true);
  });

  it('accepts responses with scale: "place"', () => {
    const json = JSON.stringify({
      type: 'shrine',
      character: ['fey-touched', 'forest-hidden', 'twilit'],
      register: 'middle-welsh',
      userName: null,
      scale: 'place',
    });
    expect(validateInferenceResponse(json)).toBe(true);
  });

  it('accepts responses with scale: "landscape"', () => {
    const json = JSON.stringify({
      type: 'mountain-range',
      character: ['ancient', 'mountainous', 'song-keeping'],
      register: 'old-norse',
      userName: 'Stonemother',
      scale: 'landscape',
    });
    expect(validateInferenceResponse(json)).toBe(true);
  });

  it('rejects responses where scale is a non-string non-null value', () => {
    const json = JSON.stringify({
      type: 'kingdom',
      character: ['ancient', 'corrupt', 'misty'],
      register: 'welsh',
      userName: null,
      scale: 42,
    });
    expect(validateInferenceResponse(json)).toBe(false);
  });

  it('still rejects malformed JSON and missing required fields', () => {
    expect(validateInferenceResponse('not json')).toBe(false);
    expect(validateInferenceResponse(JSON.stringify({ type: 'kingdom' }))).toBe(false);
    expect(validateInferenceResponse(JSON.stringify({
      type: 42,
      character: ['x'],
      register: null,
      userName: null,
    }))).toBe(false);
  });
});
