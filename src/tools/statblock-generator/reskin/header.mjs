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
    if (want.has(mode)) kept.push(p); else dropped.push(p);
  }
  for (const m of MODES) {
    if (want.has(m) && !kept.some((p) => new RegExp(`^${m}\\b`, 'i').test(p))) {
      const line = `${m[0].toUpperCase()}${m.slice(1)} ${m === 'burrow' ? Math.max(10, walkFt - 10) : walkFt} ft.`;
      kept.push(line); added.push(line);
    }
  }
  return { speed: kept.join(', '), dropped, added };
}

const PRINT_LANGUAGES = ['Common', 'Elvish', 'Dwarvish', 'Giant', 'Draconic', 'Infernal', 'Abyssal', 'Celestial', 'Sylvan', 'Undercommon', 'Deep Speech', 'Primordial', 'Aquan', 'Auran', 'Ignan', 'Terran', 'Goblin', 'Orc', 'Gnomish', 'Halfling', 'Druidic', 'Thieves\' Cant'];
/** Languages by mind, from the print set. */
export function honestLanguages(line, { mind = null, type = '' } = {}) {
  const raw = String(line ?? '').trim();
  if (mind === 'mindless') return /construct/i.test(type) ? "Understands the languages of its creator but can't speak" : 'None';
  if (mind === 'bestial') return 'None';
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
  if (!kept.length) return /undead/i.test(type) ? 'Common plus the languages it knew in life' : 'Common';
  return kept.length > 1 && kept.includes('the languages it knew in life') ? `${kept.filter((k) => k !== 'the languages it knew in life').join(', ')} plus the languages it knew in life` : kept.join(', ');
}

// anatomy and weapon nouns bind to a row kind and a physical damage type (print: 330/422 attack rows are one bare word)
export const ANATOMY = {
  bite: ['melee', 'Piercing'], fang: ['melee', 'Piercing'], fangs: ['melee', 'Piercing'], maw: ['melee', 'Piercing'], jaws: ['melee', 'Piercing'], beak: ['melee', 'Piercing'],
  claw: ['melee', 'Slashing'], claws: ['melee', 'Slashing'], talon: ['melee', 'Slashing'], talons: ['melee', 'Slashing'], rake: ['melee', 'Slashing'],
  slam: ['melee', 'Bludgeoning'], fist: ['melee', 'Bludgeoning'], fists: ['melee', 'Bludgeoning'], hoof: ['melee', 'Bludgeoning'], hooves: ['melee', 'Bludgeoning'], tail: ['melee', 'Bludgeoning'], tentacle: ['melee', 'Bludgeoning'], tentacles: ['melee', 'Bludgeoning'], pseudopod: ['melee', 'Bludgeoning'], trample: ['melee', 'Bludgeoning'],
  gore: ['melee', 'Piercing'], horn: ['melee', 'Piercing'], horns: ['melee', 'Piercing'], tusk: ['melee', 'Piercing'], tusks: ['melee', 'Piercing'], sting: ['melee', 'Piercing'], stinger: ['melee', 'Piercing'], lance: ['melee', 'Piercing'], spear: ['melee', 'Piercing'], pike: ['melee', 'Piercing'],
  rock: ['ranged', null], boulder: ['ranged', null], slab: ['ranged', null], javelin: ['ranged', 'Piercing'], bolt: ['ranged', 'Piercing'], arrow: ['ranged', 'Piercing'], dart: ['ranged', 'Piercing'], net: ['ranged', null], bomb: ['ranged', null], flask: ['ranged', null], shard: ['ranged', 'Piercing'],
};
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
      const kind = /Ranged Attack Roll/.test(text) ? 'ranged' : /Melee Attack Roll/.test(text) ? 'melee' : null;
      if (!kind) continue;
      const bare = String(e.name ?? '').replace(/ \(.*\)$/, '');
      const head = bare.toLowerCase().split(/[\s-]+/).pop();
      const a = ANATOMY[head];
      if (!a) continue;
      if (a[0] !== kind) {
        const to = kind === 'ranged' ? proj : 'Slam';
        changes.push({ from: e.name, to, why: `${head} is a ${a[0]} noun on a ${kind} row` });
        e.name = to;
        continue;
      }
      if (kind === 'melee' && a[1]) {
        const m = /\d+ \(\d+d\d+(?:\s*\+\s*\d+)?\) (Bludgeoning|Piercing|Slashing) damage/.exec(text);
        if (m && m[1] !== a[1]) { e.text = text.replace(m[0], m[0].replace(m[1], a[1])); changes.push({ from: e.name, to: e.name, why: `${head} deals ${a[1]}, not ${m[1]}` }); }
      }
    }
  }
  return changes;
}

const FLAMMABLE = ['wax', 'tallow', 'straw', 'paper', 'parchment', 'oil', 'pitch', 'hay', 'cloth', 'linen', 'kindling'];
/** A body of a flammable material is vulnerable to Fire and never resistant to it. */
export function honestFireDefenses(monster, { material = null } = {}) {
  if (!FLAMMABLE.includes(String(material ?? '').toLowerCase())) return null;
  const res = String(monster.resistances ?? '').split(/,\s*/).filter((r) => r && !/^Fire$/i.test(r));
  monster.resistances = res.join(', ') || undefined;
  const vul = String(monster.vulnerabilities ?? '').split(/,\s*/).filter(Boolean);
  if (!vul.some((v) => /^Fire$/i.test(v))) vul.push('Fire');
  monster.vulnerabilities = vul.join(', ');
  return `a ${material} body is vulnerable to Fire and never resists it`;
}
