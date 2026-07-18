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
    for (const { name, text } of entries) {
      lines.push('');
      lines.push(`***${name}.*** ${text}`);
    }
  }

  return lines.join('\n');
}
