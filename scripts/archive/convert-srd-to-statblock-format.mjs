#!/usr/bin/env node

/**
 * Convert srd-alt.json monsters to statblock format
 * This makes SRD monsters compatible with the Statblock component
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputFile = path.join(__dirname, '../src/data/srd-alt.json');
const outputFile = path.join(__dirname, '../src/data/srd-monsters-statblocks.json');

console.log('📖 Reading srd-alt.json...');
const rawData = JSON.parse(fs.readFileSync(inputFile, 'utf8'));

console.log(`✅ Found ${rawData.length} monsters`);
console.log('🔄 Converting to statblock format...');

/**
 * Parse HTML abilities/actions to structured array
 * Extracts ability names and descriptions from HTML paragraphs
 * Handles multi-paragraph abilities like Spellcasting
 */
function parseHTMLAbilities(htmlString) {
  if (!htmlString) return [];

  const abilities = [];

  // Split into paragraph tags
  const paragraphs = htmlString.split(/<\/?p>/g).filter(p => p.trim());

  let currentAbility = null;

  for (const para of paragraphs) {
    // Check if this paragraph starts a new ability (has <em><strong>Name.</strong></em>)
    const abilityMatch = para.match(/<em><strong>(.*?)<\/strong><\/em>\s*(.*)/);

    if (abilityMatch) {
      // Save previous ability if exists
      if (currentAbility) {
        abilities.push(currentAbility);
      }

      // Start new ability
      const name = abilityMatch[1].replace(/\.$/, ''); // Remove trailing period
      const description = abilityMatch[2]
        .replace(/<em>/g, '*').replace(/<\/em>/g, '*')
        .replace(/<strong>/g, '**').replace(/<\/strong>/g, '**')
        .trim();

      currentAbility = {
        name: name.trim(),
        description: description
      };
    } else if (currentAbility && para.trim()) {
      // This is a continuation paragraph - add to current ability description
      const additionalText = para
        .replace(/<em>/g, '*').replace(/<\/em>/g, '*')
        .replace(/<strong>/g, '**').replace(/<\/strong>/g, '**')
        .trim();

      if (additionalText) {
        currentAbility.description += '\n\n' + additionalText;
      }
    }
  }

  // Don't forget the last ability
  if (currentAbility) {
    abilities.push(currentAbility);
  }

  return abilities;
}

/**
 * Calculate proficiency bonus from CR
 */
function getProficiencyBonus(cr) {
  const crMatch = cr.match(/^([\d/]+)/);
  if (!crMatch) return '+2';

  const crString = crMatch[1];
  let crNum;

  if (crString.includes('/')) {
    const [num, denom] = crString.split('/').map(Number);
    crNum = num / denom;
  } else {
    crNum = parseFloat(crString);
  }

  if (crNum <= 4) return '+2';
  if (crNum <= 8) return '+3';
  if (crNum <= 12) return '+4';
  if (crNum <= 16) return '+5';
  if (crNum <= 20) return '+6';
  if (crNum <= 24) return '+7';
  if (crNum <= 28) return '+8';
  return '+9';
}

const convertedMonsters = rawData.map(monster => {
  // Parse numeric attribute values
  const str = parseInt(monster.STR);
  const dex = parseInt(monster.DEX);
  const con = parseInt(monster.CON);
  const int = parseInt(monster.INT);
  const wis = parseInt(monster.WIS);
  const cha = parseInt(monster.CHA);

  // Create attributes string in the format expected by Statblock component
  const attributes = `STR ${str}, DEX ${dex}, CON ${con}, INT ${int}, WIS ${wis}, CHA ${cha}`;

  return {
    name: monster.name,
    type_and_alignment: monster.meta,
    armor_class: monster['Armor Class'],
    hit_points: monster['Hit Points'],
    speed: monster.Speed,

    // Individual attributes (for compatibility)
    str,
    dex,
    con,
    int,
    wis,
    cha,

    // Attributes string (required by Statblock component)
    attributes,

    // Optional fields (only include if present)
    saving_throws: monster['Saving Throws'] || '',
    skills: monster.Skills || '',
    damage_vulnerabilities: monster['Damage Vulnerabilities'] || '',
    damage_resistances: monster['Damage Resistances'] || '',
    damage_immunities: monster['Damage Immunities'] || '',
    condition_immunities: monster['Condition Immunities'] || '',
    senses: monster.Senses || '',
    languages: monster.Languages || '',

    challenge_rating: monster.Challenge.match(/^([\d/]+)/)[1],
    proficiency_bonus: getProficiencyBonus(monster.Challenge),

    // Parse abilities, actions, and legendary actions from HTML
    abilities: parseHTMLAbilities(monster.Traits),
    actions: parseHTMLAbilities(monster.Actions),
    legendary_actions: parseHTMLAbilities(monster['Legendary Actions']),

    // Additional metadata
    img_url: monster.img_url || null,
  };
});

console.log('💾 Writing to:', outputFile);
fs.writeFileSync(outputFile, JSON.stringify(convertedMonsters, null, 2), 'utf8');

console.log('✨ Conversion complete!');
console.log('');
console.log(`📊 Total: ${convertedMonsters.length} monsters converted`);
console.log('');
console.log('Sample monster (Aboleth):');
const sample = convertedMonsters.find(m => m.name === 'Aboleth');
if (sample) {
  console.log('  Name:', sample.name);
  console.log('  Type:', sample.type_and_alignment);
  console.log('  CR:', sample.challenge_rating);
  console.log('  Abilities:', sample.abilities.length);
  console.log('  Actions:', sample.actions.length);
  console.log('  Legendary Actions:', sample.legendary_actions.length);
}
console.log('');
console.log('✅ Ready to use with Statblock component!');
