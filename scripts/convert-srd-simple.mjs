#!/usr/bin/env node

/**
 * Simple text-based SRD monster extractor
 * Looks for monster patterns without parsing the whole structure
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

console.log('🔍 Extracting monsters using pattern matching...');

const monsters = [];
const lines = content.split('\n');

let currentMonster = null;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  // Look for monster stat line: "*Size type, alignment*"
  const statMatch = line.match(/\*([^*,]+),\s*([^*]+)\*/);
  if (statMatch && statMatch[1].trim().split(' ').length >= 2) {
    const [_, sizeAndType, alignment] = statMatch;
    const words = sizeAndType.trim().split(' ');
    const size = words[0];
    const type = words.slice(1).join(' ');

    // Look backwards for the monster name (should be on a previous line)
    let name = 'Unknown';
    for (let j = i - 1; j >= Math.max(0, i - 10); j--) {
      const prevLine = lines[j].trim();
      // Monster name is usually a simple key like "Aboleth:" or "Adult Black Dragon:"
      if (prevLine.match(/^[A-Z][^:]*:\s*{?\s*$/)) {
        name = prevLine.replace(/:.*$/, '').trim();
        break;
      }
    }

    // Look forward for CR (within next 50 lines, Challenge comes after stats)
    let cr = '0';
    for (let j = i + 1; j < Math.min(lines.length, i + 50); j++) {
      const nextLine = lines[j];
      // Match both formats: "**Challenge** 10" or "Challenge 10"
      const crMatch = nextLine.match(/[*"]*Challenge[*"]*[:\s]+(\d+(?:\/\d+)?)/i);
      if (crMatch) {
        cr = crMatch[1];
        break;
      }
    }

    // Check for spellcasting (within next 30 lines)
    let isSpellcaster = false;
    for (let j = i; j < Math.min(lines.length, i + 30); j++) {
      if (lines[j].toLowerCase().includes('spellcasting')) {
        isSpellcaster = true;
        break;
      }
    }

    // Create description
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

// Remove duplicates (by name)
const uniqueMonsters = [];
const seen = new Set();
for (const monster of monsters) {
  if (!seen.has(monster.name)) {
    seen.add(monster.name);
    uniqueMonsters.push(monster);
  }
}

console.log(`📊 Unique monsters: ${uniqueMonsters.length}`);

// Sort by CR then name
uniqueMonsters.sort((a, b) => {
  const crA = a.cr.includes('/') ? eval(a.cr) : parseFloat(a.cr);
  const crB = b.cr.includes('/') ? eval(b.cr) : parseFloat(b.cr);

  if (crA !== crB) return crA - crB;
  return a.name.localeCompare(b.name);
});

// Write output
console.log('💾 Writing to:', outputFile);
fs.writeFileSync(outputFile, JSON.stringify(uniqueMonsters, null, 2), 'utf8');

console.log('✨ Conversion complete!');
console.log('');
console.log('Sample monsters:');
uniqueMonsters.slice(0, 15).forEach(m => {
  console.log(`  - ${m.name} (CR ${m.cr})`);
});

console.log('');
console.log('✅ Ready to use in Encounter Generator!');
