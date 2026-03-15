#!/usr/bin/env node

/**
 * Convert SRD monsters from JavaScript object notation to JSON array
 *
 * This handles the 5eTools/Open5e format where monsters are nested objects
 * with unquoted keys (JavaScript format, not pure JSON)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import JSON5 from 'json5';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputFile = path.join(__dirname, '../src/data/srd-monsters-raw.json');
const outputFile = path.join(__dirname, '../src/data/srd-monsters.json');

console.log('📖 Reading SRD monsters from:', inputFile);

// Read file using JSON5 (handles unquoted keys, trailing commas, etc.)
let rawData;
try {
  const fileContent = fs.readFileSync(inputFile, 'utf8');
  rawData = JSON5.parse(fileContent);
  console.log('✅ Successfully parsed with JSON5');
} catch (error) {
  console.error('❌ Failed to parse file:', error.message);
  console.log('💡 Tip: File should be valid JSON5/JavaScript object notation');
  process.exit(1);
}

console.log('🔍 Extracting monsters...');

const monsters = [];

// Helper to extract text from content arrays
function extractText(content) {
  if (typeof content === 'string') return content;
  if (Array.isArray(content)) {
    return content
      .filter(item => typeof item === 'string')
      .join(' ');
  }
  return '';
}

// Helper to parse stat line like "*Large aberration, lawful evil*"
function parseStatLine(text) {
  const match = text.match(/\*([^,]+),\s*([^*]+)\*/);
  if (!match) return { size: null, type: null, alignment: null };

  const [_, sizeAndType, alignment] = match;
  const words = sizeAndType.trim().split(' ');

  return {
    size: words[0] || null,
    type: words.slice(1).join(' ') || null,
    alignment: alignment.trim() || null,
  };
}

// Helper to extract CR from text like "**Challenge** 10 (5,900 XP)"
function extractCR(content) {
  const text = extractText(content);
  const match = text.match(/\*\*Challenge\*\*\s*(\d+(?:\/\d+)?)/);
  return match ? match[1] : '0';
}

// Helper to check if content has spellcasting
function hasSpellcasting(content) {
  const text = extractText(content).toLowerCase();
  return text.includes('spellcasting') || text.includes('innate spellcasting');
}

// Recursively extract monster entries
function extractMonsters(obj, parentKey = '') {
  if (!obj || typeof obj !== 'object') return;

  // Check if this looks like a monster entry
  if (obj.content && Array.isArray(obj.content)) {
    const content = obj.content;
    const firstLine = content[0];

    // Monster entries start with stat line: "*Size type, alignment*"
    if (typeof firstLine === 'string' && firstLine.startsWith('*') && firstLine.includes(',')) {
      const stats = parseStatLine(firstLine);
      const cr = extractCR(content);

      // Extract description from content
      const textContent = extractText(content);
      const descMatch = textContent.match(/\*\*[^*]+\*\*\s+([^.]+\.)/);
      const description = descMatch ? descMatch[1].trim() : `A ${stats.size || ''} ${stats.type || ''}`.trim();

      monsters.push({
        name: parentKey,
        cr,
        size: stats.size,
        type: stats.type,
        alignment: stats.alignment,
        description: description || `CR ${cr} creature`,
        isSpellcaster: hasSpellcasting(content),
        statblock: null,
      });

      return; // Don't recurse into monster content
    }
  }

  // Recurse into nested objects
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value !== null) {
      extractMonsters(value, key);
    }
  }
}

// Extract all monsters
if (rawData.Monsters) {
  extractMonsters(rawData.Monsters);
} else {
  extractMonsters(rawData);
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

try {
  fs.writeFileSync(outputFile, JSON.stringify(monsters, null, 2), 'utf8');
  console.log('✨ Conversion complete!');
  console.log('');
  console.log(`📊 Total monsters: ${monsters.length}`);
  console.log('');
  console.log('Sample monsters:');
  monsters.slice(0, 10).forEach(m => {
    console.log(`  - ${m.name} (CR ${m.cr}) - ${m.type || 'unknown type'}`);
  });
} catch (error) {
  console.error('❌ Failed to write output file:', error.message);
  process.exit(1);
}

console.log('');
console.log('✅ Ready to use in Encounter Generator!');
