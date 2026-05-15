import { detectRegisterFromInput } from './detect-register-from-input.mjs';

// The cultural-language detection map was deleted during the per-
// register migration sweep — the function is now a no-op stub that
// always returns null (callers still call it, but the LLM's
// LANGUAGE REGISTER OVERRIDE handles cultural signals directly).
// This spec just verifies the stub's contract.

describe('detectRegisterFromInput (post-deletion stub)', () => {
  const sampleRegisters = [
    'Latin-inspired: formal, structured',
    'Norse-inspired: harsh consonants',
    'Japanese-inspired: clean syllables',
    'Yoruba-inspired: rhythmic with diacriticals',
    'Maori-inspired: vowel-rich Te Reo phonetics',
  ];

  it('returns null for every input — cultural detection is delegated to the LLM override block', () => {
    expect(detectRegisterFromInput('ofuda of the moonlit shrine', sampleRegisters)).toBeNull();
    expect(detectRegisterFromInput('Mjolnir of the Aesir',         sampleRegisters)).toBeNull();
    expect(detectRegisterFromInput('Gladius of the Legion',        sampleRegisters)).toBeNull();
    expect(detectRegisterFromInput('Mere of Whakapapa',            sampleRegisters)).toBeNull();
  });

  it('returns null for empty / null / missing input', () => {
    expect(detectRegisterFromInput('',         sampleRegisters)).toBeNull();
    expect(detectRegisterFromInput(null,       sampleRegisters)).toBeNull();
    expect(detectRegisterFromInput(undefined,  sampleRegisters)).toBeNull();
    expect(detectRegisterFromInput('anything', null)).toBeNull();
    expect(detectRegisterFromInput('anything', [])).toBeNull();
  });
});
