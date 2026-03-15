#!/usr/bin/env node

/**
 * Convert SRD monsters JSON to the format expected by Encounter Generator
 *
 * Usage: node scripts/convert-srd-monsters.mjs [input-file] [output-file]
 *
 * Default:
 *   Input: src/data/srd-monsters-raw.json
 *   Output: src/data/srd-monsters.json
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse command line arguments
const inputFile = process.argv[2] || path.join(__dirname, '../src/data/srd-monsters-raw.json');
const outputFile = process.argv[3] || path.join(__dirname, '../src/data/srd-monsters.json');

console.log('📖 Reading SRD monsters from:', inputFile);

// Read the input file
let rawData;
try {
  const fileContent = fs.readFileSync(inputFile, 'utf8');
  rawData = JSON.parse(fileContent);
} catch (error) {
  console.error('❌ Failed to read or parse input file:', error.message);
  process.exit(1);
}

console.log('🔍 Analyzing structure...');

// Function to recursively find monster entries
function findMonsters(obj, path = '') {
  const monsters = [];

  if (typeof obj !== 'object' || obj === null) {
    return monsters;
  }

  // Check if this object looks like a monster
  if (isMonsterEntry(obj)) {
    monsters.push(obj);
    return monsters;
  }

  // Recursively search nested objects
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value !== null) {
      const found = findMonsters(value, path ? `${path}.${key}` : key);
      monsters.push(...found);
    }
  }

  return monsters;
}

// Heuristic to detect if an object is a monster entry
function isMonsterEntry(obj) {
  // Look for common monster fields
  const hasName = 'name' in obj || 'Name' in obj;
  const hasCR = 'cr' in obj || 'CR' in obj || 'challenge_rating' in obj || 'Challenge Rating' in obj;
  const hasStats = 'STR' in obj || 'str' in obj || 'Strength' in obj;

  // Must have at least name and one other monster-like field
  return hasName && (hasCR || hasStats);
}

// Extract relevant fields from a monster object
function normalizeMonster(rawMonster) {
  // Helper to find a field case-insensitively
  function findField(obj, ...names) {
    for (const name of names) {
      const key = Object.keys(obj).find(k => k.toLowerCase() === name.toLowerCase());
      if (key && obj[key]) return obj[key];
    }
    return undefined;
  }

  // Extract name
  const name = findField(rawMonster, 'name', 'monster_name');
  if (!name) {
    console.warn('⚠️  Skipping monster without name:', JSON.stringify(rawMonster).substring(0, 100));
    return null;
  }

  // Extract CR (handle various formats)
  let cr = findField(rawMonster, 'cr', 'challenge_rating', 'challenge rating');
  if (cr) {
    // Clean CR format (e.g., "5 (1,800 XP)" -> "5")
    const crMatch = String(cr).match(/(\d+(?:\/\d+)?)/);
    cr = crMatch ? crMatch[1] : '0';
  } else {
    cr = '0';
  }

  // Extract other fields
  const size = findField(rawMonster, 'size');
  const type = findField(rawMonster, 'type', 'creature_type', 'monster_type');
  const alignment = findField(rawMonster, 'alignment');

  // Build description from available fields
  const descriptionParts = [];
  if (size) descriptionParts.push(size);
  if (type) descriptionParts.push(type.toLowerCase());
  const description = descriptionParts.length > 0 ?
    `A ${descriptionParts.join(' ')}` :
    `CR ${cr} creature`;

  // Check if spellcaster
  const isSpellcaster = Boolean(
    findField(rawMonster, 'spellcasting', 'spells', 'innate_spellcasting')
  );

  return {
    name,
    cr,
    size: size || undefined,
    type: type || undefined,
    alignment: alignment || undefined,
    description,
    isSpellcaster,
    statblock: null, // Full statblock conversion would be more complex
  };
}

console.log('🔨 Converting monsters...');

// Find and normalize all monsters
const rawMonsters = findMonsters(rawData);
console.log(`📊 Found ${rawMonsters.length} potential monster entries`);

const normalizedMonsters = rawMonsters
  .map(normalizeMonster)
  .filter(m => m !== null); // Remove failed conversions

console.log(`✅ Successfully converted ${normalizedMonsters.length} monsters`);

// Sort by CR then name
normalizedMonsters.sort((a, b) => {
  const crA = a.cr.includes('/') ? eval(a.cr) : parseFloat(a.cr);
  const crB = b.cr.includes('/') ? eval(b.cr) : parseFloat(b.cr);

  if (crA !== crB) return crA - crB;
  return a.name.localeCompare(b.name);
});

// Write output
console.log('💾 Writing to:', outputFile);

try {
  fs.writeFileSync(outputFile, JSON.stringify(normalizedMonsters, null, 2), 'utf8');
  console.log('✨ Conversion complete!');
  console.log('');
  console.log('Sample monsters:');
  normalizedMonsters.slice(0, 5).forEach(m => {
    console.log(`  - ${m.name} (CR ${m.cr})`);
  });
} catch (error) {
  console.error('❌ Failed to write output file:', error.message);
  process.exit(1);
}

console.log('');
console.log('📁 Monster file ready at:', outputFile);
