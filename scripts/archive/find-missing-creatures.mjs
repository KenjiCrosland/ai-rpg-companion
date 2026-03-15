#!/usr/bin/env node

/**
 * Compare srd-monsters.json and creature-intelligence.json
 * to find which creatures are missing tactical intelligence data.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '..', 'src', 'data');

// Read both files
const srdMonsters = JSON.parse(fs.readFileSync(path.join(dataDir, 'srd-monsters.json'), 'utf-8'));
const creatureIntelligence = JSON.parse(fs.readFileSync(path.join(dataDir, 'creature-intelligence.json'), 'utf-8'));

// Get all SRD monster names
const srdNames = srdMonsters.map(m => m.name).sort();

// Get all creature intelligence names
const intelligenceNames = Object.keys(creatureIntelligence).sort();

// Find missing creatures
const missing = srdNames.filter(name => !intelligenceNames.includes(name));

console.log(`Total SRD monsters: ${srdNames.length}`);
console.log(`Total with intelligence data: ${intelligenceNames.length}`);
console.log(`Missing: ${missing.length}`);
console.log('\nMissing creatures:');
console.log(JSON.stringify(missing, null, 2));
