#!/usr/bin/env node

/**
 * Improved SRD monster converter - detects monsters more accurately
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputFile = path.join(__dirname, '../src/data/srd-monsters-raw.json');
const outputFile = path.join(__dirname, '../src/data/srd-monsters.json');

console.log('📖 Reading file...');
const content = fs.readFileSync(inputFile, 'utf8');
const lines = content.split('\n');

console.log('🔍 Analyzing structure...');

const monsters = [];
const seenNames = new Set();

// Find all stat lines with their context
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  // Monster stat line: "*Size type, alignment*"
  const statMatch = line.match(/["\s]*\*([^*,]+),\s*([^*]+)\*[",\s]*/);

  if (statMatch) {
    const [_, sizeAndType, alignment] = statMatch;
    const words = sizeAndType.trim().split(/\s+/);

    // Must have at least size + type
    if (words.length < 2) continue;

    const size = words[0];
    const type = words.slice(1).join(' ');

    // Skip if this looks like a header or metadata
    if (size === 'Size' || type.includes('Category') || type.includes('Table')) {
      continue;
    }

    // Look backward for monster name (within 15 lines)
    let name = null;
    for (let j = i - 1; j >= Math.max(0, i - 15); j--) {
      const prevLine = lines[j].trim();

      // Monster name pattern: "Name": {  or  Name: {
      const nameMatch = prevLine.match(/^["\s]*([A-Z][^:"]*?)["\s]*:\s*\{?\s*$/);

      if (nameMatch) {
        const candidateName = nameMatch[1].trim();

        // Skip metadata sections
        if (candidateName.match(/^(Actions?|Lair|Regional|Legendary|Special|Abilities|Traits|Equipment|Languages|Senses|Skills|Size|Type|Speed|Challenge|Proficiency|Hit|Armor|Weapon|Tool|Innate|Spellcasting|Limited|Melee|Ranged)$/)) {
          continue;
        }

        // Skip if name is too long (probably a description)
        if (candidateName.length > 60) continue;

        name = candidateName;
        break;
      }
    }

    if (!name) {
      console.warn('⚠️  Could not find name for stat line at line', i, ':', line.substring(0, 60));
      continue;
    }

    // Skip duplicates
    if (seenNames.has(name)) continue;
    seenNames.add(name);

    // Look forward for CR
    let cr = '0';
    for (let j = i + 1; j < Math.min(lines.length, i + 50); j++) {
      const nextLine = lines[j];
      const crMatch = nextLine.match(/[*"]*Challenge[*"]*[:\s]+(\d+(?:\/\d+)?)/i);
      if (crMatch) {
        cr = crMatch[1];
        break;
      }
    }

    // Check for spellcasting
    let isSpellcaster = false;
    for (let j = i; j < Math.min(lines.length, i + 40); j++) {
      if (lines[j].toLowerCase().includes('spellcasting')) {
        isSpellcaster = true;
        break;
      }
    }

    const description = `A ${size.toLowerCase()} ${type.toLowerCase()}`;

    monsters.push({
      name,
      cr,
      size,
      type,
      alignment: alignment.trim(),
      description,
      isSpellcaster,
      statblock: null,
    });
  }
}

console.log(`✅ Found ${monsters.length} monsters`);

// Sort by CR then name
monsters.sort((a, b) => {
  const crA = a.cr.includes('/') ? eval(a.cr) : parseFloat(a.cr);
  const crB = b.cr.includes('/') ? eval(b.cr) : parseFloat(b.cr);

  if (crA !== crB) return crA - crB;
  return a.name.localeCompare(b.name);
});

// Write output
console.log('💾 Writing to:', outputFile);
fs.writeFileSync(outputFile, JSON.stringify(monsters, null, 2), 'utf8');

console.log('✨ Conversion complete!');
console.log('');
console.log(`📊 Total: ${monsters.length} unique monsters`);
console.log('');
console.log('First 20:');
monsters.slice(0, 20).forEach(m => {
  console.log(`  - ${m.name} (CR ${m.cr})`);
});
console.log('');
console.log('Last 10:');
monsters.slice(-10).forEach(m => {
  console.log(`  - ${m.name} (CR ${m.cr})`);
});

console.log('');
console.log('✅ Ready to use!');
