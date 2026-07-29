/**
 * Statblock text parser for the converter tool (owner design, 2026-07-28):
 * paste any 5e statblock, detect the edition, and build the model the
 * conversion pipeline consumes. Deterministic parsing handles clean pastes
 * (site renders, exports, typical web copies) for a FREE preview; when the
 * parse is incomplete, the metered Convert action runs an LLM normalization
 * call first (up to two calls per quota unit, the same shape as a
 * generation's resolve + main call).
 */
import { crNumberFor, crKeyFor } from '@/tools/statblock-generator/format-2024/generate.mjs';
import challengeRatings from '@/data/challengeRatings.json';

const STAT_ORDER = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];
const SIZES = ['Tiny', 'Small', 'Medium', 'Large', 'Huge', 'Gargantuan'];
const SECTION_HEADERS = ['Traits', 'Actions', 'Bonus Actions', 'Reactions', 'Legendary Actions'];
const modOf = (score) => Math.floor((score - 10) / 2);

// ---------------------------------------------------------------------------
// Edition detection
// ---------------------------------------------------------------------------
export function detectEdition(rawText) {
  const text = rawText.replace(/[\u2013\u2014\u2212]/g, '-');
  let score = 0; // positive → 2024, negative → 2014
  if (/Attack Roll:/.test(text)) score += 3;
  if (/^Initiative\s*[+-]?\d+\s*\(\d+\)/m.test(text)) score += 3;
  if (/\bMOD\b[\s\S]{0,12}\bSAVE\b/.test(text)) score += 2;
  if (/\(XP [\d,]+; PB [+-]\d+\)/.test(text)) score += 2;
  if (/^Immunities\b/m.test(text) && !/Damage Immunities/i.test(text)) score += 2;
  if (/\bSaving Throw:\s*DC \d+/.test(text)) score += 2;
  if (/\bFailure:/.test(text)) score += 1;
  // 2024 MM chrome absent from every 2014 block (corpus-checked 0 FP on 327
  // srd-monsters). Line form only — "Treasure Sense." trait names have a
  // sentence period, detail lines don't.
  if (/^Habitat\s*:?\s+[^.\n]+$/m.test(text)) score += 2;
  if (/^Treasure\s*:?\s+[^.\n]+$/m.test(text)) score += 2;
  if (/^Gear\s*:?\s+[^.\n]+$/m.test(text)) score += 2;
  if (/Trigger:/.test(text) && /Response:/.test(text)) score += 2;

  if (/to hit\b/.test(text)) score -= 3;
  if (/Weapon Attack:/.test(text)) score -= 2;
  if (/Damage Immunities|Condition Immunities|Damage Resistances/i.test(text)) score -= 2;
  if (/^Challenge\b/m.test(text)) score -= 2;
  if (/must (?:make|succeed on) a DC \d+/.test(text)) score -= 1;
  return score >= 0 ? '2024' : '2014';
}

// ---------------------------------------------------------------------------
// Deterministic parse
// ---------------------------------------------------------------------------
function matchLine(text, res) {
  for (const re of res) {
    const m = re.exec(text);
    if (m) return m;
  }
  return null;
}

function parseStats(text) {
  const stats = {};
  const saves = {};
  const compact = text.replace(/[|\t]/g, ' ');

  // Adjacent forms: "STR 22 (+6)" (2014 inline) and the 2024 grid rows
  // "STR 24 +7 +12" (score, mod, save — whitespace-joined table cells).
  for (const stat of STAT_ORDER) {
    // Case-insensitive: official 2024 copies print "Str"/"Dex".
    const grid = new RegExp(`(?<![A-Za-z])${stat}(?=[\\s\\d])\\s*(\\d{1,2})\\s*([+-]\\d+)\\s*([+-]\\d+)`, 'i').exec(compact);
    if (grid) {
      stats[stat] = Number(grid[1]);
      saves[stat] = Number(grid[3]);
      continue;
    }
    const inline = new RegExp(`(?<![A-Za-z])${stat}(?=[\\s\\d:(])\\s*:?\\s*(\\d{1,2})\\s*\\(([+-]?\\d+)\\)`, 'i').exec(compact);
    if (inline) stats[stat] = Number(inline[1]);
  }

  // Positional 2014 table: a header row of the six abbreviations, then a
  // values row of six "N (+M)" cells.
  if (Object.keys(stats).length < 6) {
    const lines = text.split('\n');
    const headerIdx = lines.findIndex((l) => {
      const toks = l.trim().split(/[\s|]+/).filter(Boolean);
      return toks.length === 6 && toks.every((t, i) => t.toUpperCase() === STAT_ORDER[i]);
    });
    if (headerIdx !== -1) {
      for (let i = headerIdx + 1; i < Math.min(headerIdx + 4, lines.length); i++) {
        const cells = [...lines[i].matchAll(/(\d{1,2})\s*\(([+-]\d+)\)/g)];
        if (cells.length === 6) {
          STAT_ORDER.forEach((stat, j) => { stats[stat] = Number(cells[j][1]); });
          break;
        }
      }
    }
  }
  return { stats, saves };
}

function detailValue(text, labels) {
  for (const label of labels) {
    const m = new RegExp(`^${label}\\s*:?\\s*(\\S.*)$`, 'mi').exec(text);
    if (m) return m[1].trim();
  }
  return undefined;
}

function splitSections(text, edition) {
  // Locate standalone section-header lines; 2014 pastes often omit the
  // Traits header, so everything between the stat/detail block and the
  // first header is treated as Traits.
  const lines = text.split('\n').map((l) => l.trim());
  const headerAt = new Map();
  lines.forEach((l, i) => {
    const name = SECTION_HEADERS.find((h) => l.toLowerCase() === h.toLowerCase());
    if (name && !headerAt.has(name)) headerAt.set(name, i);
  });

  const sections = {};
  const ordered = [...headerAt.entries()].sort((a, b) => a[1] - b[1]);
  const detailEnd = (() => {
    // Last line that looks like a labelled stat/detail line.
    let last = 0;
    lines.forEach((l, i) => {
      if (/^(CR|Challenge|Proficiency Bonus|Languages|Senses|Habitat|Treasure|Gear)\b/i.test(l)) last = i;
    });
    return last;
  })();

  const firstHeaderIdx = ordered.length ? ordered[0][1] : lines.length;
  const implicitTraits = lines.slice(detailEnd + 1, firstHeaderIdx).filter(Boolean);
  if (implicitTraits.length && !headerAt.has('Traits')) {
    const entries = parseEntries(implicitTraits);
    if (entries.length) sections.Traits = entries;
  }

  ordered.forEach(([name, start], idx) => {
    const end = idx + 1 < ordered.length ? ordered[idx + 1][1] : lines.length;
    const body = lines.slice(start + 1, end).filter(Boolean)
      // Legendary boilerplate/uses lines are structural, not entries.
      .filter((l) => !/^(?:The [\w' -]+ can take \d+ legendary actions|Legendary Action Uses:|Only one legendary action)/i.test(l));
    const entries = parseEntries(body);
    if (entries.length) sections[name] = entries;
  });
  return sections;
}

function parseEntries(lines) {
  const entries = [];
  // An entry opens with a short Title-Case name ending in "." or ":".
  // Any short parenthetical tag is allowed — official suffixes (Recharge,
  // X/Day, Costs N Actions) but also homebrew tags like "(Primary)".
  const OPEN_RE = /^([A-Z][\w'’ -]{0,60}?(?:\s*\([^)\n]{1,40}\))?)\s*[.:]\s+(\S.*)$/;
  for (const line of lines) {
    const m = OPEN_RE.exec(line);
    const nameWords = m ? m[1].replace(/\(.*\)/, '').trim().split(/\s+/) : [];
    const tierLabel = m && /^(At Will|Cantrips?|\d+\/Day(?: Each)?|Constant)$/i.test(m[1].trim());
    const looksLikeName = m && !tierLabel && nameWords.length <= 6
      && nameWords.every((w) => /^[A-Z0-9]/.test(w) || ['of', 'the', 'and', 'from', 'a', 'in'].includes(w));
    if (looksLikeName) {
      entries.push({ name: m[1].trim(), text: m[2].trim() });
    } else if (entries.length) {
      entries[entries.length - 1].text += ` ${line}`;
    }
  }
  return entries;
}

export function parseStatblockText(rawText) {
  // Real-world copies (D&D Beyond, PDFs) use en/em dashes for negative
  // modifiers and non-breaking spaces; normalize before any matching.
  const text = rawText.replace(/\r/g, '').replace(/[\u2013\u2014\u2212]/g, '-')
    .replace(/\u00a0/g, ' ')
    .replace(/\)(?=(?:AC|HP|Initiative|Speed)\b)/g, ')\n')
    .trim();
  if (!text) return { ok: false, missing: ['everything'], edition: '2024', model: null };
  const edition = detectEdition(text);
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);

  const name = lines[0] ?? '';
  const typeMatch = matchLine(text, [
    new RegExp(`^((?:${SIZES.join('|')})(?:\\s+or\\s+(?:${SIZES.join('|')}))?)\\s+([^,\\n]+?),\\s*(.+)$`, 'mi'),
  ]);
  const size = typeMatch
    ? typeMatch[1].split(/\s+/)
        .map((w) => (w.toLowerCase() === 'or' ? 'or' : w[0].toUpperCase() + w.slice(1).toLowerCase()))
        .join(' ')
    : 'Medium';
  const type = typeMatch ? typeMatch[2].trim() : '';
  const alignment = typeMatch ? typeMatch[3].trim() : 'Unaligned';

  const acMatch = matchLine(text, [/^(?:Armor Class|AC)\s*:?\s*(\d+)\s*(?:\(([^)\n]+)\))?/m]);
  const hpMatch = matchLine(text, [/^(?:Hit Points|HP)\s*:?\s*(\d+)\s*(?:\(([^)\n]+)\))?/m]);
  const speed = detailValue(text, ['Speed']);
  const initMatch = /^Initiative\s*([+-]?\d+)\s*\((\d+)\)/m.exec(text);

  const { stats, saves } = parseStats(text);
  const savesLine = detailValue(text, ['Saving Throws']);
  if (savesLine && !Object.keys(saves).length) {
    for (const m of savesLine.matchAll(/\b(STR|DEX|CON|INT|WIS|CHA)\b\s*([+-]\d+)/gi)) {
      saves[m[1].toUpperCase()] = Number(m[2]);
    }
  }

  const crMatch = matchLine(text, [/^(?:CR|Challenge)\s*:?\s*([\d/]+)\s*(?:\(([^)\n]*)\))?/m]);
  const crToken = crMatch?.[1] ?? null;
  const cr = crToken ? crNumberFor(crToken) : null;
  const pbMatch = /(?:Proficiency Bonus\s*:?\s*|PB\s+)\+(\d+)/.exec(text);
  const pb = pbMatch ? Number(pbMatch[1]) : (cr != null ? (challengeRatings[crKeyFor(cr)]?.proficiency_bonus ?? 2) : 2);

  const sections = splitSections(text, edition);

  const missing = [];
  if (!name) missing.push('name');
  if (!acMatch) missing.push('AC');
  if (!hpMatch) missing.push('HP');
  if (Object.keys(stats).length < 6) missing.push('ability scores');
  if (cr == null) missing.push('CR');
  if (!Object.values(sections).flat().length) missing.push('abilities/actions');

  const base = {
    name, size, type, alignment,
    ac: acMatch ? Number(acMatch[1]) : null,
    ac_note: acMatch?.[2],
    hp: hpMatch ? Number(hpMatch[1]) : null,
    hp_formula: hpMatch?.[2],
    speed, stats, saves,
    initiative_bonus: initMatch ? Number(initMatch[1]) : (stats.DEX != null ? modOf(stats.DEX) : 0),
    initiative_score: initMatch ? Number(initMatch[2]) : undefined,
    skills: detailValue(text, ['Skills']),
    senses: detailValue(text, ['Senses']),
    languages: detailValue(text, ['Languages']),
    gear: detailValue(text, ['Gear']),
    cr, cr_str: crToken ?? undefined, pb,
    crParen: crMatch?.[2],
    saving_throws_line: savesLine,
    damage_resistances: detailValue(text, ['Damage Resistances']),
    damage_immunities: detailValue(text, ['Damage Immunities']),
    damage_vulnerabilities: detailValue(text, ['Damage Vulnerabilities']),
    condition_immunities: detailValue(text, ['Condition Immunities']),
    resistances_2024: detailValue(text, ['Resistances']),
    immunities_2024: detailValue(text, ['Immunities']),
    vulnerabilities_2024: detailValue(text, ['Vulnerabilities']),
    sections,
  };

  return {
    ok: missing.length === 0,
    missing,
    edition,
    model: edition === '2024' ? to2024Model(base) : to2014Legacy(base),
  };
}

function xpFor(cr, crParen) {
  const fromParen = /XP\s*:?\s*(\d[\d,. ]*)|(\d[\d,. ]*)\s*XP/.exec(crParen ?? '');
  if (fromParen) return Number((fromParen[1] ?? fromParen[2]).replace(/\D/g, ''));
  return challengeRatings[crKeyFor(cr ?? 0)]?.XP ?? 0;
}

function to2024Model(p) {
  const xp = xpFor(p.cr, p.crParen);
  // 2014-labelled defense lines fold into the merged 2024 fields when the
  // paste mixed dialects.
  const immunities = p.immunities_2024
    ?? [p.damage_immunities, p.condition_immunities].filter(Boolean).join('; ');
  const model = {
    name: p.name, size: p.size, type: p.type, alignment: p.alignment,
    ac: p.ac, hp: p.hp, hp_formula: p.hp_formula, speed: p.speed,
    stats: p.stats,
    saves: Object.fromEntries(STAT_ORDER.map((s) => [s, p.saves[s] ?? modOf(p.stats[s] ?? 10)])),
    initiative_bonus: p.initiative_bonus,
    initiative_score: p.initiative_score ?? 10 + p.initiative_bonus,
    cr: p.cr, cr_str: p.cr_str ?? String(p.cr), pb: p.pb, xp,
    challenge_rating: `${p.cr_str ?? p.cr} (XP ${xp.toLocaleString('en-US')}; PB +${p.pb})`,
    format: '2024',
    sections: p.sections,
  };
  if (p.ac_note) model.ac_note = p.ac_note;
  if (p.skills) model.skills = p.skills;
  if (p.senses) model.senses = p.senses;
  if (p.languages) model.languages = p.languages;
  if (p.gear) model.gear = p.gear;
  const resistances = p.resistances_2024 ?? p.damage_resistances;
  if (resistances) model.resistances = resistances;
  if (immunities) model.immunities = immunities;
  const vulnerabilities = p.vulnerabilities_2024 ?? p.damage_vulnerabilities;
  if (vulnerabilities) model.vulnerabilities = vulnerabilities;
  return model;
}

function to2014Legacy(p) {
  const xp = xpFor(p.cr, p.crParen);
  const attributes = STAT_ORDER
    .map((s) => `${s} ${p.stats[s] ?? 10} (${modOf(p.stats[s] ?? 10) >= 0 ? '+' : ''}${modOf(p.stats[s] ?? 10)})`)
    .join(', ');
  const sectionArr = (name) => (p.sections[name] ?? []).map((e) => ({ name: e.name, description: e.text }));
  const legacy = {
    name: p.name,
    type_and_alignment: `${p.size} ${p.type.toLowerCase()}, ${p.alignment.toLowerCase()}`,
    armor_class: p.ac_note ? `${p.ac} (${p.ac_note})` : String(p.ac),
    hit_points: p.hp_formula ? `${p.hp} (${p.hp_formula})` : String(p.hp),
    speed: p.speed ?? '30 ft.',
    attributes,
    saving_throws: p.saving_throws_line ?? '',
    skills: p.skills ?? '',
    damage_resistances: p.damage_resistances ?? p.resistances_2024 ?? '',
    damage_immunities: p.damage_immunities ?? '',
    damage_vulnerabilities: p.damage_vulnerabilities ?? '',
    condition_immunities: p.condition_immunities ?? '',
    senses: p.senses ?? '',
    languages: p.languages ?? '—',
    challenge_rating: `${p.cr_str ?? p.cr} (${xp.toLocaleString('en-US')} XP)`,
    proficiency_bonus: `+${p.pb}`,
    abilities: [
      ...sectionArr('Traits'),
      ...(p.sections['Bonus Actions'] ?? []).map((e) => ({ name: `${e.name} (Bonus Action)`, description: e.text })),
      ...(p.sections.Reactions ?? []).map((e) => ({ name: `${e.name} (Reaction)`, description: e.text })),
    ],
    actions: sectionArr('Actions'),
    legendary_actions: (p.sections['Legendary Actions'] ?? []).map((e) => ({ name: e.name, description: e.text })),
    format: '2014',
  };
  if (!legacy.legendary_actions.length) delete legacy.legendary_actions;
  return legacy;
}

// ---------------------------------------------------------------------------
// LLM normalization (fallback for messy pastes; runs inside the metered
// Convert action, never on the free preview)
// ---------------------------------------------------------------------------
export function buildStatblockParsePrompt(text, edition) {
  return `Parse this D&D 5e monster statblock text into JSON. Preserve every number, die expression, and ability text VERBATIM — never invent, omit, or rewrite content. The block uses the ${edition} rules layout.

STATBLOCK TEXT:
${text}

Return ONLY a JSON object, no markdown fences:
{
  "name": "...", "size": "Tiny|Small|Medium|Large|Huge|Gargantuan", "type": "...", "alignment": "...",
  "ac": <number>, "ac_note": "optional", "hp": <number>, "hp_formula": "e.g. 14d10 + 28",
  "speed": "...", "stats": {"STR": n, "DEX": n, "CON": n, "INT": n, "WIS": n, "CHA": n},
  "save_bonuses": {"STR": n, ...} (total save bonuses actually printed; omit abilities with no listed save),
  "skills": "optional", "resistances": "optional", "immunities": "optional (damage; conditions merged with a semicolon)",
  "damage_resistances": "optional (2014 label)", "damage_immunities": "optional (2014 label)", "condition_immunities": "optional (2014 label)",
  "senses": "optional", "languages": "optional", "cr": "the CR token, e.g. 5 or 1/2", "pb": <number>,
  "sections": {"Traits": [{"name": "...", "text": "..."}], "Actions": [...], "Bonus Actions": [...], "Reactions": [...], "Legendary Actions": [...]}
}`;
}

export function validateParsedStatblock(jsonString) {
  try {
    const p = JSON.parse(jsonString.replace(/^\s*```(?:json)?\s*/i, '').replace(/\s*```\s*$/, ''));
    return !!p && typeof p.name === 'string' && p.name.trim() !== ''
      && typeof p.ac === 'number' && typeof p.hp === 'number'
      && p.stats && STAT_ORDER.every((s) => typeof p.stats[s] === 'number')
      && p.sections && Object.values(p.sections).some((arr) => Array.isArray(arr) && arr.length);
  } catch {
    return false;
  }
}

/** Build the edition model from a validated LLM parse response. */
export function modelFromLLMParse(jsonString, edition) {
  const p = JSON.parse(jsonString.replace(/^\s*```(?:json)?\s*/i, '').replace(/\s*```\s*$/, ''));
  const saves = {};
  for (const s of STAT_ORDER) {
    if (p.save_bonuses && typeof p.save_bonuses[s] === 'number') saves[s] = p.save_bonuses[s];
  }
  const base = {
    name: p.name, size: p.size ?? 'Medium', type: p.type ?? 'Monstrosity',
    alignment: p.alignment ?? 'Unaligned',
    ac: p.ac, ac_note: p.ac_note, hp: p.hp, hp_formula: p.hp_formula,
    speed: p.speed, stats: p.stats, saves,
    initiative_bonus: modOf(p.stats.DEX ?? 10), initiative_score: undefined,
    skills: p.skills, senses: p.senses, languages: p.languages, gear: p.gear,
    cr: crNumberFor(String(p.cr ?? '1')), cr_str: String(p.cr ?? '1'),
    pb: typeof p.pb === 'number' ? p.pb : 2, crParen: undefined,
    saving_throws_line: undefined,
    damage_resistances: p.damage_resistances,
    damage_immunities: p.damage_immunities,
    damage_vulnerabilities: p.damage_vulnerabilities,
    condition_immunities: p.condition_immunities,
    resistances_2024: p.resistances,
    immunities_2024: p.immunities,
    vulnerabilities_2024: p.vulnerabilities,
    sections: p.sections ?? {},
  };
  if (edition === '2014' && !base.saving_throws_line && Object.keys(saves).length) {
    base.saving_throws_line = Object.entries(saves).map(([s, v]) => `${s} ${v >= 0 ? '+' : ''}${v}`).join(', ');
  }
  return edition === '2024' ? to2024Model(base) : to2014Legacy(base);
}
