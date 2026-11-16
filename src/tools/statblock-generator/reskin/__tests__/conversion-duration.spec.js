// THE PRINT EXEMPTION OUTLIVES THE TEXT IT WAS GRANTED FOR (critic's package-six
// review, 2026-10-22; test category 5, first half).
//
// checker.mjs's adjudicability loop opens `|| e.print) continue` — justified,
// because print's own text is print's. But the 2014 conversion REWRITES a print
// row while the row keeps its print stamp, so a converted print row carries text
// print never wrote and is exempt from every adjudicability gate. The Bone Sun
// Lich shipped "or be paralyzed" with no bound and the block read CLEAN; print's
// own 2024 row ends "until the start of the lich's next turn".
import { checkBlock } from '../checker.mjs';

// a minimal 2014 block carrying its 2024 twin in `other_edition`, which is how
// the engine saves both printings and how checkBlock pairs them
const block = ({ legacyText, modernText }) => ({
  name: 'Bone Sun Lich',
  format: '2014',
  type_and_alignment: 'Medium undead, neutral evil',
  armor_class: '17 (natural armor)',
  hit_points: '135 (18d8 + 54)',
  speed: '30 ft.',
  attributes: { STR: 11, DEX: 16, CON: 16, INT: 20, WIS: 14, CHA: 16 },
  challenge_rating: '20',
  proficiency_bonus: '+6',
  abilities: [],
  actions: [{ name: 'Paralyzing Touch', description: legacyText }],
  other_edition: {
    format: '2024',
    name: 'Bone Sun Lich',
    cr: 20,
    sections: { Actions: [{ name: 'Paralyzing Touch', text: modernText, print: true }] },
  },
});

// each gate is { status, findings: [{ rule, severity, message, value }] } — not a
// bare array. Flattening the gates themselves yields objects with no `rule`, so
// every assertion would match the empty string and PASS vacuously.
const findings = (b) => {
  const r = checkBlock(b);
  const all = Object.values(r.gates ?? {}).flatMap((g) => g?.findings ?? []);
  return all.map((f) => `${f.rule}: ${f.message}`).join('\n');
};

// a guard on the harness itself: the extractor must see SOMETHING on a block we
// know is flagged, or the negative tests below prove nothing.
test('the harness reads findings at all', () => {
  const out = findings(block({
    legacyText: 'Melee Spell Attack: +11 to hit, reach 5 ft. Hit: 15 (3d6 + 5) cold damage, and the target must succeed on a DC 19 Constitution saving throw or be paralyzed.',
    modernText: '*Melee Attack Roll:* +12, reach 5 ft. 15 (3d6 + 5) Cold damage, and the target has the Paralyzed condition until the start of the lich\'s next turn.',
  }));
  expect(out.length).toBeGreaterThan(0);
});

test('the 2024 row bounds Paralyzed and the 2014 sheet dropped it — FAIL', () => {
  const out = findings(block({
    legacyText: 'Melee Spell Attack: +11 to hit, reach 5 ft., one target. Hit: 15 (3d6 + 5) cold damage, and the target must succeed on a DC 19 Constitution saving throw or be paralyzed.',
    modernText: '*Melee Attack Roll:* +12, reach 5 ft. 15 (3d6 + 5) Cold damage, and the target has the Paralyzed condition until the start of the lich\'s next turn.',
  }));
  expect(out).toMatch(/conversion-dropped-duration/);
  expect(out).toMatch(/Paralyzing Touch/);
});

test('the 2014 row keeps the bound — no finding', () => {
  const out = findings(block({
    legacyText: 'Melee Spell Attack: +11 to hit, reach 5 ft., one target. Hit: 15 (3d6 + 5) cold damage, and the target must succeed on a DC 19 Constitution saving throw or be paralyzed until the end of its next turn.',
    modernText: '*Melee Attack Roll:* +12, reach 5 ft. 15 (3d6 + 5) Cold damage, and the target has the Paralyzed condition until the start of the lich\'s next turn.',
  }));
  expect(out).not.toMatch(/conversion-dropped-duration/);
});

// the gate may only accuse the CONVERSION. If print's own 2024 row never bounded
// the condition either, nothing was dropped in conversion and this is not its
// finding to make.
test('neither printing bounds it — not this gate\'s finding', () => {
  const out = findings(block({
    legacyText: 'Melee Spell Attack: +11 to hit, reach 5 ft. Hit: 15 (3d6 + 5) cold damage, and the target must succeed on a DC 19 Constitution saving throw or be paralyzed.',
    modernText: '*Melee Attack Roll:* +12, reach 5 ft. 15 (3d6 + 5) Cold damage, and the target has the Paralyzed condition.',
  }));
  expect(out).not.toMatch(/conversion-dropped-duration/);
});

// Prone self-ends (print: 50 bare of 51 — you stand up), so a bare Prone in the
// 2014 printing is print's own idiom and not a dropped duration.
test('a self-ending condition is exempt', () => {
  const out = findings(block({
    legacyText: 'Melee Weapon Attack: +11 to hit, reach 5 ft. Hit: 15 (3d6 + 5) bludgeoning damage, and the target is knocked prone.',
    modernText: '*Melee Attack Roll:* +12, reach 5 ft. 15 (3d6 + 5) Bludgeoning damage, and the target has the Prone condition until the end of its next turn.',
  }));
  expect(out).not.toMatch(/conversion-dropped-duration/);
});

test('a row with no 2014 counterpart is not accused', () => {
  const b = block({
    legacyText: 'irrelevant',
    modernText: '*Melee Attack Roll:* +12. 15 (3d6 + 5) Cold damage, and the target has the Paralyzed condition until the start of the lich\'s next turn.',
  });
  b.actions = [{ name: 'Something Else', description: 'no bearing on the row above' }];
  expect(findings(b)).not.toMatch(/conversion-dropped-duration/);
});
