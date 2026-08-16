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
import textureBanks from '@/data/texture-banks.json';
import { crNumber } from './build-skeleton.mjs';

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
  {
    name: 'name-collisions',
    apply({ skeleton, j, sections, byId, energy, physical, inline, renderedOf, fallbackEntryName, NON_ACTION_SPELLS, SCALING_SPELLS, KNOWN_SPELLS, atWillBanned }) {
      // 1. Name collisions: the model may hand two entries the same name (live:
      //    "Ruin-Fed Bite" beside a second attack still called "Bite" — and worse,
      //    two entries literally sharing one name). Later entries revert to their
      //    placeholder, which pick-time guards already made unique.
      {
        // The colliding entry's OWN placeholder first — unique by pick-time
        // guards and semantically native to its row. Grabbing the first unused
        // placeholder from ANYWHERE handed a move-and-claw legendary the spell
        // echo's "Mind Invasion" (live: the Keening Scuttler — the model named
        // two entries "Skittering Pounce" and the fallback crossed the wires).
        const taken = new Set();
        for (const [sec, list] of Object.entries(sections)) {
          list.forEach((e, i) => {
            if (taken.has(e.name)) {
              // The old resolution reinstated the entry's PLACEHOLDER — the
              // donor creature's printed name — which is exactly what the
              // register fallback exists to prevent: two hash-colliding
              // fallbacks shipped "Pounce" back onto ~20% of silent-flavor
              // blocks (live hunt, 12 of 60 seeds). Collisions now re-salt the
              // register name instead; the donor never returns.
              const origin = (sec === 'Traits' ? null
                : [...renderedOf].find(([, r]) => r === e)?.[0])
                ?? { id: `${sec}#${i}`, slot_type: 'utility' };
              let fresh = null;
              for (let salt = 1; salt <= 8 && !fresh; salt += 1) {
                const cand = fallbackEntryName(origin, skeleton, salt);
                if (cand && !taken.has(cand)) fresh = cand;
              }
              e.name = fresh ?? `${e.name} II`;
            }
            taken.add(e.name);
          });
        }
      }
    },
  },
  {
    name: 'spell-reference-guarantee',
    apply({ skeleton, j, sections, byId, energy, physical, inline, renderedOf, fallbackEntryName, NON_ACTION_SPELLS, SCALING_SPELLS, KNOWN_SPELLS, atWillBanned }) {
      // 2. Spell references: an entry saying "casts *Invisibility*" needs that
      //    spell to exist on the block's spell list, or a reader goes hunting for
      //    it (live: Cloaked Lunge cast a spell the list didn't carry). Append
      //    missing ones to the at-will line.
      {
        const all = Object.values(sections).flat();
        const casterEntry = all.find((e) => /At Will:|spellcasting ability/.test(e.text));
        if (casterEntry) {
          const referenced = new Set();
          for (const e of all) {
            if (e === casterEntry) continue;
            // Only list-routed casts need the list: "uses Spellcasting to cast
            // *X*". An entry casting its own spell inline (a reaction Shield)
            // is self-contained and must NOT be appended to the action list.
            for (const m of e.text.matchAll(/uses (?:its )?[\w ]*Spellcasting to cast \*([A-Z][\w' ]+?)\*( \(level \d+ version\))?/g)) {
              referenced.add(`*${m[1]}*${m[2] ?? ''}`);
            }
          }
          for (const spell of referenced) {
            const bare = spell.replace(/\*/g, '').replace(/\s*\(level.*$/, '');
            if (!casterEntry.text.includes(`*${bare}*`)) {
              // The list copy carries the SAME annotation as the cast site
              // (owner improvement on print — see the upcast stamp).
              casterEntry.text = casterEntry.text.replace(/(\*\*At Will:\*\*)([^\n]*)/,
                (m0, head, rest) => `${head}${rest.trim() ? `${rest},` : ' '} ${spell}`);
            }
          }
        }
      }
    },
  },
  {
    name: 'spell-text-hygiene',
    apply({ skeleton, j, sections, byId, energy, physical, inline, renderedOf, fallbackEntryName, NON_ACTION_SPELLS, SCALING_SPELLS, KNOWN_SPELLS, atWillBanned }) {
      // 3. The 1/Day line: drop it when unfilled, and drop any spell already on
      //    the at-will list — "1/Day" duplicating an at-will spell is the live
      //    generator mistake both reviewers flagged.
      for (const list of Object.values(sections)) {
        for (const e of list) {
          const atWill = (e.text.match(/\*\*At Will:\*\*([^\n]*)/) ?? [])[1] ?? '';
          e.text = e.text.replace(/\n?- \*\*1\/Day(?: Each)?:\*\*([^\n]*)/g, (m0, listPart) => {
            const spells = listPart.split(',').map((x) => x.trim()).filter(Boolean)
              .filter((x) => !atWill.includes(x));
            return spells.length ? `\n- **1/Day Each:** ${spells.join(', ')}` : '';
          });
          // Reaction/Bonus Action spells do nothing in an action-cast list —
          // strip them unless some other entry explicitly casts them (a
          // legendary "casts *Misty Step*" keeps it listed and functional).
          const referenced = Object.values(sections).flat()
            .filter((x) => x !== e)
            .flatMap((x) => [...x.text.matchAll(/uses (?:its )?[\w ]*Spellcasting to cast \*([A-Z][\w' ]+?)\*/g)]
              .map((mm) => mm[1]));
          for (const sp of NON_ACTION_SPELLS) {
            if (referenced.includes(sp)) continue;
            e.text = e.text.replace(new RegExp(`\\*${sp}\\*,\\s*`, 'g'), '')
              .replace(new RegExp(`,\\s*\\*${sp}\\*`, 'g'), '')
              .replace(new RegExp(`\\*${sp}\\*`, 'g'), '');
          }
          // Off-list spells never ship (see KNOWN_SPELLS above): keep only
          // vetted names in the tier lines, preserving their upcast notation.
          e.text = e.text.replace(/(- \*\*(?:At Will|\d+\/Day(?: Each)?):\*\*)([^\n]*)/g, (m0, head, rest) => {
            const kept = [...rest.matchAll(/\*([A-Z][\w' -]+?)\*( \(level \d+ version\))?/g)]
              // a spell another entry casts THROUGH this list stays listed even
              // if the tables can't tier it — stripping it re-strands the echo
              .filter((mm) => KNOWN_SPELLS.has(mm[1]) || referenced.includes(mm[1]))
              .map((mm) => `*${mm[1]}*${mm[2] ?? ''}`);
            return kept.length ? `${head} ${kept.join(', ')}` : head;
          });
          e.text = e.text.replace(/(\*\*(?:At Will|\d+\/Day(?: Each)?):\*\*)\s*(?=\n|$)/g, '');
          // An emptied list line leaves its bare bullet behind — remove the
          // whole line, never ship an orphan dash (live: the Grave Vow's "-").
          e.text = e.text.replace(/^\s*-\s*$/gm, '');
          // A list-style caster whose every pick was dropped still casts
          // SOMETHING: Detect Magic is on printed at-will lists at every band.
          if (/casts one of the following/.test(e.text) && !/\*\*(?:At Will|\d+\/Day)/.test(e.text)) {
            e.text += '\n\n- **At Will:** *Detect Magic*';
          }
          // Article agreement for vowel-initial kindred types ("isn't a Undead"
          // shipped live). A finite list, not a vowel rule — "a Unicorn" is
          // correct English and would break under the naive heuristic.
          e.text = e.text.replace(/\ba (Undead|Elemental|Aberration|Ooze)\b/g, 'an $1');
          // Same-type damage pools merge (the belt under the dual-energy
          // contract): "16 (3d10) Fire plus 11 (2d10) Fire" is one printed pool
          // — 27 (5d10) Fire (live: the Brimstone Warden's death blast).
          // The flat bonus is load-bearing: an ATTACK's main pool is written
          // "17 (2d8 + 8)", which the dice-only pattern could not match, so a
          // same-type pair on an attack row would have survived the merge that
          // catches it everywhere else.
          e.text = e.text.replace(
            /\d+ \((\d+)d(\d+)(?: \+ (\d+))?\) (\w+) damage plus \d+ \((\d+)d(\d+)(?: \+ (\d+))?\) \4 damage/g,
            (m0, n1, d1, b1, type, n2, d2, b2) => {
              if (d1 !== d2) return m0;
              const n = Number(n1) + Number(n2);
              const bonus = Number(b1 ?? 0) + Number(b2 ?? 0);
              const avg = Math.floor((n * (Number(d1) + 1)) / 2) + bonus;
              return `${avg} (${n}d${d1}${bonus ? ` + ${bonus}` : ''}) ${type} damage`;
            },
          );
          // Article agreement after number substitution: the printed brass line
          // carries "in an 20-foot line" (a WotC typo), which scaling turned
          // into "an 90-foot-long" (live). "an" only before 8, 11, 18-series.
          e.text = e.text.replace(/\ban (\d+)/g, (m0, n) => (/^(8|11|18)/.test(n) ? m0 : `a ${n}`));
          // "Being underwater doesn't grant Resistance" is a FIRE rule; on any
          // other damage type the clause guards against nothing (live: a Radiant
          // breath carrying the Dragon Turtle's fire rider).
          e.text = e.text.replace(/\s*\*?Failure or Success:?\*?:?\s*Being underwater doesn't grant Resistance to this (?!Fire)\w+ damage\./g, '')
            .replace(/\s*Being underwater doesn't grant Resistance to this (?!Fire)\w+ damage\./g, '');
          // "(level N version)" only means something on spells that scale.
          e.text = e.text.replace(/\*([A-Z][\w' ]+?)\* \(level \d+ version\)/g,
            (m0, sp) => (SCALING_SPELLS.includes(sp) ? m0 : `*${sp}*`));
          // Hard-control spells demote from At Will to the 1/Day list.
          {
            const atWillLine = e.text.match(/- \*\*At Will:\*\*([^\n]*)/);
            if (atWillLine) {
              const listed = [...atWillLine[1].matchAll(/\*([A-Z][\w' ]+?)\*/g)].map((m) => m[1]);
              const demoted = listed.filter((sp) => atWillBanned(sp));
              for (const sp of demoted) {
                // The annotation moves WITH the spell: stripping bare *Name*
                // orphaned its "(level N version)" onto the previous spell —
                // "Scorching Ray (level 4 version) (level 6 version)" — while
                // the demoted spell re-listed bare (live: the Tar-Shroud
                // Watcher's spliced At-Will line).
                const ann = (e.text.match(new RegExp(`\\*${sp}\\*( \\(level \\d+ version\\))`)) ?? [])[1] ?? '';
                e.text = e.text
                  .replace(new RegExp(`\\*${sp}\\*( \\(level \\d+ version\\))?,\\s*`, 'g'), '')
                  .replace(new RegExp(`,\\s*\\*${sp}\\*( \\(level \\d+ version\\))?`, 'g'), '')
                  .replace(new RegExp(`\\*${sp}\\*( \\(level \\d+ version\\))?`, 'g'), '');
                if (/1\/Day(?: Each)?:\*\*/.test(e.text)) {
                  if (!e.text.includes(`*${sp}*`)) {
                    e.text = e.text.replace(/(- \*\*1\/Day(?: Each)?:\*\*)([^\n]*)/,
                      (m0, head, rest) => `${head}${rest.trim() ? `${rest},` : ''} *${sp}*${ann}`);
                  }
                } else {
                  e.text += `\n- **1/Day:** *${sp}*${ann}`;
                }
              }
            }
          }
          // "1/Day Each" with a single spell is print for two or more only.
          e.text = e.text.replace(/1\/Day Each:(\*\*[^\n,]*)$/gm, '1/Day:$1')
            .replace(/- \*\*1\/Day Each:\*\* ([^,\n]+)$/gm, '- **1/Day:** $1');
          e.text = e.text.replace(/\n{3,}/g, '\n\n').trim();
        }
      }
    },
  },
  {
    name: 'restraint-durability',
    apply({ skeleton, j, sections, byId, energy, physical, inline, renderedOf, fallbackEntryName, NON_ACTION_SPELLS, SCALING_SPELLS, KNOWN_SPELLS, atWillBanned }) {
      // A restraint object's DURABILITY follows the block's tier (owner call,
      // 2026-08-07: "have a higher AC and HP"). Print anchors the low end —
      // the Giant Spider's and Ettercap's webs are AC 10; HP 5 at CR 1-2, and
      // the Roper's tendril is AC 20, HP 10 at CR 5 — but the template's
      // numbers were hard-coded, so a CR 20 block shipped a restraint any
      // cantrip deletes (live: the Brinewrack's DC-22 snare dying to 5 HP).
      // Bands, print at the bottom, owner call above:
      {
        const cr = crNumber(skeleton.cr);
        const tier = cr >= 17 ? [20, 30] : cr >= 11 ? [15, 20] : cr >= 5 ? [15, 10] : null;
        if (tier) {
          for (const list of Object.values(sections)) {
            for (const e of list) {
              e.text = e.text.replace(/is destroyed \(AC \d+; HP \d+;/g,
                `is destroyed (AC ${tier[0]}; HP ${tier[1]};`);
            }
          }
        }
      }
    },
  },
  {
    name: 'restraint-physics',
    apply({ skeleton, j, sections, byId, energy, physical, inline, renderedOf, fallbackEntryName, NON_ACTION_SPELLS, SCALING_SPELLS, KNOWN_SPELLS, atWillBanned }) {
      // A restraint object's counterplay follows its MATERIAL (owner call —
      // the substance could be anything): print's web line (Vulnerable Fire,
      // Immune Bludgeoning) is right for fibrous bindings and inverted for
      // stone — a shale tomb the martial's hammer can't crack while the
      // firebolt shatters it reads backwards at any table (live: Entomb in
      // Shale). Mineral-class substances swap to Vulnerable Bludgeoning,
      // Immune Fire; everything else keeps the printed web physics.
      {
        // Hardened houses CRACK, woven and organic ones BURN (owner call,
        // 2026-08-05). The old word list was the growing-regex shape and
        // missed "cooling magma crust" (live, the Furnaceflow) exactly as it
        // would miss the next material; the house already knows what it's
        // made of.
        const HARD_HOUSES = ['stone', 'magma', 'iron', 'glass', 'bone', 'ice', 'sand', 'chitin'];
        const hardTokens = HARD_HOUSES.flatMap((h) => textureBanks.houses?.[h]?.tokens ?? []);
        const MINERAL = new RegExp(`\\b(?:${hardTokens.join('|')}|crust|shale|slate|marble|obsidian|coral|amber|gold|steel|metal)\\b`, 'i');
        // (The printed variants, verified: the ETTERCAP's web is "Immunity to
        // Bludgeoning, Poison, and Psychic"; the GIANT SPIDER's is "Immunity to
        // Poison and Psychic". An older comment here had those two backwards.)
        // BLUDGEONING IMMUNITY IS FOR FIBROUS THINGS ONLY (owner call,
        // 2026-08-07, the Uulgroth's Honeyed Resin). Print gives BOTH web
        // variants — the Ettercap's web is Immune to Bludgeoning, the Giant
        // Spider's is not — so dropping that immunity is a printed shape, not
        // an invention. A web you cannot punch apart is believable; hardened
        // resin, wax or sap is exactly the thing a mace shatters, and it still
        // burns. Fibrous keeps the Ettercap variant, everything non-mineral
        // takes the Giant Spider variant: burns AND cracks.
        const FIBROUS = /\b(?:web|webbing|silk|strand|gossamer|thread|mesh|netting|filament|cobweb)\b/i;
        for (const list of Object.values(sections)) {
          for (const e of list) {
            const m = e.text.match(/until (?:the|its) ([\w' -]+?) is destroyed \(AC/);
            if (!m) continue;
            const houseWords = (skeleton.houses ?? [])
              .flatMap((h) => [h, ...(textureBanks.houses?.[h]?.tokens ?? [])]);
            const speaksHouse = houseWords.length
              && new RegExp(`\\b(?:${houseWords.join('|')})`, 'i').test(m[1]);
            if (MINERAL.test(m[1])) {
              e.text = e.text
                .replace('Vulnerability to Fire damage', 'Vulnerability to Bludgeoning damage')
                .replace('Immunity to Bludgeoning, Poison, and Psychic damage', 'Immunity to Fire, Poison, and Psychic damage')
                .replace('Immunity to Poison and Psychic damage', 'Immunity to Fire, Poison, and Psychic damage');
            } else if (!FIBROUS.test(m[1]) && !speaksHouse) {
              // Neither mineral, nor fibrous, nor the block's own material: a
              // guessed vulnerability is arbitrary at the table (owner call,
              // 2026-08-11), and print has the shape ready — the Roper's
              // tendril carries NO vulnerability, just the immunities.
              e.text = e.text
                .replace('Vulnerability to Fire damage; ', '')
                .replace('Immunity to Bludgeoning, Poison, and Psychic damage', 'Immunity to Poison and Psychic damage');
            } else if (!FIBROUS.test(m[1])) {
              // The house speaks but is soft (brine, tar, venom): it burns and
              // cracks — the Giant Spider variant, Fire vulnerability kept.
              e.text = e.text
                .replace('Immunity to Bludgeoning, Poison, and Psychic damage', 'Immunity to Poison and Psychic damage');
            }
          }
        }
      }
    },
  },
  {
    name: 'capability-clause',
    apply({ skeleton, j, sections, byId, energy, physical, inline, renderedOf, fallbackEntryName, NON_ACTION_SPELLS, SCALING_SPELLS, KNOWN_SPELLS, atWillBanned }) {
      // A capability clause never outlives the capability: the ferry's carry
      // half references a Grappled creature, and a block with no grapple ships
      // half a sentence about a thing it cannot do. `grapple-dependency-orphan`
      // ALREADY fires on this — it just had no corrector, so the reject shipped
      // (live: Sink Through Murk on the Hadal Warden). Deterministic, and the
      // self-teleport survives intact.
      {
        const grapples = Object.values(sections).flat()
          .some((e) => /Grappled condition \(escape|has the Grappled condition/.test(e.text));
        if (!grapples) {
          for (const list of Object.values(sections)) {
            for (const e of list) {
              e.text = e.text.replace(
                /, or teleports that far together with one creature within 10 feet of itself that is willing or Grappled by it \([^)]*\)/,
                '',
              );
            }
          }
        }
      }
    },
  },
  {
    name: 'absorbed-not-immune',
    apply({ skeleton, j, sections, byId, energy, physical, inline, renderedOf, fallbackEntryName, NON_ACTION_SPELLS, SCALING_SPELLS, KNOWN_SPELLS, atWillBanned }) {
      // An ABSORBED type is never also an Immunity: print's four absorbers
      // (Iron/Clay/Flesh Golem, Shambling Mound) are none of them immune to
      // what they absorb — and immunity makes the absorption dead text,
      // since the creature can never take the damage that heals it (live:
      // Cold immunity beside Frozen Vigor).
      {
        const absorbed = new Set();
        for (const list of Object.values(sections)) {
          for (const e of list) {
            const m = e.text.match(/subjected to (\w+) damage, it (?:takes no damage and instead )?regains/);
            if (m) absorbed.add(m[1]);
          }
        }
        if (absorbed.size && typeof j.immunities === 'string') {
          j.immunities = j.immunities.split(/([;,])/).reduce((acc, part, i2, arr) => {
            if (/^[;,]$/.test(part)) return acc;
            const kept = part.split(',').map((x) => x.trim()).filter((x) => x && !absorbed.has(x));
            return acc.concat(kept.length ? [kept.join(', ')] : []);
          }, []).join('; ');
        }
      }
    },
  },
  {
    name: 'name-type-harmonizer',
    apply({ skeleton, j, sections, byId, energy, physical, inline, renderedOf, fallbackEntryName, NON_ACTION_SPELLS, SCALING_SPELLS, KNOWN_SPELLS, atWillBanned }) {
      // Type-named entries harmonize with the damage they actually deal: a
      // placeholder like "Lightning Breath" keeps its source's type word while
      // {damage_type} is the flavor call's to choose, so an unrenamed entry
      // ships a name/type contradiction (live: a placeholder-derived Furnace
      // Lightning dealing Thunder). Engine-side swap, before the Multiattack
      // rebuild so references follow; the entry-name-type-mismatch lint stays
      // as the tripwire. 0/329 printed entries mismatch.
      {
        const TYPE_WORDS = ['Acid', 'Cold', 'Fire', 'Force', 'Lightning', 'Necrotic', 'Poison', 'Psychic', 'Radiant', 'Thunder'];
        const ALL_TYPES = TYPE_WORDS.concat(['Bludgeoning', 'Piercing', 'Slashing']);
        // Type SYNONYMS: a name promises its element in register words far
        // more often than in the bare type word — "Barrow Chill Burst" dealt
        // Fire (live, the Emberwraith) and the bare-word check saw nothing.
        // Only the unambiguous ones; anything that reads two ways stays out.
        // ONLY words that name an element's physical form. Register
        // vocabulary is deliberately excluded — "Hallowed", "Sepulchral",
        // "Maddening" describe a creature's nature, not its damage type, and
        // treating them as claims renamed a perfectly good "Hallowed
        // Radiance" to "Poison Radiance" (caught in the sweep).
        const SYNONYMS = {
          Cold: ['chill', 'frost', 'rime', 'glacial', 'hoarfrost', 'freezing', 'icy'],
          Fire: ['ember', 'cinder', 'searing', 'scorching', 'pyre', 'blazing', 'flame', 'furnace'],
          Acid: ['caustic', 'vitriolic'],
          Poison: ['venomous', 'toxic'],
        };
        const nameClaims = (name, ty) => new RegExp(`\\b${ty}\\b`, 'i').test(name)
          || (SYNONYMS[ty] ?? []).some((w) => new RegExp(`\\b${w}`, 'i').test(name));
        for (const list of Object.values(sections)) {
          for (const e of list) {
            if (e.name_locked) continue;
            const dealt = [...(e.text ?? '').matchAll(/(\w+) damage/g)].map((m) => m[1])
              .filter((t) => ALL_TYPES.includes(t));
            if (!dealt.length) continue;
            // a name claiming the type it deals is coherent — never rewrite it
            if (TYPE_WORDS.some((ty) => dealt.includes(ty) && nameClaims(e.name, ty))) continue;
            for (const ty of TYPE_WORDS) {
              if (nameClaims(e.name, ty) && !dealt.includes(ty)) {
                const oldName = e.name;
                const bareHit = new RegExp(`\\b${ty}\\b`, 'i');
                // STRIP, don't substitute, unless the swap is energy-for-
                // energy on a bare type word (owner call, from the Charnel
                // Reliquary — "what is a bludgeoning bolt. bad naming...
                // either it has a fire damage rider or it's just 'Claw'").
                // The old substitution put dealt[0] where the claim stood,
                // and dealt[0] is often PHYSICAL: "Cinder Shard" dealing
                // Bludgeoning became "Bludgeoning Shard" (live, the
                // Ashgrave Warden) — a damage type in the name slot, which
                // 0 of 329 printed entries do. "Fire Bolt" -> "Force Bolt"
                // stays: bare word for bare energy word is print's shape.
                const energyDealt = dealt.find((d) => TYPE_WORDS.includes(d));
                const claimRe = bareHit.test(e.name) ? bareHit
                  : new RegExp(`\\b(?:${(SYNONYMS[ty] ?? []).join('|')})\\w*`, 'i');
                if (bareHit.test(e.name) && energyDealt) {
                  e.name = e.name.replace(bareHit, energyDealt);
                } else {
                  // The strip must consume an adjacent hyphen too:
                  // "Cinder-Breath" minus "Cinder" left "-Breath" on a
                  // live card (the Ashfall) — a leading orphan the audit
                  // could flag but not fix.
                  const stripped = e.name.replace(claimRe, '').replace(/\s{2,}/g, ' ')
                    .replace(/^[-\s]+|[-\s]+$/g, '').replace(/-{2,}/g, '-').trim();
                  // an emptied name stays put — the audit's adjective
                  // clause owns the judgment call from here
                  e.name = stripped || oldName;
                }
                if (e.name === oldName) break;
                // References follow ("makes one Radiant Sword attack" must
                // track a Radiant Sword -> Fire Sword rename) — this pass runs
                // after every other reference repoint, so it propagates its own.
                for (const l2 of Object.values(sections)) {
                  for (const e2 of l2) {
                    e2.text = e2.text.split(oldName).join(e.name);
                  }
                }
                break;
              }
            }
          }
        }
      }
    },
  },
  {
    name: 'doubled-article',
    apply({ sections }) {
      // 16. "The the clacking tide makes..." — a proper name that arrived
      //     wearing its own article, spliced into templates that supply
      //     theirs (live: both folk-register blocks of 2026-08-16, every
      //     reference line). The name is stripped at ingestion now; this
      //     is the belt for any path that still mints the doubling —
      //     sited LAST so it sweeps whatever the other passes composed.
      for (const list of Object.values(sections)) {
        for (const e of list) {
          e.text = e.text.replace(/\b(the)\s+the\b/gi, '$1');
          if (e.name) e.name = e.name.replace(/\b(the)\s+the\b/gi, '$1');
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
