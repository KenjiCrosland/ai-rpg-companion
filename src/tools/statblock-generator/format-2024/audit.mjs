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

export function buildAuditPrompt(monster, edition = '2024', { reskin = false } = {}) {
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
   from their entry, stray characters, or UI text. ALSO flag garbled or
   ungrammatical text: doubled words ("the swarm swarm"), broken or
   half-deleted sentences, subject-verb disagreements, a lowercase word
   starting a sentence, or a capitalized word mid-sentence that is not a
   defined game term (conditions, damage types, action names are correctly
   capitalized — never flag those). ${is2014
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

For principle 4 findings ONLY (garbled text, wrong words, grammar,
doubled words, circular phrases), you may ALSO provide a "rewrite": the
minimal replacement for the quoted span that repairs the text. Rules for
rewrites: change as few words as possible; NEVER change any number, DC,
damage type, condition name, or game term; never add or remove mechanics.
A rewrite fixes prose, not rules. Findings from other principles never
carry a rewrite.

An entry's NAME can also be the defect. Flag it under principle 3 and
provide a "rename" when the name and the mechanics disagree:
- the name promises a mechanic the text never delivers ("Choir Silence"
  that deafens nobody, a "Reassemble" with no disassembly)
- the name describes the wrong sense or medium for its effect (a "Glare"
  that deafens, a "Breath" that is a thrown rock)
- the name's ADJECTIVE promises an energy the entry never deals (a
  "Burning Claw" dealing only Slashing burns nothing — it is a "Claw"; a
  "Freezing Coil" with no Cold anywhere is a "Coil"). Print never does
  this: every energy-adjective name in the corpus deals the implied type,
  imposes its condition, or casts a spell that carries it — spell echoes
  are the one exemption
- the name is invented syllables rather than words ("Thul-eg Strike") —
  coined words belong to the creature's own name, never to entries
The rename must be plain English in this creature's register, must
describe what the entry ACTUALLY does, must not duplicate another entry's
name, and must never include a use-limit parenthetical — the engine
appends "(Recharge 5-6)" and "(1/Day)" itself. Never rename Multiattack,
Spellcasting, or Legendary Resistance.

OUTPUT: JSON only, no markdown fences. Report at most 6 findings.
{ "name_grade": "A-F",
  "type_correction": null,
  "findings": [ { "principle": <1-5>, "section": "<section name>",
  "entry": "<entry name>", "span": "<exact quoted text, verbatim>",
  "issue": "<one sentence>", "suggestion": "<one sentence, direction not prose>",
  "rewrite": "<optional, principle 4 only: the repaired span>",
  "rename": "<optional, name-defect findings only: the replacement entry name>",
  "confidence": "high|medium|low" } ] }
An empty findings array is a correct and common output. Do not manufacture
findings to appear thorough. Every span must be verbatim text from the block —
if you cannot quote it, the finding does not exist.${reskin ? `

RESKIN MODE. This block's numbers, DCs, and damage budgets are engine-authored and correct by construction — never flag them. The model-written parts are the entry NAMES, the TRAIT texts, and ONE signature action; your entire value is there:
1. Garbled rules language ("attacks hit the target's AC with advantage" is not adjudicable — supply the rewrite).
2. Semantic contradictions (an Invisible creature targeted by "one creature that can see it"; a sword trait granting immunity to being Blinded).
3. Name-content mismatches (a "Gaze" that throws things; an "of the Fallen" attack dealing plain Piercing — propose a rename).
4. Misspelled entry names ("Withdrawl").
5. Doubled or contradictory limiters ("only once per turn" plus "while active, can't use it again").
6. REDUNDANT RULES — list each benefit the block grants; if a model-written trait duplicates one the chassis already grants (two entries both giving Disadvantage on Opportunity Attacks), or a clause is made dead by another entry (a trait converting damage a row already deals), flag it and supply a rewrite trimming the duplicate clause.
A typical reskin block carries 1-3 such findings; an empty array on a block with model-written traits usually means a MISSED finding, not a clean block — look again before returning empty. The don't-manufacture rule still stands, and every span must be copied character-for-character, capitalization included.` : ''}`;
}

export function validateAuditResponse(raw) {
  // Validate only what verification LOAD-BEARS on: a findings array whose
  // entries can be located (entry) and span-checked (span) and merged
  // (issue). Everything else — principle as a string, Confidence
  // capitalized, confidence missing — is coerced or gated per-finding in
  // verifyAuditFindings. The strict version rejected the WHOLE response
  // for one sloppy field, and the client's retry loop then fed the same
  // well-formed JSON back with "fix the formatting" — a doom loop that
  // burned all three attempts (measured live: 1 in 5 thinking-disabled
  // DeepSeek responses omits one finding's confidence).
  try {
    const parsed = JSON.parse(raw.replace(/^```(?:json)?\s*|\s*```$/g, ''));
    if (!Array.isArray(parsed?.findings)) return false;
    return parsed.findings.every((f) =>
      typeof f?.entry === 'string' && f.entry.trim()
      && typeof f?.span === 'string' && f.span.trim()
      && typeof f?.issue === 'string' && f.issue.trim());
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
  const norm = (s) => s.replace(/\*/g, '').replace(/\s+/g, ' ').replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"').replace(/[\u2013\u2014]/g, '-').trim().toLowerCase();
  const out = [];
  for (const f of parsed?.findings ?? []) {
    // Coercion belt: principle may arrive as a string, confidence in any
    // case or absent. Absent confidence lands at 'low', which the gate
    // drops — one sloppy finding costs itself, never its siblings.
    const principle = Number(f.principle);
    const confidence = String(f.confidence ?? 'low').trim().toLowerCase();
    const minConfidence = principle === 5 ? ['high'] : ['high', 'medium'];
    if (!minConfidence.includes(confidence)) {
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
    // Normalize before matching: curly apostrophes, and the use-limit
    // suffix the engine appends ("Glacier's Possession (Recharge 6)") —
    // the judge cites the bare name (live: two correct Possession findings
    // dropped as "unknown entry").
    // normName (renamed 2026-08-19): this shadowed the span-tolerance
    // norm above, silently stripping the span check of its whitespace/
    // quote/asterisk tolerance — the source of the "span not verbatim"
    // drop ledger (Widow x2, Pilgrim x1)
    const normName = (n) => String(n).replace(/[\u2018\u2019]/g, "'").replace(/\s*\(.*?\)\s*$/, '').trim().toLowerCase();
    for (const [name, entries] of ordered) {
      const hit = (entries ?? []).find((e) => e.name === f.entry || normName(e.name) === normName(f.entry));
      if (hit) { section = name; entry = hit; break; }
    }
    if (!entry) {
      // Fuzzy fallback (live drop: the judge called "Psionic Lullaby
      // (1/Day)" "Ethereal Lullaby" and a correct empty-entry finding
      // died). Match by shared significant name tokens — but only when
      // exactly ONE entry matches; ambiguity stays a drop.
      const tokens = (n) => n.toLowerCase().replace(/\(.*?\)/g, '').split(/[^a-z]+/).filter((w) => w.length >= 4);
      const want = new Set(tokens(f.entry));
      // Score by OVERLAP COUNT and accept a unique maximum: one shared token
      // was too loose — "Glacier's Possession" tied with "Glacier Rebirth"
      // on "glacier" and a correct finding died on the ambiguity.
      const scored = [];
      for (const [name, list] of Object.entries(sections)) {
        for (const e of list ?? []) {
          const overlap = tokens(e.name).filter((w) => want.has(w)).length;
          if (overlap > 0) scored.push([overlap, name, e]);
        }
      }
      scored.sort((a, b) => b[0] - a[0]);
      if (scored.length === 1
          || (scored.length > 1 && scored[0][0] > scored[1][0])) {
        [, section, entry] = scored[0];
      }
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
    // Rewrite actuator (owner call, 2026-08-04: with templates owning the
    // mechanics, the audit's best work is copy-editing fill seams). A
    // rewrite is carried only when it is text-safe: principle 4, span
    // present RAW in the entry (no normalization games on a replacement),
    // and the same multiset of numbers on both sides — prose may change,
    // values may not.
    let rewrite = null;
    if (typeof f.rewrite === 'string' && f.rewrite.trim()
      && Number(f.principle) === 4
      && entry.text.includes(f.span)
      && f.rewrite.length <= f.span.length * 3 + 40) {
      const nums = (str) => [...String(str).matchAll(/\d+/g)].map((m) => m[0]).sort().join(',');
      // a rewrite identical to its span is a no-op the judge sometimes
      // emits on a false finding — logged as a "rewrite" that changed
      // nothing (live: Flowing Ash on the Emberwraith)
      if (nums(f.span) === nums(f.rewrite) && f.rewrite.trim() !== f.span.trim()) rewrite = f.rewrite.trim();
    }
    // Rename actuator (owner call, 2026-08-05): the judgment layer is the
    // only thing that can tell "Choir Silence that deafens nobody" from a
    // fine name, or a coinage from a compound — the deterministic
    // detector was retired for exactly that reason. Carried only when
    // safe: a plain name, no use-limit parenthetical (the engine appends
    // those), no collision with another entry, and never on the three
    // rules-vocabulary names the table reads at a glance.
    const NEVER_RENAME = new Set(['Multiattack', 'Spellcasting', 'Legendary Resistance']);
    let rename = null;
    if (typeof f.rename === 'string' && f.rename.trim()) {
      const proposed = f.rename.trim();
      const bare = entry.name.replace(/\s*\(.*\)$/, '').trim();
      const taken = new Set(Object.values(monster.sections ?? {}).flat()
        .map((e) => String(e?.name ?? '').replace(/\s*\(.*\)$/, '').trim().toLowerCase()));
      if (!NEVER_RENAME.has(bare) && !entry.name_locked
        && proposed.length >= 3 && proposed.length <= 40
        && !/[()]/.test(proposed)
        && proposed.toLowerCase() !== bare.toLowerCase()
        && !taken.has(proposed.toLowerCase())) {
        rename = proposed;
      }
    }
    out.push({
      rule: 'mechanical-audit',
      severity: 'audit',
      message: `${f.issue}${f.suggestion ? ` — ${f.suggestion}` : ''} (about: "${f.span}")`,
      loc: { section, entry: entry.name },
      ...(rewrite ? { span: f.span, rewrite } : {}),
      ...(rename ? { rename } : {}),
    });
    if (out.length >= MAX_MERGED_FINDINGS) break;
  }
  return out;
}
