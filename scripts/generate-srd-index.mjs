#!/usr/bin/env node
/**
 * Generate a lightweight index of SRD monsters for the fuzzy search dropdown.
 * This allows fast loading of the searchable list without loading full statblocks.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRD_MONSTERS_PATH = path.join(__dirname, '../src/data/srd-monsters.json');
const SRD_INDEX_PATH = path.join(__dirname, '../src/data/srd-monsters-index.json');

// Read full SRD monsters
const srdMonsters = JSON.parse(fs.readFileSync(SRD_MONSTERS_PATH, 'utf-8'));

// Create lightweight index
const index = srdMonsters.map(monster => ({
  name: monster.name,
  cr: monster.challenge_rating || monster.cr || '?',
  type: monster.type_and_alignment?.split(',')[0]?.trim() || 'Unknown'
}));

// Write index file
fs.writeFileSync(SRD_INDEX_PATH, JSON.stringify(index, null, 2));

console.log(`✓ Generated SRD index with ${index.length} monsters`);
console.log(`  Full SRD: ${(fs.statSync(SRD_MONSTERS_PATH).size / 1024).toFixed(1)} KB`);
console.log(`  Index: ${(fs.statSync(SRD_INDEX_PATH).size / 1024).toFixed(1)} KB`);
