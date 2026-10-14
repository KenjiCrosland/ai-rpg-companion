/**
 * THE CLASS KIT (landing two, 2026-10-13). A class the GM NAMES lands its own
 * rows; a class the words merely imply does not — the catalog already offers
 * every one of these templates and ranks them by the GM's verbs, so the implied
 * tier needs no mechanism of its own (owner: "trigger is not eligibility").
 *
 * The rows are catalog template ids and SRD lifts. Never new rules text: the
 * inventory (scripts/smoke-evidence/CLASSES-inventory-2026-10-13.md) found that
 * print's 26 people-blocks carry only thirteen distinct features between them,
 * so nearly every class feature has to be authored — and authored rules text has
 * one home, the catalog.
 *
 * `keys`: the class named, or a role word that means it. `rows`: ordered, most
 * iconic first, landed under print's row cap. A row with its own `keys` is a
 * subclass-shaped row and lands only when the words ask for it (the assassin's
 * Assassinate, the berserker's loss of control) — the same tiering the species
 * table uses for a lifted trait. `requiresRow` names a row the sheet must
 * already carry: print's caster features say "using the same spellcasting
 * ability as Spellcasting", so they are meaningless without that row.
 *
 * A LIFT CARRIES NO DICE. Print's own numbers are print's CR's — the Gladiator's
 * Shield Bash lifts as "9 (2d4 + 4)", which is wrong at every other CR. A
 * feature whose numbers must scale is a catalog template, never a lift, and
 * `classes.spec.js` pins that invariant over the whole table.
 */
import { liftSrdRow } from './species.mjs';

export const CLASSES = [
  {
    key: 'rogue',
    keys: ['rogue', 'rogues', 'thief', 'thieves', 'cutpurse', 'burglar', 'footpad', 'pickpocket', 'spy', 'assassin', 'cat burglar'],
    rows: [
      { srd: ['Assassin', 'Cunning Action'] },
      { template: 'evasion' },
      { template: 'assassinate', keys: ['assassin', 'ambush', 'ambushes', 'unseen', 'from hiding', 'first strike', 'strikes first', 'stalks', 'garrote'] },
    ],
  },
  {
    key: 'fighter',
    keys: ['fighter', 'warrior', 'soldier', 'swordsman', 'swordmaster', 'man-at-arms', 'legionary', 'sellsword', 'duelist', 'fencer', 'knight'],
    rows: [
      { template: 'riposte' },
      { template: 'guarded-stance', keys: ['shield', 'shields', 'guard', 'guards', 'defensive', 'holds the line', 'shield wall', 'bulwark', 'stance', 'braced'] },
      { template: 'shield-bash', keys: ['shield bash', 'bash', 'bashes', 'bashing', 'buckler', 'slams its shield'] },
      { template: 'second-wind', keys: ['second wind', 'recovers', 'catches its breath', 'shrugs off', 'endures', 'veteran'] },
    ],
  },
  {
    key: 'monk',
    keys: ['monk', 'monks', 'martial artist', 'ascetic', 'open hand', 'open-hand', 'pugilist', 'brawler', 'fist of'],
    rows: [
      { template: 'stunning-strike' },
      { template: 'patient-defense' },
      { template: 'feint-slip', name: 'Step of the Wind', keys: ['step of the wind', 'darts', 'dances', 'slips', 'wind', 'nimble', 'weaves', 'tumbles'] },
    ],
  },
  {
    key: 'paladin',
    keys: ['paladin', 'paladins', 'oathsworn', 'oath-sworn', 'knight-errant', 'crusader', 'cavalier', 'avenger', 'champion of'],
    rows: [
      { srd: ['Hobgoblin Captain', 'Aura of Authority'] },
      { template: 'lay-on-hands', keys: ['heal', 'heals', 'healing', 'mends', 'lays hands', 'tends', 'blessing', 'restores', 'succour', 'succor'] },
      { template: 'coating', name: 'Divine Smite', keys: ['smite', 'smites', 'radiant', 'holy', 'sacred', 'blazing', 'searing light', 'divine'] },
    ],
  },
  {
    key: 'cleric',
    keys: ['cleric', 'priest', 'priestess', 'acolyte', 'chaplain', 'templar', 'inquisitor', 'cultist', 'warpriest', 'war priest', 'hierophant'],
    rows: [
      { srd: ['Priest', 'Divine Aid'], requiresRow: /^Spellcasting$/ },
      { srd: ['Cultist Fanatic', 'Spiritual Weapon'], requiresRow: /^Spellcasting$/, keys: ['weapon of', 'spectral', 'floating', 'hovering', 'summons a blade', 'holy weapon', 'conjures'] },
    ],
  },
  {
    key: 'mage',
    keys: ['wizard', 'mage', 'archmage', 'magus', 'sorcerer', 'sorceress', 'evoker', 'conjurer', 'abjurer', 'diviner', 'illusionist', 'necromancer', 'court mage', 'spellslinger'],
    rows: [
      { srd: ['Mage', 'Protective Magic'], requiresRow: /^Spellcasting$/ },
      { srd: ['Mage', 'Misty Step'], requiresRow: /^Spellcasting$/, keys: ['step', 'steps', 'blink', 'blinks', 'vanish', 'vanishes', 'flicker', 'teleport', 'teleports', 'never where', 'slips away'] },
    ],
  },
  {
    key: 'bard',
    keys: ['bard', 'minstrel', 'skald', 'troubadour', 'jongleur', 'balladeer', 'songweaver'],
    rows: [
      { srd: ['Pirate Captain', "Captain's Charm"] },
      { template: 'rally' },
    ],
  },
  {
    key: 'barbarian',
    keys: ['barbarian', 'barbarians', 'berserker', 'berserkers', 'reaver', 'raider', 'marauder', 'warchief', 'wildling'],
    rows: [
      { srd: ['Berserker', 'Bloodied Frenzy'] },
      { template: 'rampage' },
      { template: 'berserk', keys: ['berserk', 'loses control', 'uncontrollable', 'amok', 'mindless rage', 'blind rage', 'cannot be reasoned'] },
    ],
  },
];

/** A class is learned, so it needs a mind that can learn one (owner: "eligibility by mind, not type"). */
export const classEligible = ({ mind = null, int = null } = {}) => {
  if (mind === 'bestial' || mind === 'mindless') return false;
  if (mind === 'sapient') return true;
  return int == null || Number(int) >= 6;
};

const reOf = (ks) => new RegExp(`\\b(?:${ks.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`, 'i');

/**
 * The class the GM NAMED, with the clause that named it. Returns null when no
 * class is named or the creature could not learn one.
 */
export function classFor(texts, { mind = null, int = null } = {}) {
  if (!classEligible({ mind, int })) return null;
  const list = (texts ?? []).map((t) => String(t ?? '')).filter(Boolean);
  // THE MOST SPECIFIC WORD WINS, not the first table row: "knight-errant" holds
  // "knight", and a paladin who reads as a fighter is the wrong class, not a
  // near-miss. Longest matched key across the whole table decides.
  let best = null;
  for (const cls of CLASSES) {
    for (const k of cls.keys) {
      const re = new RegExp(`\\b${k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      const hit = list.find((t) => re.test(t));
      if (!hit) continue;
      if (!best || k.length > best.key.length) best = { cls, clause: hit, key: k };
    }
  }
  return best ? { cls: best.cls, clause: best.clause } : null;
}

/** The rows this class owes, in order. A row with its own keys waits for the words to ask. */
export function classRows(cls, { text = '', inline = 'the creature', dc = 12 } = {}) {
  const src = String(text ?? '');
  return (cls.rows ?? []).filter((r) => !r.keys || reOf(r.keys).test(src)).map((r) => {
    if (r.template) return { kind: 'template', template: r.template, name: r.name ?? null, keys: r.keys ?? null, requiresRow: r.requiresRow ?? null };
    const lift = liftSrdRow(r.srd[0], r.srd[1]);
    if (!lift) return null;
    return {
      kind: 'row', name: r.name ?? r.srd[1], section: lift.section, keys: r.keys ?? null, requiresRow: r.requiresRow ?? null,
      text: String(lift.text).split('{inline}').join(inline).split('{dc}').join(String(dc)).replace(/^./, (c) => c.toUpperCase()),
      gate: lift.gate ?? null, source: lift.source,
    };
  }).filter(Boolean);
}
