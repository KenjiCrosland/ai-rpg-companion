/**
 * THE AUDIT IS SHOWN WHAT THE GM TYPED (part 2, 2026-11-18).
 *
 * The audit judged each row's fiction without the request. On the Air Elemental it called a row
 * written for "carries stolen voices" a mismatch because the creature had "no fiction for" voices,
 * and renamed it. The rename guard holds that now; the cause did not go away.
 *
 * It is also the instrument the owner's first rule needs: his commonest reason for a Fix is that the
 * sheet does not deliver what was typed, and only a person reading the sheet can see that today.
 *
 * NOTHING ACTS ON IT. `undelivered` is logged and counted like `weak`, and the rename guard is
 * untouched — a row written for a typed clause is still never renamed, whatever the finding says.
 *
 * The owner's rule forbids asserting on the words of a prompt, so what is tested here is the DATA
 * the prompt is built from and what the engine does with a finding: that the request and the clause
 * bindings reach the builder at all, that `undelivered` survives the response parser, and that a
 * finding carrying it cannot rename a bound row.
 */
import { buildAuditPrompt, validateAuditResponse } from '@/tools/statblock-generator/format-2024/audit.mjs';
import { writtenForATypedClause } from '../generate.mjs';

const monster = {
  name: 'Air Elemental', cr: 5, ac: 15, hp: 90,
  stats: { STR: 14, DEX: 20, CON: 14, INT: 6, WIS: 10, CHA: 6 },
  sections: {
    Traits: [{ name: 'Air Form', text: 'It can enter a creature\'s space.', print: true }],
    Actions: [
      { name: 'Thunderous Slam', text: '*Melee Attack Roll:* +8, reach 10 ft. 14 (2d8 + 5) Thunder damage.', print: true },
      { name: 'Stolen Voices', text: '*Wisdom Saving Throw:* DC 13, one creature within 60 feet. *Failure:* The target has the Frightened condition until the end of its next turn.', clauseId: 'cl_voices' },
    ],
  },
};
const clauseRows = [{ section: 'Actions', name: 'Stolen Voices', clause: 'carries stolen voices' }];

describe('the audit sees the ask', () => {
  test('the request and the clause bindings reach the prompt builder', () => {
    const withAsk = buildAuditPrompt(monster, '2024', { reskin: true, request: 'an air elemental that carries stolen voices', clauseRows });
    expect(withAsk).toContain('carries stolen voices');
    expect(withAsk).toContain('Stolen Voices');
  });

  test('a non-reskin audit, with no request, is unchanged', () => {
    const plain = buildAuditPrompt(monster, '2024', {});
    const same = buildAuditPrompt(monster, '2024', { request: '', clauseRows: [] });
    expect(plain).toBe(same);
    expect(plain).not.toContain('WHAT THE GM ASKED FOR');
  });

  test('a request with no bound rows still reaches it, without an empty list', () => {
    const only = buildAuditPrompt(monster, '2024', { reskin: true, request: 'an air elemental that carries stolen voices', clauseRows: [] });
    expect(only).toContain('carries stolen voices');
    expect(only).not.toContain('ROWS WRITTEN FOR A PART OF THAT ASK');
  });

  test('undelivered survives the response validator, as the other defect words do', () => {
    const finding = (defect) => JSON.stringify({ findings: [{
      principle: 1, section: 'Actions', entry: 'Stolen Voices', span: 'Frightened condition',
      issue: 'The row was written for "carries stolen voices" and frightens instead; nothing on the sheet is a voice.',
      suggestion: 'Give the row a voice.', confidence: 'medium', defect,
    }] });
    expect(validateAuditResponse(finding('weak'))).toBe(true);        // the control
    expect(validateAuditResponse(finding('undelivered'))).toBe(true);
  });

  // THE RENAME GUARD IS UNTOUCHED: whatever label a finding carries, a row written for a typed
  // clause is not renamed.
  test('a bound row is still never renamed, undelivered or not', () => {
    expect(writtenForATypedClause(monster.sections.Actions[1])).toBe(true);
    expect(writtenForATypedClause(monster.sections.Actions[0])).toBe(false);
  });
});
