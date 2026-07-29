/**
 * 2024 statblock renderer (build-order step 3 of docs/2024-architecture.md).
 *
 * JSON block model → 2024-format markdown. The model shape is the one used by
 * src/data/srd52-monsters.json — generated monsters (step 5) emit the same
 * shape, which is why the snapshot tests render SRD entries: they validate the
 * exact output format of the generation pipeline.
 *
 * Lives in format-2024/ (not chassis/) because rendering is edition-specific
 * while the chassis/slot-plan math is edition-agnostic; the step-4 lint module
 * joins it here. Output is Homebrewery-compatible markdown following the
 * contract's 2024 conventions (ability table with save column, combined
 * AC/Initiative line, `CR 10 (XP 5,900; PB +4)`).
 */

const STAT_ORDER = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];

// Canonical 2024 section order — rendered in this order regardless of the
// model's object key order.
const SECTION_ORDER = ['Traits', 'Actions', 'Bonus Actions', 'Reactions', 'Legendary Actions'];

// 2024 detail-line order between the ability table and the sections.
const DETAIL_LINES = [
  ['skills', 'Skills'],
  ['vulnerabilities', 'Vulnerabilities'],
  ['resistances', 'Resistances'],
  ['immunities', 'Immunities'],
  ['gear', 'Gear'],
  ['senses', 'Senses'],
  ['languages', 'Languages'],
];

const signed = (n) => (n >= 0 ? `+${n}` : `${n}`);
const modOf = (score) => Math.floor((score - 10) / 2);

function assertRenderable(monster) {
  if (!monster || typeof monster !== 'object') {
    throw new TypeError('renderStatblock2024 expects a statblock model object');
  }
  const missing = ['name', 'stats', 'cr', 'hp', 'ac'].filter((f) => monster[f] == null);
  const incompleteStats =
    monster.stats && STAT_ORDER.some((s) => typeof monster.stats[s] !== 'number');
  if (missing.length || incompleteStats) {
    throw new TypeError(
      `Statblock model is missing required fields: ${[
        ...missing,
        ...(incompleteStats ? ['stats (all six abilities)'] : []),
      ].join(', ')}`
    );
  }
}

function abilityTable(monster) {
  const rows = STAT_ORDER.map((stat) => {
    const score = monster.stats[stat];
    const mod = modOf(score);
    const save = monster.saves?.[stat] ?? mod; // no proficient save → save = mod
    return `| ${stat} | ${score} | ${signed(mod)} | ${signed(save)} |`;
  });
  return ['| Stat | Score | Mod | Save |', '|:---:|:---:|:---:|:---:|', ...rows].join('\n');
}

function crLine(monster) {
  const cr = monster.cr_str ?? String(monster.cr);
  const xp = (monster.xp ?? 0).toLocaleString('en-US');
  const pb = monster.pb ?? 2;
  return `**CR** ${cr} (XP ${xp}; PB ${signed(pb)})`;
}

export function renderStatblock2024(monster) {
  assertRenderable(monster);

  const lines = [];
  lines.push(`## ${monster.name}`);

  const subtype = monster.subtype ? ` (${monster.subtype})` : '';
  const subtitle = [`${monster.size ?? ''} ${monster.type ?? ''}${subtype}`.trim(), monster.alignment]
    .filter(Boolean)
    .join(', ');
  if (subtitle) lines.push(`*${subtitle}*`);
  lines.push('');

  // 2024 convention: AC and Initiative share a line; initiative shows bonus
  // plus passive score. Defaults derive from DEX for generated blocks.
  const initBonus = monster.initiative_bonus ?? modOf(monster.stats.DEX);
  const initScore = monster.initiative_score ?? 10 + initBonus;
  lines.push(`**AC** ${monster.ac} &nbsp;&nbsp; **Initiative** ${signed(initBonus)} (${initScore})`);
  lines.push(monster.hp_formula ? `**HP** ${monster.hp} (${monster.hp_formula})` : `**HP** ${monster.hp}`);
  if (monster.speed) lines.push(`**Speed** ${monster.speed}`);
  lines.push('');

  lines.push(abilityTable(monster));
  lines.push('');

  for (const [field, label] of DETAIL_LINES) {
    if (monster[field]) lines.push(`**${label}** ${monster[field]}`);
  }
  lines.push(crLine(monster));

  for (const section of SECTION_ORDER) {
    const entries = monster.sections?.[section];
    if (!entries?.length) continue;
    lines.push('');
    lines.push(`### ${section}`);
    if (section === 'Legendary Actions' && monster.legendary_uses) {
      lines.push('');
      lines.push(
        `*Legendary Action Uses: ${monster.legendary_uses}. Immediately after another creature's turn, it can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.*`
      );
    }
    for (const { name, text } of entries) {
      lines.push('');
      lines.push(`***${name}.*** ${text}`);
    }
  }

  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Homebrewery v3 monster-frame renderer (2024 layout)
// ---------------------------------------------------------------------------
// Matches Homebrewery's official 2024-style example: {{monster,frame ...}},
// "::" definition-list stat lines, the three-group MOD/SAVE ability table
// (Str/Dex/Con over Int/Wis/Cha, Title-case abbreviations, negative numbers
// written "--1" per the example), and a {{legend ...}} block for the
// legendary-uses intro. The plain renderStatblock2024 stays for plain-text
// and HTML surfaces that strip markup.

const hbSigned = (n) => (n >= 0 ? `+${n}` : `--${Math.abs(n)}`);

function hbAbilityTable(monster) {
  const cell = (stat) => {
    const score = monster.stats[stat];
    const mod = modOf(score);
    const save = monster.saves?.[stat] ?? mod;
    const abbr = stat.charAt(0) + stat.slice(1).toLowerCase();
    return `|${abbr}| ${score}| ${hbSigned(mod)} | ${hbSigned(save)} `;
  };
  const row = (stats) => stats.map(cell).join('') + '|';
  return [
    '|   |   | MOD | SAVE |   |   | MOD | SAVE |   |   | MOD | SAVE |',
    '|:--|:-:|:---:|:----:|:--|:-:|:---:|:----:|:--|:-:|:---:|:----:|',
    row(['STR', 'DEX', 'CON']),
    row(['INT', 'WIS', 'CHA']),
  ].join('\n');
}

export function renderStatblock2024Homebrewery(monster) {
  assertRenderable(monster);
  const pad = (label) => `**${label}**`.padEnd(15) + '::';

  const lines = [];
  lines.push('{{monster,frame');
  lines.push(`## ${monster.name}`);
  const subtype = monster.subtype ? ` (${monster.subtype})` : '';
  const subtitle = [`${monster.size ?? ''} ${monster.type ?? ''}${subtype}`.trim(), monster.alignment]
    .filter(Boolean)
    .join(', ');
  if (subtitle) lines.push(`*${subtitle}*`);
  lines.push('');

  const acNote = monster.ac_note ? ` (${monster.ac_note})` : '';
  lines.push(`${pad('AC')} ${monster.ac}${acNote}`);
  lines.push(`${pad('HP')} ${monster.hp_formula ? `${monster.hp} (${monster.hp_formula})` : monster.hp}`);
  if (monster.speed) lines.push(`${pad('Speed')} ${monster.speed}`);
  lines.push('');
  const initBonus = monster.initiative_bonus ?? modOf(monster.stats.DEX);
  const initScore = monster.initiative_score ?? 10 + initBonus;
  lines.push(`${pad('Initiative')} ${initBonus >= 0 ? `+${initBonus}` : initBonus} (${initScore})`);
  lines.push('');

  lines.push(hbAbilityTable(monster));
  lines.push('');

  for (const [field, label] of DETAIL_LINES) {
    if (monster[field]) lines.push(`${pad(label)} ${monster[field]}`);
  }
  const cr = monster.cr_str ?? String(monster.cr);
  const xp = (monster.xp ?? 0).toLocaleString('en-US');
  lines.push(`${pad('CR')} ${cr} (XP ${xp}; PB ${signed(monster.pb ?? 2)})`);

  for (const section of SECTION_ORDER) {
    const entries = monster.sections?.[section];
    if (!entries?.length) continue;
    lines.push('');
    lines.push(`### ${section}`);
    if (section === 'Legendary Actions' && monster.legendary_uses) {
      lines.push(`{{legend Legendary Action Uses: ${monster.legendary_uses}. Immediately after another creature's turn, it can expend a use to take one of the following actions. It regains all expended uses at the start of each of its turns.}}`);
    }
    for (const entry of entries) {
      lines.push('');
      const name = /[.!?]$/.test(entry.name) ? entry.name : `${entry.name}.`;
      lines.push(`***${name}*** ${entry.text}`);
    }
  }
  lines.push('}}');
  return lines.join('\n');
}
