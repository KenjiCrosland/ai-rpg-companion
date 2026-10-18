/**
 * WHAT A NAME PROMISES THE RULE MUST DELIVER.
 *
 * One question, and it used to have two tables: `CONDITION_CLAIMS` in
 * generate.mjs vetted seven conditions with a bare word match and fed the repair
 * call, while this richer table sat in checker.mjs and only FAILED the finished
 * sheet. So the gate knew about "movement", "push" and "poison" claims that the
 * engine never asked the call to fix — and a late audit rename was vetted for
 * element claims (`nameClaimSatisfied`) but never for these, which is how
 * "Lance Charge" and "Poisoned Blade" reached live sheets (canaries, 2026-10-15).
 *
 * Each entry is [what the NAME says, what the TEXT must then contain, the plain
 * words for the receipt]. Shared by the engine's repair vet, the audit-rename
 * vet, and the checker's gate, so the three cannot drift.
 */
// THE UNION, NOT EITHER LIST (caught by the Petrifying Patient pin, 2026-10-15):
// the engine's table knew Petrified, Deafened, Charmed and Restrained, which the
// checker's did not, and the checker knew movement, push, poison and slow, which
// the engine's did not. Dropping either half loses real coverage — the first cut
// of this merge replaced one with the other and a pin from 2026-09-08 caught it.
export const NAME_CLAIMS_MECHANIC = [
  [/\bpetrif\w*/i, /\bPetrified\b/, 'the Petrified condition'],
  [/\bdeafen\w*/i, /\bDeafened\b/, 'the Deafened condition'],
  [/\bcharm\w*/i, /\bCharmed\b/, 'the Charmed condition'],
  [/\brestrain\w*/i, /\bRestrained\b/, 'the Restrained condition'],
  [/\b(?:charge|rush|stampede|dash|stride|gallop|sprint)\b/i, /\b(?:moves?|move up to|movement|Speed|straight toward|feet in a straight line|Dash|Disengage|Difficult Terrain|Opportunity Attacks?)\b/, 'movement'], [/\b(?:fear|dread|terror|fright|horror|scare)\w*/i, /\bFrightened\b|Disadvantage on (?:attack rolls and ability checks|ability checks and attack rolls)/, 'the Frightened condition'] /* print writes the Frightened effect longhand where the creature fears a thing (the phobia shape: Sir Reginald's Avian Terror) */, [/\bstun\w*/i, /\bStunned\b/, 'the Stunned condition'], [/\bblind\w*/i, /\bBlinded\b/, 'the Blinded condition'], [/\b(?:grapple|grasp|grip|clutch|seize)\w*/i, /\bGrappled\b|\bescape DC\b/, 'the Grappled condition'], [/\b(?:trip|topple|sweep)\b/i, /\bProne\b/, 'the Prone condition'], [/\b(?:push\w*|repel\w*|hurl back)\b/i, /\bpushed\b/, 'a push'], [/\bshov\w*/i, /\bpushed\b|\bProne\b/, 'a push or a knockdown' /* 2024's Shove does either — the honest-noun table below offers Shove for a Prone row, and the two halves must agree (a renamed "Seismic Shove" over a Prone row was re-flagged, gatefix 2026-10-18) */] /* the -ing forms, as every other entry in this table already allows ("Shoving Slam" claimed a push nothing delivered, 2026-10-15) */, [/\bparaly\w*/i, /\bParalyzed\b/, 'the Paralyzed condition'], [/\bpoison\w*/i, /\bPoison(?:ed)?\b/, 'Poison'], [/\bhobbl\w*|\bcripple\w*|\bslow\w*/i, /\bSpeed\b|\bProne\b|\bRestrained\b/, 'a Speed, Prone or Restrained effect']];

// QUESTION 4 (owner, 2026-10-16): may the engine overrule a row name the call
// chose? Yes, for correctness. The repair call is offered the shape's honest
// nouns; failing that, the call's own MODIFIER is kept and the claim word is
// swapped for a noun the row actually earns — "Damned Charge" becomes "Damned
// Shove". This is the deterministic half, so a name that lies never ships just
// because a repair round ran out.
const HONEST_NOUN = [
  [/has the Prone condition|knocked prone/i, ['Shove', 'Slam', 'Sweep']],
  [/has the Grappled condition|is Grappled/i, ['Grasp', 'Hold', 'Clutch']],
  [/has the Restrained condition/i, ['Snare', 'Bind']],
  [/has the Frightened condition/i, ['Glare', 'Dread', 'Menace']],
  [/has the Charmed condition/i, ['Lure', 'Call']],
  [/has the Poisoned condition/i, ['Venom', 'Blight']],
  [/has the Blinded condition/i, ['Blind', 'Flash']],
  [/has the Deafened condition/i, ['Peal', 'Clangor']],
  [/has the Stunned condition/i, ['Stagger', 'Rattle']],
  [/\bpushed\b|pulled up to|moves? the target/i, ['Shove', 'Heave']],
  // the movement claim (row 1 of NAME_CLAIMS_MECHANIC) had no honest noun to
  // offer, so a legendary "Shove Through" that only moved the creature could
  // not be renamed and shipped promising a push (gate 2026-10-17)
  [/\bmoves? up to\b|\bits Speed\b|without provoking Opportunity Attacks/i, ['Stride', 'Rush', 'Surge']],
  [/regains? \d+ Hit Points/i, ['Mending', 'Succour']],
  [/Saving Throw[^.]*\d+ \(\d+d\d+/i, ['Burst', 'Wave', 'Surge']],
  [/\) (?:Slashing) damage/i, ['Slash', 'Rend', 'Cut']],
  [/\) (?:Piercing) damage/i, ['Thrust', 'Stab', 'Pierce']],
  [/\) (?:Bludgeoning) damage/i, ['Blow', 'Strike', 'Smash']],
];

/** Nouns this row's own text earns, best first — what an honest name may use. */
export function honestNouns(text) {
  const t = String(text ?? '');
  const out = [];
  for (const [re, nouns] of HONEST_NOUN) if (re.test(t)) out.push(...nouns);
  return [...new Set(out)];
}

/** The claim word in a name, for swapping it out. */
export function claimWordIn(name) {
  const n = String(name ?? '');
  for (const [nameRe] of NAME_CLAIMS_MECHANIC) { const m = nameRe.exec(n); if (m) return m[0]; }
  return null;
}

/** The claim a name makes that its rule text does not keep, or null. */
export function mechanicUnkept(name, text) {
  const n = String(name ?? ''); const t = String(text ?? '');
  for (const [nameRe, textRe, what] of NAME_CLAIMS_MECHANIC) {
    if (nameRe.test(n) && !textRe.test(t)) return what;
  }
  return null;
}
