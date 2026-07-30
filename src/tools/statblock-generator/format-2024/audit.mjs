/**
 * Mechanical-audit judgment layer (owner design, 2026-07-29). One LLM call
 * that audits an assembled 2024 block for the defect classes deterministic
 * rules cannot see: adjudicability gaps (missing durations/areas/triggers,
 * undefined referents), counterplay absences, self-contradictions, meta
 * vocabulary, and unresolvable-at-the-table entries.
 *
 * Guardrails that make a nondeterministic judge safe to merge:
 * - Gate (owner call, option c): CR >= 5 or Legendary Actions only — the
 *   model doesn't fumble simple monsters, and the long tail lives in
 *   complex machinery.
 * - Every finding must quote a VERBATIM span; verifyAuditFindings drops
 *   any finding whose span isn't substring-present in the named entry.
 *   Hallucinated defects cost nothing.
 * - Confidence filter: high+medium merge; principle 5 (table usability,
 *   the most FP-prone) merges at high only. Low-confidence findings are
 *   logged for batch review, never spent on fix calls.
 * - Findings feed the FIRST fix round only, capped at 6; the block is
 *   never re-audited and audit findings can never block shipping.
 */
import { renderStatblock2024 } from './render.mjs';
import { logger } from '@/util/logger.mjs';

const MAX_MERGED_FINDINGS = 6;

export function auditEligible() {
  // Owner call (2026-08-03): the audit runs on ALL creatures. The CR >= 5
  // gate assumed simple monsters don't get fumbled — live counterexample:
  // a CR 4 block shipped an action built entirely around "the released
  // creature" with no release mechanic anywhere. Degraded mode and
  // structural rejects still skip (those guards live at the call site).
  return true;
}

export function buildAuditPrompt(monster, edition = '2024') {
  const is2014 = edition === '2014';
  return `You are auditing a D&D ${is2014 ? '5th edition (2014 rules)' : '2024-format'} monster statblock for MECHANICAL defects.
Deterministic checks (math, DCs, damage bands, known formatting rules) have
already run — do NOT re-check arithmetic, CR calibration, or damage budgets.
Your job is the judgment layer: defects of adjudicability, counterplay, and
internal consistency that pattern-matching cannot catch.

A defect is MECHANICAL if a GM running this monster at a table would be unable
to adjudicate an effect, or a player would be subjected to an effect with no
rules-legal response. Flavor problems (odd names, theme mismatches, redundant
design) are NOT defects — ignore them entirely.

Audit against these principles:

1. COUNTERPLAY. Every imposed state has a rules-legal path out, written in the
   entry: an escape DC, a repeat save, a fixed duration, a breakable object, or
   an interior-escape clause. This covers conditions (Grappled, Restrained),
   AND any removal from play (swallowed, banished, teleported away, trapped in
   another space). Frequency gates (1/Day, Recharge, "only while Bloodied") do
   NOT count as counterplay — they limit how often, not whether the target has
   agency once affected. An attack-roll-only effect that removes a creature
   from play with no save and no escape is a defect regardless of gating.

2. ADJUDICABILITY. Every effect answers: when does it happen (trigger, timing,
   or action cost), where does it apply (area, range, or target), and when does
   it end (duration or end condition). An aura with no area, a save effect with
   no range, a trait that describes an activity with no action cost, a
   condition with no duration — each is a defect. Also flag any effect whose
   resolution requires information the block does not provide (a referenced
   zone, object, or state that nothing defines or creates — e.g. spores that
   are never applied, a minion that is never created, "its arrival point" with
   no arrival mechanic). An entry with a name but NO rules text at all is
   always a defect.

3. SELF-CONSISTENCY. Entries must not contradict the block or themselves:
   abilities keyed to movement modes the creature lacks, conditions applied to
   targets immune to them by the block's own rider (e.g. Poisoned applied by a
   Poison-immune creature's aura is fine; a rider that only functions against
   Poisoned targets when nothing in the block applies Poisoned is not), riders
   referencing a state no entry creates. The monster referring to itself by a
   name that is not its own is a defect (referent inconsistency). So is an
   entry whose NAME promises a mechanic its text never delivers — a "Steam
   Shroud" that creates no obscurement, a "Reassemble" with no disassembly
   anywhere in the block, a "Spine Shot" that only hides. Swarm or colony
   mechanics (occupying other creatures' spaces, dispersing into components)
   on a creature not typed as a swarm are the same class of defect. So is
   a creature TYPE its content contradicts — a "Giant" that is a bodiless
   planar shade, a "Beast" with innate spellcasting and telepathy — and
   anatomy its components contradict (chitinous claws and insect scuttling
   on a swarm of Tiny Humanoids; a "Fin Slash" on a creature that flies
   but cannot swim; damage types with no shared physical cause on one
   body, like Radiant tendrils plus Poison spore clouds).

4. FORMAT INTEGRITY. Entry text contains only statblock language. Flag any
   design/meta vocabulary ("save-based action", "2024", "condition names",
   "as written", schema or instruction fragments), orphaned sentences detached
   from their entry, stray characters, or UI text. ${is2014
    ? 'Also flag 2024-format markers ("Attack Roll:", "*Failure:*", "*Success:*") — this block uses the classic 2014 phrasing throughout, and that phrasing is CORRECT here; never flag "must succeed on a DC X ... saving throw" forms.'
    : 'Also flag 2014-format save phrasing ("must succeed on a DC X ... saving throw or").'}

5. TABLE USABILITY. An entry a GM cannot resolve in ~10 seconds mid-combat is
   a defect: nested conditional branches, multi-clause parentheticals defining
   novel procedures, or effects requiring the GM to track state the block gives
   no way to track. Length alone is not the test — a long but linear entry is
   fine; a short entry with three branching conditions is not.

CALIBRATION — these are NOT defects. Do not flag:
- A trait imposing a recurring save WITH timing and area stated (the Stench
  pattern) or triggered on death (Death Burst pattern).
- An attack absent from the Multiattack line — a creature may always use a
  single named attack instead of Multiattack.
- Repeatable single-target hard CC with a save (official precedent: Ghoul,
  Lich). Only flag hard CC (Stunned/Paralyzed/Petrified/Unconscious) that is
  BOTH ungated AND area-targeting AND carries dice damage in the same clause.
- Ally-referencing abilities on an apparently solo monster (known, parked).
- Conditional or qualified resistances, "if available" reuse of Recharge
  actions, additive Multiattack riders.
- A Prone or Grappled condition with no duration: those conditions carry
  their own exit (standing up; the escape DC). Never suggest adding a
  duration to them.
- Anything you suspect is a balance problem. Balance is out of scope — the
  chassis owns it. If your reasoning contains "too strong," "too weak," or a
  comparison to CR, discard the finding.

THE STATBLOCK:
${renderStatblock2024(monster)}

ALSO check the TYPE line ("type_correction"): if the creature's content
plainly contradicts its type — a "Giant" that is a bodiless mist or
planar shade, a "Construct" that is a living spore-bearing fungus — give
the correct type (one of: Aberration, Beast, Celestial, Construct,
Dragon, Elemental, Fey, Fiend, Giant, Humanoid, Monstrosity, Ooze,
Plant, Undead); otherwise null. Correct CLEAR contradictions of
substance, AND types the content never expresses at all — an "Elemental"
whose body and abilities could belong to any animal is a Monstrosity or
Beast. One authentic trait does not outweigh the suite: if MOST of the
abilities express a different type (necrotic magic, Animate Dead, and
life-siphoning on an "Elemental" that merely burrows), correct to the
type the majority expresses. Never retype on theme or mood alone.

ALSO grade the monster's NAME ("name_grade"): A-F on evocativeness, fit
for this creature's type and abilities, and catchiness. A = could sit in
the Monster Manual as-is; B = solid, no reason to change; C = serviceable
but generic or forgettable; D = wrong register or a flat attack
description; F = absurd or misleading. FIT is judged against
what the creature IS — its nature, substance, and story: a psychic
telepath named for swamp muck, or a fire creature named like a frost
spirit, caps at C regardless of how good the name sounds. A name that
is merely a summary of its attack routine also caps at C — names carry
what a creature IS, not what it does. FIT is judged against
what the creature IS — its nature, substance, and story: a psychic
telepath named for swamp muck, or a fire creature named like a frost
spirit, caps at C regardless of how good the name sounds. A name that
is merely a summary of its attack routine also caps at C — names carry
what a creature IS, not what it does. A or B keeps the current
name — C or lower means it will be replaced. Grade the name, not your
ability to invent a different one.

OUTPUT: JSON only, no markdown fences. Report at most 6 findings.
{ "name_grade": "A-F",
  "type_correction": null,
  "findings": [ { "principle": <1-5>, "section": "<section name>",
  "entry": "<entry name>", "span": "<exact quoted text, verbatim>",
  "issue": "<one sentence>", "suggestion": "<one sentence, direction not prose>",
  "confidence": "high|medium|low" } ] }
An empty findings array is a correct and common output. Do not manufacture
findings to appear thorough. Every span must be verbatim text from the block —
if you cannot quote it, the finding does not exist.`;
}

export function validateAuditResponse(raw) {
  try {
    const parsed = JSON.parse(raw.replace(/^```(?:json)?\s*|\s*```$/g, ''));
    if (!Array.isArray(parsed?.findings)) return false;
    if (parsed.name_grade !== undefined && !/^[A-F][+-]?$/i.test(String(parsed.name_grade).trim())) return false;
    return parsed.findings.every((f) =>
      Number.isInteger(f?.principle) && f.principle >= 1 && f.principle <= 5
      && typeof f?.entry === 'string' && f.entry.trim()
      && typeof f?.span === 'string' && f.span.trim()
      && typeof f?.issue === 'string' && f.issue.trim()
      && ['high', 'medium', 'low'].includes(f?.confidence));
  } catch {
    return false;
  }
}

const CANONICAL_TYPES = ['Aberration', 'Beast', 'Celestial', 'Construct', 'Dragon', 'Elemental', 'Fey', 'Fiend', 'Giant', 'Humanoid', 'Monstrosity', 'Ooze', 'Plant', 'Undead'];

/**
 * The audit's type correction: a canonical type differing from the
 * block's current type, or null. Guards live at the APPLY site (never
 * user-picked types, never Swarm forms).
 */
export function auditTypeCorrection(raw, currentType) {
  try {
    const parsed = JSON.parse(raw.replace(/^```(?:json)?\s*|\s*```$/g, ''));
    const t = String(parsed?.type_correction ?? '').trim();
    const canonical = CANONICAL_TYPES.find((c) => c.toLowerCase() === t.toLowerCase());
    if (!canonical) return null;
    return canonical.toLowerCase() === String(currentType ?? '').trim().toLowerCase() ? null : canonical;
  } catch {
    return null;
  }
}

/** The audit's independent name grade, or null (absent/unparseable). */
export function auditNameGrade(raw) {
  try {
    const parsed = JSON.parse(raw.replace(/^```(?:json)?\s*|\s*```$/g, ''));
    return /^[A-F][+-]?$/i.test(String(parsed?.name_grade ?? '').trim())
      ? String(parsed.name_grade).trim().toUpperCase()
      : null;
  } catch {
    return null;
  }
}

/**
 * Verify findings against the block and map survivors into the
 * rewriteFlaggedEntries finding shape. Non-verbatim spans, unknown
 * entries, and under-confidence findings are dropped (logged in dev).
 */
export function verifyAuditFindings(monster, raw) {
  let parsed;
  try {
    parsed = JSON.parse(raw.replace(/^```(?:json)?\s*|\s*```$/g, ''));
  } catch {
    return [];
  }
  // Case-insensitive and punctuation-tolerant: a correct live finding was
  // dropped because the judge lowercased the first word of its span.
  const norm = (s) => s.replace(/\s+/g, ' ').replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"').replace(/[\u2013\u2014]/g, '-').trim().toLowerCase();
  const out = [];
  for (const f of parsed?.findings ?? []) {
    const minConfidence = f.principle === 5 ? ['high'] : ['high', 'medium'];
    if (!minConfidence.includes(f.confidence)) {
      logger.log('audit finding below confidence gate:', f.entry, f.issue);
      continue;
    }
    // Locate the entry: the claimed section first, then any section (the
    // judge sometimes mislabels the section but not the entry).
    let section = null;
    let entry = null;
    const sections = monster.sections ?? {};
    // Claimed section first, then everywhere — the judge sometimes
    // mislabels the section but not the entry.
    const ordered = [
      ...(f.section && sections[f.section] ? [[f.section, sections[f.section]]] : []),
      ...Object.entries(sections),
    ];
    for (const [name, entries] of ordered) {
      const hit = (entries ?? []).find((e) => e.name === f.entry);
      if (hit) { section = name; entry = hit; break; }
    }
    if (!entry) {
      // Fuzzy fallback (live drop: the judge called "Psionic Lullaby
      // (1/Day)" "Ethereal Lullaby" and a correct empty-entry finding
      // died). Match by shared significant name tokens — but only when
      // exactly ONE entry matches; ambiguity stays a drop.
      const tokens = (n) => n.toLowerCase().replace(/\(.*?\)/g, '').split(/[^a-z]+/).filter((w) => w.length >= 4);
      const want = new Set(tokens(f.entry));
      const candidates = [];
      for (const [name, list] of Object.entries(sections)) {
        for (const e of list ?? []) {
          if (tokens(e.name).some((w) => want.has(w))) candidates.push([name, e]);
        }
      }
      if (candidates.length === 1) [section, entry] = candidates[0];
    }
    if (!entry) {
      logger.log('audit finding names unknown entry, dropped:', f.entry);
      continue;
    }
    // Span verifies against name + text: an EMPTY entry has only its name
    // to quote (live: the Psionic Lullaby finding had no text to cite).
    if (!norm(`${entry.name}. ${entry.text}`).includes(norm(f.span))) {
      logger.log('audit span not verbatim, dropped:', f.entry, f.span);
      continue;
    }
    out.push({
      rule: 'mechanical-audit',
      severity: 'audit',
      message: `${f.issue}${f.suggestion ? ` — ${f.suggestion}` : ''} (about: "${f.span}")`,
      loc: { section, entry: entry.name },
    });
    if (out.length >= MAX_MERGED_FINDINGS) break;
  }
  return out;
}
