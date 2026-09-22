/**
 * THE ROUTE CALL (owner, 2026-09-21: "let's do two calls. go").
 *
 * WHY THIS EXISTS: the old resolve asked the model for four independent
 * labels (archetype, style, body, mechanics) and none of them was the
 * decision we need — which DONOR LINE. The labels overlapped, contradicted
 * each other, and meant different things to the model than to us
 * ("controller" = holds people, to the model; = the caster family, to us).
 * A dozen belts in the Vue translated the model's semantics into ours after
 * the fact, and every new hallucination class needed a new belt.
 *
 * Now the model chooses FROM THE SHELF, by analogy to printed monsters it
 * knows, and must QUOTE the phrase of the input that earns each pick. The
 * engine verifies the quote against the input and discards what it cannot
 * find; a few hard vetoes (a living juggernaut) fall to the NEXT pick, never
 * to a plain line. Routing is a small closed-vocabulary call; the prose
 * (identity, lore, names) is a second call conditioned on the chosen line.
 *
 * The interface OUT of this module (archetype, style, body, mechanics,
 * resolvedType) is exactly what generateReskin already consumes — nothing
 * below resolve changes.
 */
import { DONORS } from './donors.mjs';

/** The shelf, in the order the model sees it. `role` is the menu label the saved monster records. */
export const LINES = [
  // ---- brute: hits hard up close, soaks damage, easy to hit
  { id: 'brute', family: 'brute', style: null, blurb: 'a plain bruiser — big weapon or big limbs, stands and trades, no trick', exemplars: 'Ogre, Hill Giant, Minotaur' },
  { id: 'brute-charger', family: 'brute', style: 'charger', blurb: 'runs prey down — a straight rush that hits hardest at the end, gores, tramples the prone', exemplars: 'Gorgon, Rhinoceros, Triceratops' },
  { id: 'brute-grappler', family: 'brute', style: 'grappler', blurb: 'a solid BODY that seizes and holds — jaws, coils, tentacles, a maw or cage that swallows, engulfs, smothers, or drags prey inside itself (a ghost that pulls you under is lurker-phantom)', exemplars: 'Roper, Giant Constrictor Snake, Otyugh, Purple Worm', implies: ['grapple', 'engulf'] },
  { id: 'brute-juggernaut', family: 'brute', style: 'juggernaut', blurb: 'a MADE thing — poured, forged, carved, or animated stone or metal; immune to being reshaped, breaks what it walks through', exemplars: 'Stone Golem, Iron Golem, Animated Armor (large)', made: true },
  { id: 'brute-regenerator', family: 'brute', style: 'regenerator', blurb: 'its wounds close as fast as they open — flesh, wax, or iron that reknits, regrows, or reassembles; only its bane stops it', exemplars: 'Troll, Hydra', implies: ['regeneration'] },
  // ---- skirmisher: mobile hit-and-run
  { id: 'skirmisher', family: 'skirmisher', style: null, blurb: 'a mobile hit-and-run attacker — pack tactics, dart in, dart out', exemplars: 'Wolf, Gnoll, Hobgoblin' },
  { id: 'skirmisher-mounted', family: 'skirmisher', style: 'mounted', blurb: 'a RIDER, or a beast carrying one — speed, momentum, ride-down attacks that carry it past the target; a lone charging beast with no rider is brute-charger', exemplars: 'Knight on a warhorse, Centaur, Wight cavalry' },
  { id: 'skirmisher-skulker', family: 'skirmisher', style: 'skulker', blurb: 'a bodied sneak — hides, strikes with advantage, vanishes; a living or solid creature, never a ghost', exemplars: 'Assassin, Doppelganger, Goblin Boss' },
  { id: 'skirmisher-hurler', family: 'skirmisher', style: 'hurler', blurb: 'a thrower — boulders, spears, nets, javelins, reeling lines; a physical creature that fights at range with its arm', exemplars: 'Hill Giant (rocks), Cyclops, a net-thrower', implies: ['thrown-weapon'] },
  { id: 'skirmisher-winged', family: 'skirmisher', style: 'winged', blurb: 'a flyer — dives, swooping strikes, snatches and drops, attacks on the wing', exemplars: 'Griffon, Wyvern, Peryton' },
  // ---- lurker: fragile ambusher with a devastating opening strike
  { id: 'lurker', family: 'lurker', style: null, blurb: 'a stalker — invisible or hidden, one devastating opening strike, then the hide-cycle', exemplars: 'Invisible Stalker, Hunter Shark, Displacer Beast' },
  { id: 'lurker-phantom', family: 'lurker', style: 'phantom', blurb: 'an incorporeal dead or spectral thing — drifts through walls, drains the living, cannot bear the light; a ghost or spirit is ALWAYS this', exemplars: 'Ghost, Wraith, Specter, Shadow' },
  { id: 'lurker-trap', family: 'lurker', style: 'trap', blurb: 'it IS the ambush — a disguised, rooted, or attached thing that looks harmless or holds still until prey is close, then springs', exemplars: 'Mimic, Piercer, Gargoyle (perched), Trapper' },
  // ---- caster: the artillery / controller family
  { id: 'caster', family: 'caster', role: 'artillery', style: null, blurb: 'fragile ranged magic — bolts, blasts, a spell list, keeps its distance', exemplars: 'Mage, Archmage, Flameskull' },
  { id: 'caster-binder', family: 'caster', role: 'controller', style: 'binder', blurb: 'a hexer — curses, rays, and conditions over raw damage; wins by taking enemies\' actions away, not their Hit Points', exemplars: 'Green Hag, Night Hag, a witch or warlock' },
  { id: 'caster-warpriest', family: 'caster', role: 'artillery', style: 'warpriest', blurb: 'an armored battle-cleric or crusader — weapon strikes that carry holy or profane energy, prayers as war-gear', exemplars: 'Priest, War Priest, a paladin-shaped fiend' },
  // ---- defender: protects, punishes movement
  { id: 'defender', family: 'defender', style: null, blurb: 'a living soldier or bodyguard — shield, armor, holds the line, punishes anyone who moves past', exemplars: 'Knight, Guard Captain, Veteran' },
  { id: 'defender-warden', family: 'defender', style: 'warden', blurb: 'a MADE or risen guardian bound to a charge — a construct sentinel or tomb-bound spirit that shields something specific with its own body', exemplars: 'Shield Guardian, Helmed Horror, a tomb golem', made: true },
  // ---- bodies: the body IS the chassis
  { id: 'swarm', family: 'swarm', body: 'swarm', style: null, blurb: 'a mass of small creatures (or small things) acting as one — occupies space, halves when bloodied', exemplars: 'Swarm of Insects, Swarm of Bats, Swarm of Ravens' },
  { id: 'ooze', family: 'ooze', body: 'ooze', style: null, blurb: 'an amorphous body — no fixed shape, corrodes or engulfs, squeezes through cracks; the body IS the ooze, not a coating or a mouthful', exemplars: 'Black Pudding, Gelatinous Cube, Ochre Jelly' },
  { id: 'dragon', family: 'dragon', body: 'dragon', style: null, blurb: 'a true dragon — breath weapon, flight, frightful presence, the whole kit in one body', exemplars: 'Adult Red Dragon, Young Green Dragon, Wyrmling', implies: ['breath'] },
];

const BY_ID = new Map(LINES.map((l) => [l.id, l]));
// the model sometimes decorates an id ("brute-grappler (ooze?)", "Brute-Grappler",
// "brute grappler"): take the LONGEST shelf id that appears in what it wrote
const IDS_LONGEST_FIRST = [...BY_ID.keys()].sort((a, b) => b.length - a.length);
export function lineIdOf(raw) {
  const t = String(raw ?? '').toLowerCase().replace(/[_\s]+/g, '-');
  if (BY_ID.has(t)) return t;
  return IDS_LONGEST_FIRST.find((id) => new RegExp(`(?:^|[^a-z])${id}(?:$|[^a-z])`).test(t)) ?? null;
}
export const MADE_TYPES = ['Construct', 'Elemental', 'Undead', 'Plant', 'Ooze'];
const WARDEN_TYPES = [...MADE_TYPES, 'Celestial', 'Fiend'];
export const EXTRA_MECHANICS = ['gaze', 'teleport', 'aura', 'breath', 'summon', 'snare', 'thrown-weapon', 'grapple'];
const TYPES = ['Aberration', 'Beast', 'Celestial', 'Construct', 'Dragon', 'Elemental', 'Fey', 'Fiend', 'Giant', 'Humanoid', 'Monstrosity', 'Ooze', 'Plant', 'Undead'];

/** The family a user-picked menu role maps to (artillery and controller are the caster family). */
export function familyFor(menuRole) {
  if (!menuRole) return null;
  return menuRole === 'artillery' || menuRole === 'controller' ? 'caster' : menuRole;
}

const STOP = new Set(['the', 'and', 'that', 'its', 'with', 'from', 'into', 'onto', 'who', 'whom', 'which', 'when', 'until', 'then', 'than', 'this', 'their', 'them', 'they', 'for', 'off', 'out', 'over', 'under', 'his', 'her', 'has', 'have', 'are', 'was', 'not', 'but', 'any', 'all', 'one', 'own']);
const words = (s) => String(s ?? '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').split(' ').filter((w) => w.length >= 3 && !STOP.has(w));

/**
 * A quote earns a pick when most of its content words appear in the input.
 * Not a substring test: the model paraphrases lightly ("drags cattle into
 * the bog" for "that drags cattle into the bog"), and a substring test would
 * discard honest quotes; a bag-of-words test discards invented ones.
 */
export function evidenceIn(because, text) {
  const q = words(because);
  if (!q.length) return false;
  const have = new Set(words(text));
  const hit = q.filter((w) => have.has(w)).length;
  return hit / q.length >= 0.6;
}

export function buildRoutePrompt(text, { cr = null, menuRole = null } = {}) {
  const family = familyFor(menuRole);
  const shelf = LINES.filter((l) => !family || l.family === family)
    .map((l) => `- ${l.id} — ${l.blurb} (${l.exemplars})`).join('\n');
  return `Route this D&D monster concept onto ONE chassis from the shelf below. Choose by ANALOGY: which printed monsters does this concept play most like at the table? Every chassis is a hand-built template and the numbers are handled elsewhere — you are choosing the SHAPE of the fight, nothing else.

Concept: ${text}
${cr != null ? `Challenge Rating: ${cr}\n` : ''}${family ? `The combat role is FIXED by the user (${menuRole}) — the shelf below is already limited to it; choose among these only.\n` : ''}
THE SHELF (id — what it plays like — printed exemplars):
${shelf}

RULES
- Rank up to THREE picks, best first. For EACH pick, quote the phrase of the concept that earns it ("because") — copy the words as written. A pick you cannot quote for is a pick you should not make: the engine checks every quote against the input and discards picks it cannot find there.
- What the creature IS outranks what it DOES to its victims, and what it uses, hunts, wears, rides, or is compared to. An incorporeal or drowned dead thing that pulls, drags, or drowns the living is lurker-phantom, never brute-grappler: the grappler is a BODY that holds prey in its grip or inside itself. A troll-hunter is not a troll; a knight who rides a horse is mounted but not a beast; a sword forged by a golem is not a golem; a thing with a tar-slick mouth is not an ooze.
- brute-juggernaut and defender-warden are MADE or risen things (construct, elemental, undead, plant, ooze). Living flesh, however armored, takes another chassis.
- swarm, ooze, and dragon only when the BODY is that thing — a mass of many, an amorphous mass, a true dragon.
- A concept that holds, seizes, swallows, entombs, or folds shut around prey is brute-grappler however it is built — that chassis alone carries the containment engine. A thing that traps by LOOKING harmless is lurker-trap.
- creature_type from the concept's SUBSTANCE — what it physically is: animated objects and machines are Construct; remains or spirits of the dead are Undead; natural animals are Beast; fungus and vegetation are Plant; giants are Giant. Humanoid is the NPC type — a remade, fused, grown, or woven thing is a Monstrosity however upright it stands. Never type by vibe.
- extras: gated add-on mechanics the concept ITSELF shows, from: ${EXTRA_MECHANICS.join(', ')} — each with its own quote. Most concepts have none. Never list what would merely be cool.

Return ONLY JSON, no markdown: {"picks": [{"line": "<id from the shelf>", "because": "<phrase copied from the concept>"}], "creature_type": "<one of: ${TYPES.join(', ')}>", "extras": [{"mechanic": "<one of the list>", "because": "<phrase copied from the concept>"}]}`;
}

function tryParse(raw) {
  try { return JSON.parse(String(raw).replace(/^```(?:json)?\s*|\s*```$/g, '').trim()); } catch { return null; }
}

/** Valid when at least one pick names a line on the shelf. Everything else is tolerated and vetted by chooseLine. */
export function validateRouteResponse(jsonString) {
  const p = tryParse(jsonString);
  return p != null && Array.isArray(p.picks) && p.picks.some((k) => lineIdOf(k?.line) != null);
}

/**
 * @returns {{ line, archetype, role, style, body, mechanics, resolvedType, notes: string[] }}
 *   archetype is the FAMILY generateReskin takes ('caster' for the caster
 *   lines); role is the menu label to record. line is null when nothing
 *   routed (the caller falls to its own default).
 */
export function chooseLine(parsed, { text, menuRole = null } = {}) {
  const notes = [];
  const family = familyFor(menuRole);
  const resolvedType = TYPES.includes(parsed?.creature_type) ? parsed.creature_type : null;
  const picks = Array.isArray(parsed?.picks) ? parsed.picks.slice(0, 3) : [];
  let chosen = null;
  let firstKnown = null;
  for (const k of picks) {
    const id = lineIdOf(k?.line);
    const line = id ? BY_ID.get(id) : null;
    if (!line) { notes.push(`${String(k?.line ?? '?').slice(0, 30)}: not on the shelf`); continue; }
    firstKnown = firstKnown ?? line;
    if (family && line.family !== family) { notes.push(`${id}: outside the user's ${menuRole} role`); continue; }
    if (!evidenceIn(k?.because, text)) { notes.push(`${id}: quote not found in the input ("${String(k?.because ?? '').slice(0, 40)}")`); continue; }
    if (line.id === 'brute-juggernaut' && resolvedType && !MADE_TYPES.includes(resolvedType)) { notes.push(`${id}: a ${resolvedType} is not a made thing`); continue; }
    if (line.id === 'defender-warden' && resolvedType && !WARDEN_TYPES.includes(resolvedType)) { notes.push(`${id}: a ${resolvedType} is not a made or risen guardian`); continue; }
    chosen = line;
    notes.push(`${id}: ✓ ("${String(k.because).slice(0, 40)}")`);
    break;
  }
  if (!chosen) {
    // RANK, don't default (critic run three: the vault "fell to lurker's plain
    // line" and shipped a Dex 20 stealth chassis with no disguise): the first
    // known pick that passes the HARD vetoes stands, its quote unverified
    for (const k of picks) {
      const line = BY_ID.get(lineIdOf(k?.line) ?? '');
      if (!line || (family && line.family !== family)) continue;
      if (line.id === 'brute-juggernaut' && resolvedType && !MADE_TYPES.includes(resolvedType)) continue;
      if (line.id === 'defender-warden' && resolvedType && !WARDEN_TYPES.includes(resolvedType)) continue;
      chosen = line; notes.push(`${line.id}: taken on rank — its quote was not found, no hard veto`); break;
    }
  }
  if (!chosen) {
    const fam = family ?? firstKnown?.family ?? null;
    if (fam) {
      chosen = BY_ID.get(fam) ?? null;
      if (chosen) notes.push(`fell to ${fam}'s plain line`);
    }
  }
  const extras = [];
  for (const x of Array.isArray(parsed?.extras) ? parsed.extras : []) {
    const m = String(x?.mechanic ?? '').toLowerCase();
    if (!EXTRA_MECHANICS.includes(m)) continue;
    if (!evidenceIn(x?.because, text)) { notes.push(`extra ${m}: quote not found`); continue; }
    if (!extras.includes(m)) extras.push(m);
  }
  const mechanics = [...new Set([...(chosen?.implies ?? []), ...extras])];
  return {
    line: chosen?.id ?? null,
    archetype: chosen?.family ?? null,
    role: chosen ? (chosen.role ?? (chosen.body ? null : chosen.family)) : null,
    style: chosen?.style ?? null,
    body: chosen?.body ?? null,
    mechanics,
    resolvedType,
    notes,
  };
}

/** Every donor line must be on the shelf, and every shelf id must have a donor — checked by the spec. */
export function shelfCoverage() {
  const donorLines = new Set(DONORS.map((d) => `${d.archetypes?.[0] === 'artillery' ? 'skirmisher' : (d.archetypes?.[0] ?? d.id.split('-')[0])}${d.style ? `-${d.style}` : ''}`));
  const shelf = new Set(LINES.map((l) => l.id));
  return { missingFromShelf: [...donorLines].filter((x) => !shelf.has(x)), missingDonor: [...shelf].filter((x) => !donorLines.has(x)) };
}
