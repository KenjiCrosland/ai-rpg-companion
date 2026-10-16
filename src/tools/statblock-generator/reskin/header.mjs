/**
 * HEADER HONESTY (owner + critic, 2026-09-22): the header and the attack-row
 * names were the last places the model wrote free text the engine took on
 * faith — Fly 40 on a strongroom, "Common" on a statue, a ranged row named
 * Claw, a Bite dealing Slashing, Fire resistance on a wax body. Every one is
 * derived here from a field the resolve already produced, with the model
 * choosing only from closed sets. Same law as the numbers: the engine owns it.
 */

const MODES = ['fly', 'swim', 'climb', 'burrow'];
// a line that IS the mode keeps it whatever the concept listed
const MODE_BY_LINE = { phantom: ['fly'], winged: ['fly'], dragon: ['fly'] };

/** Speed line from the concept's movement set: donor walk kept; extra modes only where the concept (or the line) says so. */
export function honestSpeed(speed, { movement = [], style = null, bodyType = null } = {}) {
  const want = new Set([...(movement ?? []).map((m) => String(m).toLowerCase()), ...(MODE_BY_LINE[style ?? ''] ?? []), ...(MODE_BY_LINE[bodyType ?? ''] ?? [])]);
  const parts = String(speed ?? '').split(/,\s*/).map((p) => p.trim()).filter(Boolean);
  const walk = parts.find((p) => /^\d+ ft\.?$/.test(p)) ?? parts[0] ?? '30 ft.';
  const walkFt = Number((/(\d+)/.exec(walk) ?? [0, 30])[1]);
  const kept = [walk]; const dropped = []; const added = [];
  for (const p of parts.slice(parts.indexOf(walk) === -1 ? 0 : 1)) {
    const mode = (/^(Fly|Swim|Climb|Burrow)\b/i.exec(p) ?? [])[1]?.toLowerCase();
    if (!mode) continue;
    if (!want.has(mode)) { dropped.push(p); continue; }
    // a kept mode never crawls either: a mode under 20 ft beside a fly speed lifts to 30 (the diver's donor Swim 5)
    const ft = Number((/(\d+)/.exec(p) ?? [0, 0])[1]);
    kept.push(ft && ft < 20 && walkFt < 20 && parts.some((q) => /^Fly/i.test(q)) ? p.replace(/\d+ ft/, '30 ft') : p);
  }
  for (const m of MODES) {
    if (want.has(m) && !kept.some((p) => new RegExp(`^${m}\\b`, 'i').test(p))) {
      const base = walkFt < 20 ? 30 : walkFt; // an added mode never inherits a crawl (the diver's Swim 5, Climb 5 beside Fly 60)
      const line = `${m[0].toUpperCase()}${m.slice(1)} ${m === 'burrow' ? Math.max(10, base - 10) : base} ft.`;
      kept.push(line); added.push(line);
    }
  }
  return { speed: kept.join(', '), dropped, added };
}

const PRINT_LANGUAGES = ['Common', 'Elvish', 'Dwarvish', 'Giant', 'Draconic', 'Infernal', 'Abyssal', 'Celestial', 'Sylvan', 'Undercommon', 'Deep Speech', 'Primordial', 'Aquan', 'Auran', 'Ignan', 'Terran', 'Goblin', 'Orc', 'Gnomish', 'Halfling', 'Druidic', 'Thieves\' Cant'];
/** Languages by mind, from the print set. */
export function honestLanguages(line, { mind = null, type = '', int = null, speaks = false } = {}) {
  const raw = String(line ?? '').trim();
  // TYPE-AWARE, off print's own 139 blocks at INT 5 or less: no Beast,
  // Monstrosity, Ooze, Plant, Undead or Aberration speaks, while a Giant, Fiend,
  // Elemental, Dragon or Construct often does (the Ogre speaks Common and Giant)
  // A LOW-INT CONSTRUCT DOES NOT SPEAK COMMON (owner's stage 1b, 2026-10-16). An
  // INT 4 swarm of bells shipped "Common". PRINT at INT 5 or less: Construct
  // speaks in 1 of 7 blocks (the Clay Golem, a named print creature that routes
  // through print canon anyway) and is otherwise mute or understands-only, so a
  // Construct joins the list — with print's own understands-only line, since
  // that is what its 2 non-mute low-INT Constructs carry. Beast, Monstrosity,
  // Ooze, Plant and Aberration speak in 0 of 118. Giant, Fiend, Elemental and
  // Dragon DO speak at low INT and stay out of the list.
  if (Number.isFinite(int) && int <= 5 && !speaks && /^(?:Construct|Swarm of \w+ Constructs?)\b/i.test(String(type))) return "Understands the languages of its creator but can't speak";
  if (Number.isFinite(int) && int <= 5 && !speaks && /^(?:Beast|Monstrosity|Ooze|Plant|Undead|Aberration)\b/i.test(String(type))) return 'None'; // an INT 4 body speaks nothing unless the GM says it does (the Frostmaw Leviathan spoke Common — the critic's second species read)
  if (mind === 'mindless') return /construct/i.test(type) ? "Understands the languages of its creator but can't speak" : 'None';
  if (/^Humanoid\b/i.test(String(type)) && (!raw || /^none$/i.test(raw) || mind === 'bestial')) return raw && !/^none$/i.test(raw) ? raw : 'Common'; // every print Humanoid speaks — a boar-shifter miller read as bestial printed None (critic, new lines 2026-09-28)
  if (mind === 'bestial') return 'None';
  if (/^Beast\b/i.test(String(type))) return 'None'; // 0/89 print Beasts speak — Common on a bird (critic 2026-09-28)
  if (/^Elemental\b/i.test(String(type)) && !/\b(?:Primordial|Ignan|Auran|Terran|Aquan)\b/i.test(raw)) return 'Primordial'; // 17/17 print Elementals speak Primordial — Common on a wildfire (critic, fresh six); a dialect already on the line stands
  // sapient: keep the print tokens only
  const kept = [];
  for (const tok of raw.split(/[,;]\s*|\s+plus\s+/i)) {
    const t = tok.trim();
    if (!t || /^none$/i.test(t)) continue;
    const lang = PRINT_LANGUAGES.find((L) => new RegExp(`^${L.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'i').test(t));
    if (lang) kept.push(lang);
    else if (/^telepathy \d+ ft\.?$/i.test(t)) kept.push(t.toLowerCase().replace(/\.?$/, '.')); // print writes "telepathy 60 ft." in lowercase
    else if (/languages it knew in life/i.test(t)) kept.push('the languages it knew in life');
    else if (/^understands? .*can't speak/i.test(t)) kept.push(t);
  }
  if (/^Humanoid\b/i.test(String(type)) && !kept.includes('Common') && !kept.some((k) => /can't speak/i.test(k))) kept.unshift('Common'); // a line that says it can't speak never gets a spoken tongue in front (the kenku read "Common, Understands Common and Auran but can't speak" — the critic's species read) // a print Humanoid speaks Common (Elvish + Sylvan on an elf who shoots for sport, critic 2026-09-29)
  if (!kept.length) return /undead/i.test(type) ? 'Common plus the languages it knew in life' : 'Common';
  return kept.length > 1 && kept.includes('the languages it knew in life') ? `${kept.filter((k) => k !== 'the languages it knew in life').join(', ')} plus the languages it knew in life` : kept.join(', ');
}

import { weaponProp, weaponNouns, weaponFor } from './weapons.mjs';

// anatomy and weapon nouns bind to a row kind and a physical damage type (print: 330/422 attack rows are one bare word)
export const ANATOMY = {
  bite: ['melee', 'Piercing'], fang: ['melee', 'Piercing'], fangs: ['melee', 'Piercing'], maw: ['melee', 'Piercing'], jaws: ['melee', 'Piercing'], beak: ['melee', 'Piercing'],
  claw: ['melee', 'Slashing'], claws: ['melee', 'Slashing'], talon: ['melee', 'Slashing'], talons: ['melee', 'Slashing'], rake: ['melee', 'Slashing'],
  slam: ['melee', 'Bludgeoning'], fist: ['melee', 'Bludgeoning'], fists: ['melee', 'Bludgeoning'], hoof: ['melee', 'Bludgeoning'], hooves: ['melee', 'Bludgeoning'], tail: ['melee', 'Bludgeoning'], tentacle: ['melee', 'Bludgeoning'], tentacles: ['melee', 'Bludgeoning'], pseudopod: ['melee', 'Bludgeoning'], trample: ['melee', 'Bludgeoning'],
  // TYPE-ONLY nouns (the third field): they fix a physical damage type that the
  // noun contradicts and never move a row between melee and ranged — a hurled
  // hammer or a thrown axe is honestly a ranged row (the critic's fifth read:
  // "Curb Stomp" dealt Piercing, "Fangblade" dealt Bludgeoning)
  stomp: ['melee', 'Bludgeoning', 'type'], stamp: ['melee', 'Bludgeoning', 'type'], kick: ['melee', 'Bludgeoning', 'type'], crush: ['melee', 'Bludgeoning', 'type'], pound: ['melee', 'Bludgeoning', 'type'], headbutt: ['melee', 'Bludgeoning', 'type'], club: ['melee', 'Bludgeoning', 'type'], mace: ['melee', 'Bludgeoning', 'type'], hammer: ['melee', 'Bludgeoning', 'type'], staff: ['melee', 'Bludgeoning', 'type'],
  ram: ['melee', 'Bludgeoning', 'type'], butt: ['melee', 'Bludgeoning', 'type'],
  gore: ['melee', 'Piercing'], horn: ['melee', 'Piercing'], horns: ['melee', 'Piercing'], tusk: ['melee', 'Piercing'], tusks: ['melee', 'Piercing'], sting: ['melee', 'Piercing'], stinger: ['melee', 'Piercing'], stingers: ['melee', 'Piercing'],
  pincer: ['melee', 'Slashing'], pincers: ['melee', 'Slashing'],
  rock: ['ranged', null], boulder: ['ranged', null], slab: ['ranged', null], bomb: ['ranged', null], flask: ['ranged', null], shard: ['ranged', 'Piercing'],
  // THE WEAPON NOUNS COME FROM THE WEAPON TABLE. They used to be written out
  // here too, and the copies drifted: a Shortsword dealt Slashing because this
  // list only knew "sword" (critic, 2026-10-14). A weapon noun fixes the
  // physical type and never moves a row between melee and ranged ('type').
  ...weaponAnatomy(),
};

/**
 * Every weapon name and alias as an anatomy noun, typed from the one table. The
 * four print tuned by hand stay tuned: a hurled javelin is honestly a ranged
 * row, and a polearm's noun may move a row to melee because nobody throws one.
 */
function weaponAnatomy() {
  const TUNED = { javelin: ['ranged', 'Piercing'], lance: ['melee', 'Piercing'], spear: ['melee', 'Piercing'], pike: ['melee', 'Piercing'] };
  const out = {};
  for (const n of weaponNouns()) {
    const w = weaponProp(n); if (!w) continue;
    out[n] = TUNED[n] ?? (w.reach ? ['melee', w.type, 'type'] : ['ranged', w.type]);
  }
  return out;
}
/**
 * The BODY PART a name carries, or null — "Crushing Tail" is a tail. Longest
 * first, so "stinger" wins over "sting". This is the question a scattered
 * `ANAT_STAMP` regex was asking in generate.mjs with its own copy of the list
 * (consolidation, 2026-10-15).
 *
 * The weapon nouns are excluded here even though they live in the same table: a
 * Staff is in ANATOMY because it TYPES a row, not because anyone grows one, and
 * the caller asking this question wants a limb. The one weapon table decides
 * which is which, so neither list has to be written out again.
 */
const ANATOMY_WORDS = Object.keys(ANATOMY).sort((a, b) => b.length - a.length);
export function anatomyIn(text) {
  const t = String(text ?? '').toLowerCase();
  return ANATOMY_WORDS.find((w) => !weaponFor(w) && new RegExp(`\\b${w}\\b`).test(t)) ?? null;
}

const cap = (s) => s.replace(/\b\w/g, (c) => c.toUpperCase());
/**
 * Attack renames obey anatomy: a melee noun never names a ranged row (it takes
 * the projectile), a ranged noun never names a melee row (Slam), and a melee
 * row's physical damage type follows its noun. Returns the renames applied.
 */
export function honestAttackNames(sections, { projectile = null } = {}) {
  const changes = [];
  const proj = cap(String(projectile ?? '').replace(/^(?:a|an|its|the)\s+/i, '').trim()) || 'Hurled Debris';
  for (const es of Object.values(sections ?? {})) {
    for (const e of es) {
      const text = e.text ?? '';
      if (/Melee or Ranged Attack Roll/.test(text)) continue; // a hybrid row carries a thrown melee weapon by design (Grik's Spear was renamed "Sling Stone" as a melee noun on a ranged row — the critic's third species read)
      const kind = /Ranged Attack Roll/.test(text) ? 'ranged' : /Melee Attack Roll/.test(text) ? 'melee' : null;
      if (!kind) continue;
      const bare = String(e.name ?? '').replace(/ \(.*\)$/, '');
      const head = bare.toLowerCase().split(/[\s-]+/).pop();
      const words = bare.toLowerCase().split(/[\s-]+/);
      let a = ANATOMY[head];
      // A CLOSED COMPOUND IS STILL ITS NOUN ("Fangblade" dealt Bludgeoning —
      // the critic's fifth read). The head word is read for an anatomy noun at
      // either end, and the LAST one wins, as it does across a spaced name.
      if (!a && head && head.length > 5) { const parts = Object.keys(ANATOMY).filter((k) => k.length >= 4 && (head.startsWith(k) || head.endsWith(k))); const pick = parts.find((k) => head.endsWith(k)) ?? parts[0]; if (pick) a = ANATOMY[pick]; }
      if (!a) { // a generic strike noun last ("Stooping Talon Strike"): the anatomy word inside the name still owns the TYPE, never the rename (the critic's fourth read, rerun)
        const inner = words.find((w) => ANATOMY[w] && ANATOMY[w][0] === 'melee');
        if (inner && /^(?:strike|swipe|slash|blow|rake|lash|smash|swing|snap|rend|chop|cut)$/.test(head) && kind === 'melee') {
          const want = ANATOMY[inner][1];
          const m2 = /\d+ \(\d+d\d+(?:\s*\+\s*\d+)?\) (Bludgeoning|Piercing|Slashing) damage/.exec(text);
          if (want && m2 && m2[1] !== want) { e.text = text.replace(m2[0], m2[0].replace(m2[1], want)); changes.push({ from: e.name, to: e.name, why: `${inner} deals ${want}, not ${m2[1]}` }); }
        }
        continue;
      }
      if (a[0] !== kind && a[2] === 'type') continue; // a type-only noun says nothing about the row's mode
      if (a[0] !== kind) {
        const to = kind === 'ranged' ? proj : 'Slam';
        changes.push({ from: e.name, to, why: `${head} is a ${a[0]} noun on a ${kind} row` });
        e.name = to;
        if (kind === 'melee') { // the renamed row deals the slam's type (print's Javelin became a Piercing Slam on the Ogre — canaries 2026-10-12)
          const m = /\d+ \(\d+d\d+(?:\s*\+\s*\d+)?\) (Bludgeoning|Piercing|Slashing) damage/.exec(text);
          if (m && m[1] !== 'Bludgeoning') { e.text = text.replace(m[0], m[0].replace(m[1], 'Bludgeoning')); changes.push({ from: to, to, why: `a slam deals Bludgeoning, not ${m[1]}` }); }
        }
        continue;
      }
      if (kind === 'melee' && a[1]) {
        const m = /\d+ \(\d+d\d+(?:\s*\+\s*\d+)?\) (Bludgeoning|Piercing|Slashing) damage/.exec(text); // a PHYSICAL type the anatomy contradicts; a deliberate energy (the wisp queen's Necrotic claw, the Unicorn's Radiant Horn, the Pit Fiend's Necrotic Devilish Claw) stands — an unwarranted energy is the withhold's job
        if (m && m[1] !== a[1]) { e.text = text.replace(m[0], m[0].replace(m[1], a[1])); changes.push({ from: e.name, to: e.name, why: `${head} deals ${a[1]}, not ${m[1]}` }); }
      }
    }
  }
  return changes;
}

const FLAMMABLE = ['wax', 'tallow', 'straw', 'paper', 'parchment', 'oil', 'pitch', 'hay', 'cloth', 'linen', 'kindling', 'lamp-oil', 'tinder', 'rag', 'rags'];
// MATERIAL AFFINITY (critic, fresh ten): a body's material names its weakness —
// read from the CONCEPT's own words as well as the model's material field; a
// glass ox is never immune to Thunder, a hay scarecrow never resists Fire
export const MATERIAL_VULN = { glass: 'Thunder', crystal: 'Thunder', porcelain: 'Bludgeoning', ice: 'Fire', frost: 'Fire', snow: 'Fire', wax: 'Fire', tallow: 'Fire', straw: 'Fire', hay: 'Fire', paper: 'Fire', parchment: 'Fire', oil: 'Fire', 'lamp-oil': 'Fire', pitch: 'Fire', cloth: 'Fire', rags: 'Fire', tinder: 'Fire', kindling: 'Fire' };
export function materialVulnerability(conceptText, material) {
  const words = `${conceptText ?? ''} ${material ?? ''}`.toLowerCase();
  for (const [m, v] of Object.entries(MATERIAL_VULN)) if (new RegExp(`\\b${m}\\b(?!-)`).test(words)) return { material: m, vulnerability: v }; // "glass-eyed" describes an eye, not a body (the lamplighter's Thunder vulnerability — critic's audit 2026-10-02)
  return null;
}
/** A body of a flammable material is vulnerable to Fire and never resistant to it. */
export function honestFireDefenses(monster, { material = null, concept = '' } = {}) {
  const hit = materialVulnerability(concept, material) ?? (FLAMMABLE.includes(String(material ?? '').toLowerCase()) ? { material, vulnerability: 'Fire' } : null);
  if (!hit) return null;
  const V = hit.vulnerability;
  const strip = (line) => String(line ?? '').split(/,\s*/).filter((r) => r && !new RegExp(`^${V}$`, 'i').test(r)).join(', ') || undefined;
  monster.resistances = strip(monster.resistances); monster.immunities = monster.immunities ? strip(monster.immunities) : monster.immunities;
  const vul = String(monster.vulnerabilities ?? '').split(/,\s*/).filter(Boolean);
  if (!vul.some((v) => new RegExp(`^${V}$`, 'i').test(v))) vul.push(V);
  monster.vulnerabilities = vul.join(', ');
  // an absorption trait of the same type is the same contradiction
  for (const es of Object.values(monster.sections ?? {})) for (let i = es.length - 1; i >= 0; i -= 1) if (new RegExp(`subjected to ${V} damage, it takes no damage`, 'i').test(es[i].text ?? '')) es.splice(i, 1);
  return `a ${hit.material} body is vulnerable to ${V} and never resists, absorbs, or ignores it`;
}
