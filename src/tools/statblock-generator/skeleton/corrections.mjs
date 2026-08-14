/**
 * THE CORRECTIONS REGISTRY (owner-approved refactor, 2026-08-14 — audit
 * finding #1).
 *
 * These are the sections-level repairs that ran as anonymous blocks inside
 * applyFlavor. Extracted verbatim, in the same order, as NAMED passes: the
 * order is explicit, each firing is traced, and a new correction is an
 * entry here — never a block wedged into a 1,290-line closure (the shape
 * that hid the Pounce resurrection for three days and swallowed a fix that
 * landed in the wrong function).
 *
 * Contract: each pass mutates `sections` and/or `j` in place, exactly as
 * the original blocks did. The runner detects firing generically, so the
 * pass bodies carry zero bookkeeping. Behavior is byte-identical to the
 * pre-refactor sweep — enforced by the golden-block snapshots.
 */
import { logger } from '@/util/logger.mjs';

export const CORRECTIONS = [
  {
    name: 'speed-differential',
    apply({ skeleton, j, sections, byId }) {
      // 0a0. The archetype's speed differential, stamped over whatever the
      //      model wrote: a skirmisher moves, a brute lumbers, and until now
      //      no archetype touched Speed at all (owner catch 2026-08-05).
      //      Every mode on the line shifts together, floored at 10 feet.
      if (skeleton.speed_mod && typeof j.speed === 'string') {
        j.speed = j.speed.replace(/(\d+)(\s*ft\.)/g,
          (m0, n, tail) => `${Math.max(10, Number(n) + skeleton.speed_mod)}${tail}`);
      }
    },
  },
  {
    name: 'movement-mode-refs',
    apply({ skeleton, j, sections, byId }) {
      // 0a. Movement-mode references must exist on the speed line. Flyby on a
      //     walk/climb creature "never triggers" (live: Algae-Slick Spring,
      //     'flies out of reach' with no Fly Speed) — the reference downgrades
      //     to the movement the creature actually has.
      {
        const speedLine = String(j.speed ?? '');
        const modes = [['Fly', /flies (out of|up to)/g, 'fly'], ['Swim', null, null], ['Burrow', null, null], ['Climb', null, null]];
        for (const [mode] of modes) {
          if (new RegExp(mode, 'i').test(speedLine)) continue;
          for (const list of Object.values(sections)) {
            for (const e of list) {
              e.text = e.text
                .split(`its ${mode} Speed`).join('its Speed')
                .replace(mode === 'Fly' ? /\bflies out of\b/g : /$^/, 'moves out of')
                .replace(mode === 'Fly' ? /\bfly up to\b/g : /$^/, 'move up to')
                // the third phrasing, and the one the Roc's Swoop uses: the
                // NOUN was downgraded ("its Fly Speed" -> "its Speed") while
                // the verb survived, leaving "flies up to half its Speed" on a
                // block with no flight (live: Cinder Clutch, the Balefire)
                .replace(mode === 'Fly' ? /\bflies up to\b/g : /$^/, 'moves up to');
            }
          }
        }
      }
    },
  },
  {
    name: 'sight-range-fit',
    apply({ skeleton, j, sections, byId }) {
      // 0a2. Sight ranges must fit the senses line: "one creature it can see
      //      within 120 feet" on "blindsight 60 ft. (blind beyond this radius)"
      //      leaves the outer 60 feet as dead text (live: the Dreamweb, all
      //      three legendary actions doubled its perceptual universe).
      {
        const senses = String(j.senses_special ?? '');
        if (/blind beyond/i.test(senses)) {
          const radii = [...senses.matchAll(/(\d+)\s*ft/g)].map((m) => Number(m[1]));
          const radius = radii.length ? Math.max(...radii) : null;
          if (radius) {
            for (const list of Object.values(sections)) {
              for (const e of list) {
                e.text = e.text.replace(/can see within (\d+) feet/g,
                  (m0, n) => (Number(n) > radius ? `can see within ${radius} feet` : m0));
              }
            }
          }
        }
      }
    },
  },
  {
    name: 'tremorsense-pairing',
    apply({ skeleton, j, sections, byId }) {
      // 0a3. Tremorsense is never a creature's ONLY special sense in print: all
      //      6 printed blocks that have it pair it with a sight sense (Ankheg,
      //      Bulette, Earth Elemental, Remorhaz, Xorn take darkvision 60; the
      //      Purple Worm takes blindsight 30). By RAW a tremorsense-only block
      //      still sees normally, so this is a print-SHAPE floor, not a
      //      correctness fix — but a block that reaches for a ground sense and
      //      lists nothing else reads as blind, and its "one creature it can
      //      see within 120 feet" rows read as broken even though they aren't
      //      (live: the Starless Yaw).
      {
        const senses = String(j.senses_special ?? '');
        if (/tremorsense/i.test(senses) && !/darkvision|blindsight|truesight/i.test(senses)) {
          j.senses_special = `darkvision 60 ft., ${senses.trim()}`;
        }
      }
    },
  },
  {
    name: 'dead-object-clause',
    apply({ skeleton, j, sections, byId }) {
      // 0a4. OBJECTS ARE IMMUNE TO POISON AND PSYCHIC, so an object clause on
      //      either is dead text at the table. Measured: 6 printed entries
      //      carry "each object that isn't being worn or carried", and every
      //      one deals Fire (Barbed Devil, Horned Devil, Magmin) or Thunder
      //      (Tarrasque) — or corrodes metal with no damage type at all (Rust
      //      Monster). Zero use a type objects shrug off.
      //
      //      This ships whenever the ENERGY SUBSTITUTION rewrites a row whose
      //      printed damage type was object-affecting: the Tarrasque's
      //      Thunderous Bellow prints as Thunder, arrives in a Psychic block
      //      as Psychic, and drags the clause along dead (live: the krak's
      //      Crockery Cascade, then the Uulgroth's Lulling Chime — the second
      //      shipment of the same defect, because nothing was ever guarding
      //      this).
      {
        const OBJECT_CLAUSE = /\s*and each object that isn't being worn or carried/gi;
        for (const list of Object.values(sections)) {
          for (const e of list) {
            if (!OBJECT_CLAUSE.test(e.text)) continue;
            OBJECT_CLAUSE.lastIndex = 0;
            const types = [...new Set([...e.text.matchAll(
              /\b(Acid|Cold|Fire|Force|Lightning|Necrotic|Poison|Psychic|Radiant|Thunder)\b/g,
            )].map((mm) => mm[1]))];
            // Only strip when EVERY energy in the row is one objects ignore —
            // a row that also deals Fire still legitimately breaks things.
            if (types.length && types.every((t) => t === 'Poison' || t === 'Psychic')) {
              e.text = e.text.replace(OBJECT_CLAUSE, '');
            }
          }
        }
      }
    },
  },
  {
    name: 'swallow-capacity',
    apply({ skeleton, j, sections, byId }) {
      // 0a5. SWALLOW CAPACITY IS A FUNCTION OF SIZE, and the number was
      //      hard-coded in the donor's prose while the size gate beside it was
      //      slotted. Print, in full:
      //        Behir       CR 11  Huge        one
      //        Remorhaz    CR 11  Huge        two
      //        Purple Worm CR 15  Gargantuan  three
      //        Kraken      CR 23  Gargantuan  four
      //        Tarrasque   CR 30  Gargantuan  six
      //      There is no printed LARGE swallower at all, and the smallest
      //      swallower print has takes one — so a Large creature carrying the
      //      Tarrasque's six is off the curve entirely, and at six the
      //      regurgitation threshold is trivially met by the creatures inside
      //      (live: the Vanteg, Large, capacity six).
      {
        const CAP = { Gargantuan: null, Huge: 'up to two creatures' };
        const want = Object.prototype.hasOwnProperty.call(CAP, skeleton.size)
          ? CAP[skeleton.size] : 'only one creature';
        if (want) {
          for (const list of Object.values(sections)) {
            for (const e of list) {
              e.text = e.text.replace(
                /can have (?:only one creature|up to \w+ creatures) swallowed at a time/g,
                `can have ${want} swallowed at a time`,
              );
            }
          }
        }
      }
    },
  },
  {
    name: 'dead-dont-breathe',
    apply({ skeleton, j, sections, byId }) {
      // 0b. The dead don't breathe: no printed Undead or Construct carries
      //     "can breathe air and water" (0 in the corpus).
      if (['Undead', 'Construct'].includes(j.type)) {
        for (const list of Object.values(sections)) {
          for (const e of list) {
            e.text = e.text.replace(/can breathe air and water/g, "doesn't require air and can move and fight underwater");
          }
        }
      }
    },
  },
  {
    name: 'name-domain-vet',
    apply({ skeleton, j, sections, byId }) {
      // 0c. Name vocabulary vetting: a name token carrying another domain's
      //     identity reverts the entry to its placeholder ("Abyssal Radiance"
      //     on a Celestial, "Oathwraith" on the living). The lexicon is small
      //     and high-confidence; generation of GOOD names stays the model's.
      {
        const NAME_LEXICON = {
          wraith: 'grave', lich: 'grave', ghoul: 'grave', grave: 'grave', carrion: 'grave', deathly: 'grave',
          abyssal: 'fiendish', infernal: 'fiendish', hellish: 'fiendish', demonic: 'fiendish', diabolic: 'fiendish',
          seraphic: 'celestial', hallowed: 'celestial', divine: 'celestial', angelic: 'celestial',
        };
        const TYPE_FACET = { Undead: 'grave', Fiend: 'fiendish', Celestial: 'celestial' };
        const own = new Set([TYPE_FACET[j.type], ...(skeleton.themes ?? [])].filter(Boolean));
        for (const list of Object.values(sections)) {
          for (const e of list) {
            const bad = Object.entries(NAME_LEXICON).find(([tok, facet]) => !own.has(facet)
              && new RegExp(`\\b${tok}`, 'i').test(e.name));
            if (bad) {
              const origin = [...skeleton.entries, ...skeleton.traits].find((k) => byId.get(k.id)?.name?.trim() === e.name.replace(/\s*\(.*\)$/, ''));
              if (origin) e.name = origin.name + (e.name.match(/\s*\(.*\)$/)?.[0] ?? '');
            }
          }
        }
      }
    },
  },
];

export function runCorrections(ctx) {
  const fired = [];
  for (const pass of CORRECTIONS) {
    const before = JSON.stringify({ s: ctx.sections, sp: ctx.j.speed, sn: ctx.j.senses_special });
    pass.apply(ctx);
    const after = JSON.stringify({ s: ctx.sections, sp: ctx.j.speed, sn: ctx.j.senses_special });
    if (before !== after) fired.push(pass.name);
  }
  if (fired.length) logger.log('[skeleton] corrections fired:', fired.join(', '));
  return fired;
}
