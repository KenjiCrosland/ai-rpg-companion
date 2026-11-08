import { isPlaceholderRowName } from './templates.mjs';
/**
 * LINTS OVER A FINISHED SHEET — the §8 R1 layer.
 *
 * These read a sheet the engine has already rendered and report what a GM would
 * trip over at the table. They are the critic's §2 list (2026-11-01) plus the two
 * standing text defects, and they exist because "(A) or (B)" came back through
 * 4,300 green tests: nothing asserted on rendered output.
 *
 * TWO RULES, both load-bearing:
 *
 * 1. A LINT NEVER FEEDS A GENERATION DECISION. It reads the output and fails a
 *    run. A gate that steers the pipeline is a mechanism and drifts (this sprint
 *    has four instances); an alarm over finished text does not.
 * 2. EACH LINT DECLARES WHAT IT READS, below. Most read DECLARED FIELDS and no
 *    text at all. The ones that read text read OUR OWN rendered sentence for a
 *    slot the engine failed to fill — the `placeholder-leak` class — never the
 *    GM's prose, and never to decide meaning.
 *
 * A firing is a SYMPTOM; the fix belongs upstream at the writer. "dangling-save"
 * means a save reached the renderer without its DC, which is a slot-fill bug of
 * the same family as the four "declared then not carried" faults found on
 * 2026-11-01 — not something to patch with another `.replace`.
 */
import { weaponFor } from './weapons.mjs';
import { citesGenericAttacks, multiattackCitations, multiattackSpells } from './checker.mjs';

const RULES_NOUN = new Set(['grapple', 'grappled', 'condition', 'effect', 'spell', 'curse', 'petrification', 'disease', 'charm', 'possession', 'restraint']); // the grapple IS the condition, not a thing on the sheet
const BARE = (n) => String(n ?? '').replace(/ \(.*\)$/, '').trim();
const TEXT = (r) => String(r?.text ?? r?.description ?? '').replace(/\s+/g, ' ').trim();
const DICE = /\d+ \(\d+d\d+/;
const GATED = (r) => !!r?.gate || /\((?:Recharge [\d–-]+|\d+\/Day)\)/.test(String(r?.name ?? ''));

/**
 * Every row on a sheet, both editions and both row shapes, with its section —
 * and with its engine FLAGS UNIONED BY NAME across the two editions.
 *
 * A 2014 sheet keeps its rows in flat arrays that carry no flags at all; the
 * flagged twin sits under `other_edition`. Without the union, print's own
 * Spellcasting on a 2014 sheet looks like an unflagged invention, which is
 * exactly how `orphan-action-row` first reported the Ancient Gold Dragon,
 * Ilvareth and Brother Halric alongside the one real case. N3's batch check hit
 * the same thing and the same union fixed it.
 */
export function rowsOfSheet(sheet) {
  const out = [];
  // EACH ROW CARRIES THE LIST IT CAME FROM. A sheet holds its rows twice, and the
  // two copies are not duplicates of each other — they are the same row in two
  // printings. Without this tag, normalising the section names makes every 2014
  // row collide with its own 2024 twin and `duplicate-row-name` reports 124
  // findings on a forty instead of 1.
  for (const [ed, secs] of [['a', sheet?.sections ?? {}], ['b', sheet?.other_edition?.sections ?? {}]]) {
    for (const [sec, rs] of Object.entries(secs)) {
      if (Array.isArray(rs)) for (const r of rs) if (r && typeof r === 'object') out.push({ ed, sec, r });
    }
  }
  // a 2014 sheet keeps its rows in flat arrays, and they carry no engine flags —
  // which is why the flagged twin under `other_edition` is read as well
  // the 2014 flat arrays name the SAME sections with different words, so they are
  // normalised here — otherwise one defect reports twice ("Traits/Drag Under" and
  // "abilities/Drag Under") and `/^Actions$/` misses half the action rows
  const SEC_OF = { abilities: 'Traits', actions: 'Actions', bonus_actions: 'Bonus Actions', reactions: 'Reactions', legendary_actions: 'Legendary Actions' };
  for (const [flat, sec] of Object.entries(SEC_OF)) {
    for (const r of (sheet?.[flat] ?? [])) if (r && typeof r === 'object') out.push({ ed: 'c', sec, r });
  }
  const FLAGS = ['print', 'rules', 'kit', 'feature', 'library', 'template', 'gate', 'engulf_engine'];
  const union = new Map();
  for (const { r } of out) {
    const k = BARE(r.name).toLowerCase(); if (!k) continue;
    const have = union.get(k) ?? {};
    for (const f of FLAGS) if (r[f] && !have[f]) have[f] = r[f];
    union.set(k, have);
  }
  return out.map(({ ed, sec, r }) => ({ ed, sec, r: { ...union.get(BARE(r.name).toLowerCase()), ...r, ...Object.fromEntries(Object.entries(union.get(BARE(r.name).toLowerCase()) ?? {}).filter(([f]) => !r[f])) } }));
}

/** The conditions the sheet DECLARES it imposes, from `imposes` records only. */
const imposedOn = (rows) => new Set(rows.flatMap(({ r }) => [r.imposes].flat().filter(Boolean).map(String)));

export const SHEET_LINTS = [
  {
    rule: 'multiattack-cites-nothing',
    reads: 'format of engine-written text',
    why: 'a Multiattack that names no attack a GM can roll — "The sorrow makes two attacks." Print does this 0 of 178 times, and an unreadable sentence must not read as clean',
    // "makes two melee attacks" names no row BY DESIGN — print's 2014 idiom, and what
    // our own converter writes. It tells a GM exactly what to roll, so it is not this.
    run: (rows) => rows.filter(({ r }) => /^Multiattack/.test(BARE(r.name)) && TEXT(r) && !multiattackCitations(TEXT(r)).length && !citesGenericAttacks(TEXT(r)))
      .map(({ sec, r }) => `${sec}/${BARE(r.name)}: names no attack to roll — "${TEXT(r).slice(0, 60)}"`),
  },
  {
    rule: 'multiattack-dangling-cite',
    reads: 'format of engine-written text',
    why: 'a Multiattack citing a row the sheet lacks — the critic\'s Pit Fiend named a "Fiery Mace" attack it did not have, on the first line a GM reads. `danglingRefIn` exempts the Multiattack by design, so this is its sibling',
    run: (rows) => {
      // CASE-INSENSITIVE: the 2014 render cites "its bite" against a row named "Bite".
      const names = rows.map(({ r }) => BARE(r.name)).filter(Boolean).map((n) => n.toLowerCase());
      const resolves = (x0) => { const x = String(x0).toLowerCase(); return names.includes(x) || names.some((n) => n.startsWith(x) || x.startsWith(n)); };
      return rows.filter(({ r }) => /^Multiattack/.test(BARE(r.name))).flatMap(({ sec, r }) => multiattackCitations(TEXT(r))
        // a set of alternatives is satisfied by ANY of its names: print writes
        // "using Claw or Tail in any combination" and a GM picks one.
        .filter((set) => !set.some(resolves))
        .map((set) => `${sec}/${BARE(r.name)}: cites "${set.join('" or "')}", which is no row on this sheet`));
    },
  },
  {
    rule: 'multiattack-offlist-spell',
    reads: 'format of engine-written text',
    why: 'a Multiattack citing a spell the sheet cannot cast — the critic\'s archlich offered "Spellcasting to cast Ray of Sickness" with that spell on no list of its own',
    run: (rows) => {
      // THE CITING ROW IS NOT A SPELL LIST. "a use of (B) Spellcasting to cast *Ray of
      // Sickness*" contains the word "Spellcasting", so the Multiattack was swept into
      // its own list of lists and every spell it named was trivially "available" — the
      // rule could not fail. It reported nothing on the 11-04 archlich, whose Ray of
      // Sickness is on none of its three lists (critic, 2026-11-04). A list is a row
      // that OFFERS spells: print's Spellcasting row, or a row that casts one by name.
      const lists = spellListTextOf(rows);
      return rows.filter(({ r }) => /^Multiattack/.test(BARE(r.name))).flatMap(({ sec, r }) => multiattackSpells(TEXT(r))
        .filter((sp) => !spellOnLists(sp, lists))
        .map((sp) => `${sec}/${BARE(r.name)}: offers to cast "${sp}", which is on no spell list this sheet has`));
    },
  },
  {
    rule: 'save-without-its-numbers',
    reads: 'format of engine-written text',
    why: 'a row whose effect turns on a save but names neither the ability nor a DC — the critic\'s Collateral Word, which a GM cannot roll. print invokes a save 3 times in prose and names both every time',
    run: (rows) => rows.filter(({ r }) => /\bon a (?:failed|successful) save\b|\bfails? the save\b|\bsucceeds? on the save\b/i.test(TEXT(r))
      && !/\b(?:Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma) Saving Throw/i.test(TEXT(r)) && !/\bDC \d+/.test(TEXT(r)))
      .map(({ sec, r }) => `${sec}/${BARE(r.name)}: turns on a save but names neither the ability nor a DC`),
  },
  {
    rule: 'effect-cites-nothing',
    reads: 'format of engine-written text',
    why: 'an effect that ends when an OBJECT is destroyed, where the row never says the object exists — the critic\'s Weeping Snare, "until the mortar is destroyed" on a sheet with no mortar. print does this 0 of 5 times: its row name carries the object (Web Strand, Entangling Rope)',
    run: (rows) => rows.flatMap(({ sec, r }) => {
      const t = TEXT(r);
      const out = [];
      for (const m of t.matchAll(/until the ([a-z][a-z' -]{2,24}?) (?:is destroyed|is removed|breaks)/g)) {
        const head = m[1].trim().split(/\s+/).pop();
        // "until the grapple ends" is RULES VOCABULARY, not an object: the grapple IS the
        // Grappled condition the row imposes. print writes it 10 times, so a check that
        // treats it as an undeclared object fails print before it reaches us.
        if (RULES_NOUN.has(head.toLowerCase())) continue;
        const before = t.slice(0, m.index);
        const seen = new RegExp(`\\b${head.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
        if (seen.test(before) || seen.test(BARE(r.name))) continue;
        out.push(`${sec}/${BARE(r.name)}: ends when "the ${m[1].trim()}" is destroyed, and the row never says there is one`);
      }
      return out;
    }),
  },
  {
    rule: 'empty-option',
    reads: 'format of engine-written text',
    why: 'an unfilled option in a Multiattack sentence — the critic\'s Ossuar, "(A) or (B) Spellcasting"',
    run: (rows) => rows.filter(({ r }) => /\(A\) or \(B\)/.test(TEXT(r)))
      .map(({ sec, r }) => `${sec}/${BARE(r.name)}: an unfilled option — "(A) or (B)"`),
  },
  {
    rule: 'missing-number',
    reads: 'format of engine-written text',
    why: 'a number slot the engine never filled — "pulls a creature it is grappling feet toward", "gaining temporary hit points"',
    run: (rows) => rows.filter(({ r }) => /(?:up to|grappling|gaining)\s+(?:feet|temporary hit points)\b/.test(TEXT(r)))
      .map(({ sec, r }) => `${sec}/${BARE(r.name)}: a quantity is missing — ${(/(?:up to|grappling|gaining)\s+(?:feet|temporary hit points)/.exec(TEXT(r)) ?? [''])[0]}`),
  },
  {
    rule: 'dangling-save',
    reads: 'format of engine-written text',
    why: 'a save sentence with no DC and no outcome — the GM has nothing to adjudicate',
    run: (rows) => rows.filter(({ r }) => {
      const t = TEXT(r);
      return /succeed on a \w+ saving throw\./i.test(t) && !/DC \d+/.test(t);
    }).map(({ sec, r }) => `${sec}/${BARE(r.name)}: a saving throw with no DC and no stated outcome`),
  },
  {
    rule: 'double-punctuation',
    reads: 'format of engine-written text',
    why: 'two substitutions collided — "At will::", "charmed ((with mind blank))"',
    run: (rows, sheet) => {
      const bad = (s) => /::|\(\([^)]*\)\)/.test(String(s ?? ''));
      const out = rows.filter(({ r }) => bad(TEXT(r))).map(({ sec, r }) => `${sec}/${BARE(r.name)}: doubled punctuation in the row text`);
      for (const k of ['immunities', 'resistances', 'vulnerabilities', 'condition_immunities', 'damage_immunities', 'damage_resistances', 'senses', 'languages', 'speed']) {
        if (bad(sheet?.[k])) out.push(`header/${k}: doubled punctuation — "${String(sheet[k]).slice(0, 48)}"`);
      }
      return out;
    },
  },
  {
    // R10 · H4. Four classes the critic hand-listed that this suite did not catch, each
    // reproduced on the gate-run sheet that shipped it before its writer was fixed.
    // All four are FORMAT OF ENGINE-WRITTEN TEXT — no reading of the GM's or the
    // model's prose.
    rule: 'd4-stack',
    reads: "print's own maximum for a die, against engine-written damage",
    why: 'print uses d4 on 99 attack rows and never more than 3d4 (Bugbear Light Hammer, Hobgoblin Longbow, Vampire Familiar Umbral Dagger); the gate runs shipped 7d4 on a cane and 4d4 twice — nobody who plays rolls seven d4 for a club',
    run: (rows) => rows.filter(({ r }) => /Attack Roll|Weapon Attack/.test(TEXT(r)) && [...TEXT(r).matchAll(/\((\d+)d4\b/g)].some((m) => Number(m[1]) > 3))
      .map(({ sec, r }) => `${sec}/${BARE(r.name)}: ${(TEXT(r).match(/\d+ \(\d+d4[^)]*\)/) ?? [''])[0]} — print's largest d4 attack row is 3d4`),
  },
  {
    rule: 'at-will-inline',
    reads: 'format of engine-written text',
    why: 'a 2014 Spellcasting block carried the 2024 bullet inline — "- **At Will:**" inside a one-paragraph 2014 row (four sheets on the gate sweep)',
    // `ed` is 'a'/'b' (active/other printing), not an edition name — the 2014 idiom is
    // read off the row itself: a 2014 Spellcasting row says "to hit with spell attacks"
    // and never carries a 2024 bullet.
    run: (rows) => rows.filter(({ r }) => /-\s*\*\*At Will:\*\*|-\s*At will:/.test(TEXT(r)) && /Weapon Attack:|to hit with spell attacks/.test(TEXT(r)))
      .map(({ sec, r }) => `${sec}/${BARE(r.name)}: a 2024 spell bullet survived into a 2014 block`),
  },
  // PULLED, HAVING BEEN BUILT: 'double-space-label' (R10 · H4, built 2026-11-02, pulled
  // 2026-11-03). It was the most frequent finding in the whole suite by five times —
  // **148 hits, 26.7 per 100 sheets across 555 sheets and 14 rolls** — and not one of
  // them is visible to anyone. The doubled space collapses in every path a GM reads:
  // the 2024 card renders through `v-html` with no pre-wrap, the 2014 card's ability
  // span is `white-space: pre-line` (which collapses space runs and keeps only
  // newlines), and the markdown, Foundry and Improved Initiative exports all render as
  // HTML or markdown, which collapse too.
  //
  // The tell was in the rule's own note: it had to read RAW `r.text` because the shared
  // `TEXT()` reader normalises whitespace — the same normalisation every renderer does.
  // A defect that only exists before normalisation is a storage artifact, and a lint
  // whose top class is invisible makes every run read dirtier than it is: it alone took
  // the 11-03 gate forty from 4 findings to 17. Fixing the CAUSE would mean another
  // row-text substitution for a change no one can see, which is the opposite of the
  // standing rule on string surgery. Measured and removed rather than tuned.
  // REFUSED, NOT BUILT: 'leading-flavor-sentence' (R10 · H4, 2026-11-02). The critic
  // named one row — the Well Drowned Thing's Drowning Crush, a flavour sentence before a
  // save skeleton. A predicate for "prose, then a starred label" fires **6 times on the
  // gate sweep and 5 are print's own grammar**: Fear Aura reads "The pit fiend emanates
  // an aura in a 20-foot Emanation…" on three sheets, and Pouncing Slam's and
  // Splintering Throw's leading sentences ARE their mechanics. Telling a flavour opener
  // from a mechanical one is a reading of meaning, so it is a call field or nothing
  // (CLAUDE.md) — not a tuned regex. One row is not worth a lint that is wrong 5 times.
  {
    rule: 'placeholder-row-name',
    reads: 'declared data (the name field) against the catalog\'s own placeholder list',
    why: "a row shipped a template's placeholder name instead of a name — the Rivenhearted Glacier's trait read \"Composed Row\" (critic's S0, forty #1)",
    run: (rows) => rows
      .filter(({ r }) => isPlaceholderRowName(r.name))
      .map(({ ed, sec, r }) => `${sec}/${r.name}: a template's placeholder name shipped as a row name (ed ${ed})`),
  },
  {
    rule: 'duplicate-row-name',
    reads: 'declared data (the name field) — no text',
    why: 'two rows in one section share a name; the engine already DETECTS this and does not act',
    run: (rows) => {
      const seen = new Map();
      for (const { ed, sec, r } of rows) {
        const k = `${ed}|${sec}/${BARE(r.name).toLowerCase()}`;
        seen.set(k, (seen.get(k) ?? 0) + 1);
      }
      return [...new Set([...seen.entries()].filter(([, n]) => n > 1).map(([k]) => k.split('|')[1]))]
        .map((k) => `${k}: two rows share this name`);
    },
  },
  {
    rule: 'engulf-needs-a-grapple',
    reads: 'declared data (`engulf_engine`, `imposes`) — no text',
    why: 'print\'s engulf grammar always takes a creature the monster is already holding; a sheet that engulfs but grapples nothing has an unreachable row',
    run: (rows) => {
      const engulf = rows.filter(({ r }) => r.engulf_engine);
      if (!engulf.length || imposedOn(rows).has('Grappled')) return [];
      return engulf.map(({ sec, r }) => `${sec}/${BARE(r.name)}: engulfs a grappled creature, but no row on the sheet imposes Grappled`);
    },
  },
  {
    rule: 'inline-weapon-collision',
    reads: 'the call\'s `inline` answer against the closed weapon table',
    why: 'the creature\'s short form is a weapon noun, so its own rows read "a handaxe returns to the handaxe\'s grasp"',
    run: (_rows, sheet) => {
      const inline = String(sheet?.inline ?? '').replace(/^the\s+/i, '').trim();
      const w = inline ? weaponFor(inline) : null;
      return w ? [`header/inline: "${sheet.inline}" is the weapon "${w}" — its own rows will read as the weapon's`] : [];
    },
  },
  // PULLED (one of the R1 suite's original ten, pulled 2026-11-03). PRINT SHIPS 38. An Action with no
  // damage, no use limit and no Multiattack swap is print's ordinary control action:
  // Harpy/Luring Song (CR 1), Ghost/Etherealness (CR 4), Doppelganger/Read Thoughts,
  // Imp/Invisibility, Nalfeshnee/Teleport, Oni/Shape-Shift. The premise — "nobody will
  // ever spend an action on it" — is false, and print says so 38 times.
  //
  // The rule only looked right because it excused print's rows BY NAME
  // (`PRINT_ROW_NAMES`), so an invented row of the identical shape read as a defect
  // while print's read as fine. That is a novelty test, not a defect test. On the 11-03
  // gate forty it flagged the Vess Drowned Choir's "One Voice" — a lure in exactly the
  // Luring Song shape, and the row the critic named that sheet's KEEPER.
  //
  // Its one true positive was Grunn's orphan Cage, and that row's defect was a DANGLING
  // REFERENT (it required a grapple nothing applied), already fixed by the `requires`
  // guard. The shape was never the problem. Generalising a shape from one named instance
  // without measuring print first is the same error that produced
  // 'leading-flavor-sentence' (5 of 6 hits were print's own grammar) and
  // 'double-space-label' (invisible after normalisation) — three in one feature.

];

/** Every finding on one sheet, as `{ rule, reads, message }`. */
// THE SPELL-LIST READER, SHARED WITH THE REPAIR (2026-11-08). This lint found the defect
// and could only report it; `repairReplaceClause` now drops the dead option, and the two
// must agree about what "on a list" means or the sheet will be failed for a clause the
// repair thought was fine. One definition, two readers — the lesson of the free-row floor
// (a private copy hides the fix).
//
// A list is a row that OFFERS spells: print's Spellcasting row, or a row that casts one by
// name. The CITING Multiattack is excluded — "a use of (B) Spellcasting to cast *Ray of
// Sickness*" contains the word "Spellcasting", so sweeping it in made every spell it named
// trivially available and the rule could not fail (critic, 2026-11-04).
export const spellListTextOf = (rows) => rows.filter(({ r }) => !/^Multiattack/.test(BARE(r.name))
  && (/^Spellcasting/.test(BARE(r.name)) || /casts one of the following|At will:|\d\/[Dd]ay|\bcasts\b/.test(TEXT(r))))
  .map(({ r }) => TEXT(r)).join(' ');
export const spellOnLists = (spell, lists) => new RegExp(String(spell).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i').test(lists);
/** Can this sheet cast the named spell? The repair's predicate, built on the lint's reader. */
export const sheetCanCast = (sheet, spell) => spellOnLists(spell, spellListTextOf(rowsOfSheet(sheet)));

export function lintSheet(sheet) {
  const rows = rowsOfSheet(sheet);
  const all = SHEET_LINTS.flatMap((l) => (l.run(rows, sheet) ?? []).map((message) => ({ rule: l.rule, reads: l.reads, message })));
  // ONE FINDING PER DEFECT. A sheet carries its rows twice — the 2024 `sections`
  // and the 2014 flat arrays — so the same row reports from both ("Actions/X" and
  // "actions/X"). The section case is the only difference, so it is folded away.
  const seen = new Set();
  return all.filter((h) => {
    const k = `${h.rule}|${h.message.toLowerCase()}`;
    if (seen.has(k)) return false;
    seen.add(k); return true;
  });
}
