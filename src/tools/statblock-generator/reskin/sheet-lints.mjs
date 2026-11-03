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
import { PRINT_ROW_NAMES } from './generate.mjs';

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
  {
    rule: 'double-space-label',
    reads: 'format of engine-written text',
    why: 'two substitutions met at a label and left a doubled space — "*Failure:*  28 (8d6)" (two sheets on the gate sweep)',
    // RAW text, not TEXT(): the shared reader collapses whitespace, so a doubled space
    // is normalised away before any lint can see it (this one found nothing until it
    // stopped using it).
    run: (rows) => rows.filter(({ r }) => /(?:Failure|Success|Trigger|Response):\*?  /.test(String(r?.text ?? '')))
      .map(({ sec, r }) => `${sec}/${BARE(r.name)}: a doubled space after a label`),
  },
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
  {
    rule: 'orphan-action-row',
    reads: 'declared data (`gate`, `print`, `rules`) plus dice presence',
    why: 'a full action that deals no damage, has no limit, and the Multiattack cannot swap to — nobody will ever spend an action on it',
    run: (rows) => {
      const out = [];
      // PROVENANCE MUST BE KNOWABLE OR THIS LINT STANDS DOWN. A bare-print 2014
      // sheet carries NO engine flags anywhere and an empty 2024 side, so nothing
      // on it can be told from an invention — and print's 2024 corpus cannot vouch
      // for a 2014-era row either (it has no "Change Shape" row at all, 0 of 329,
      // though every 2014 dragon has one). Judging such a sheet produced two false
      // positives on the Ancient Gold Dragon, which the critic grades "ship, print".
      // The flag gap is the R3 finding; refusing to guess is this lint's job.
      if (!rows.some(({ r }) => r.print || r.rules || r.library || r.template)) return out;
      for (const secs of [rows]) {
        const actions = secs.filter(({ sec, ed }) => sec === 'Actions' && ed === (secs.some((x) => x.ed === 'a' && x.sec === 'Actions') ? 'a' : secs.some((x) => x.ed === 'b') ? 'b' : 'c'));
        const ma = actions.find(({ r }) => /^Multiattack/.test(BARE(r.name)));
        const maT = ma ? TEXT(ma.r) : '';
        for (const { sec, r } of actions) {
          const n = BARE(r.name);
          if (!n || /^Multiattack/.test(n)) continue;
          // print's own furniture and derived lines stand alone. The NAME is checked
          // as well as the flag because a bare-print 2014 sheet has an EMPTY 2024
          // side, so its rows carry no provenance at all — which is how print's own
          // Weakening Breath and Change Shape on the Ancient Gold Dragon first read
          // as orphans. (That flag gap is itself an R3 finding: on such a sheet no
          // consumer can tell print's rows from inventions.)
          if (r.print || r.rules || PRINT_ROW_NAMES.has(n.toLowerCase())) continue;
          if (DICE.test(TEXT(r))) continue;        // it deals damage, so it is worth an action
          if (GATED(r)) continue;                  // a limited-use row is worth an action
          if (maT.includes(n)) continue;           // the Multiattack can swap to it
          out.push(`${sec}/${n}: a full action with no damage, no limit, and no Multiattack swap`);
        }
      }
      return out;
    },
  },
];

/** Every finding on one sheet, as `{ rule, reads, message }`. */
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
