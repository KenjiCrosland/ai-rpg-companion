#!/usr/bin/env node

/**
 * Convert srd-alt.json to our normalized monster format
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputFile = path.join(__dirname, '../src/data/srd-alt.json');
const outputFile = path.join(__dirname, '../src/data/srd-monsters.json');

console.log('📖 Reading srd-alt.json...');
const rawData = JSON.parse(fs.readFileSync(inputFile, 'utf8'));

console.log(`✅ Found ${rawData.length} monsters`);
console.log('🔄 Converting to normalized format...');

const monsters = rawData.map(monster => {
  // Parse meta field: "Large aberration, lawful evil"
  const metaParts = monster.meta.split(',');
  const sizeAndType = metaParts[0].trim().split(' ');
  const size = sizeAndType[0];
  const type = sizeAndType.slice(1).join(' ');
  const alignment = metaParts.slice(1).join(',').trim();

  // Parse Challenge: "10 (5,900 XP)" -> "10"
  const crMatch = monster.Challenge.match(/^([\d/]+)/);
  const cr = crMatch ? crMatch[1] : '0';

  // Check for spellcasting
  const isSpellcaster = (monster.Traits?.toLowerCase().includes('spellcasting') ||
                         monster.Actions?.toLowerCase().includes('spellcasting')) ?? false;

  // Create description
  const description = `A ${size.toLowerCase()} ${type.toLowerCase()}`;

  return {
    name: monster.name,
    cr,
    size,
    type,
    alignment,
    description,
    isSpellcaster,
    statblock: null,
  };
});

console.log('📊 Sorting by CR and name...');

// Helper to parse CR values safely
function parseCR(cr) {
  if (cr.includes('/')) {
    const [numerator, denominator] = cr.split('/').map(Number);
    return numerator / denominator;
  }
  return parseFloat(cr);
}

// Sort by CR then name
monsters.sort((a, b) => {
  const crA = parseCR(a.cr);
  const crB = parseCR(b.cr);

  if (crA !== crB) return crA - crB;
  return a.name.localeCompare(b.name);
});

console.log('💾 Writing to:', outputFile);
fs.writeFileSync(outputFile, JSON.stringify(monsters, null, 2), 'utf8');

console.log('✨ Conversion complete!');
console.log('');
console.log(`📊 Total: ${monsters.length} monsters`);
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
console.log('✅ Ready to use in Encounter Generator!');
