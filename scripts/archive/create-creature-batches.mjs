#!/usr/bin/env node

/**
 * Create batch files for Opus to process missing creature intelligence data
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '..', 'src', 'data');

// Read files
const srdMonsters = JSON.parse(fs.readFileSync(path.join(dataDir, 'srd-monsters.json'), 'utf-8'));
const creatureIntelligence = JSON.parse(fs.readFileSync(path.join(dataDir, 'creature-intelligence.json'), 'utf-8'));

// Find missing creatures
const srdNames = srdMonsters.map(m => m.name).sort();
const intelligenceNames = Object.keys(creatureIntelligence).sort();
const missing = srdNames.filter(name => !intelligenceNames.includes(name));

// Create output directory
const batchDir = path.join(__dirname, '..', 'creature-intelligence-batches');
if (!fs.existsSync(batchDir)) {
  fs.mkdirSync(batchDir, { recursive: true });
}

// Instructions template
const instructions = `# Creature Intelligence Batch

## Task
Create tactical intelligence entries for the creatures listed below. Each creature should have:

1. **signature** - One sentence describing what makes this creature tactically unique
2. **abilities** - Array of the creature's key abilities with mechanical details
3. **tactical_identity** - How this creature fights and what makes it dangerous
4. **encounter_hooks** - Array of 3 encounter design implications

## Format Example

\`\`\`json
{
  "Vampire": {
    "signature": "Charm, Bite that reduces max HP and creates vampire spawn, legendary actions, Regeneration, and a suite of weaknesses — a vampire encounter is a gothic puzzle of strengths and vulnerabilities.",
    "abilities": [
      "Charm: WIS save or charmed. Charmed targets are willing allies. Can turn party members against each other.",
      "Bite: On a grappled/restrained target, massive damage + max HP reduction + heals the vampire. Bite kills create vampire spawn under its control.",
      "Legendary Actions (3/round): Move (no opportunity attacks), Unarmed Strike, Bite (costs 2). Constant pressure between party turns.",
      "Vampire Weaknesses: Forbiddance (can't enter uninvited), Harmed by Running Water, Stake to the Heart (paralyzes in resting place), Sunlight Hypersensitivity (20 radiant/round in sunlight)."
    ],
    "tactical_identity": "Charismatic predator that charms one party member, uses Legendary Actions to reposition and bite, and regenerates constantly. Fights in its lair at night where weaknesses don't apply. Retreats to its coffin if threatened.",
    "encounter_hooks": [
      "Charm can turn a party member into a temporary ally — the party fights itself before fighting the vampire",
      "vampire weaknesses create non-combat victory conditions — sunlight, running water, finding the coffin",
      "Bite kills create vampire spawn — NPCs killed by the vampire may appear as enemies in later encounters"
    ]
  }
}
\`\`\`

## Guidelines

- **signature**: Focus on the ONE thing a DM needs to know to run this creature right
- **abilities**: List only abilities that change how the DM runs combat. Include save DCs, damage, and conditions.
- **tactical_identity**: How does this creature use its abilities? What's its combat personality?
- **encounter_hooks**: Design implications - what makes this creature interesting beyond "it attacks"?

For simple creatures (beasts, commoners): Keep it brief. A wolf's tactical identity is "pack hunter that trips prone and focuses wounded targets."

For complex creatures (spellcasters, legendary): Detail matters. List key spells, legendary actions, and how they combo.

---

## Creatures to Process

`;

const batchSize = 20;
const batches = [];

for (let i = 0; i < missing.length; i += batchSize) {
  batches.push(missing.slice(i, i + batchSize));
}

console.log(`Creating ${batches.length} batch files...`);

batches.forEach((batch, index) => {
  const batchNumber = index + 1;
  const batchFileName = `batch-${String(batchNumber).padStart(2, '0')}.md`;
  const batchFilePath = path.join(batchDir, batchFileName);

  // Get full monster data for this batch
  const batchMonsters = batch.map(name => {
    return srdMonsters.find(m => m.name === name);
  }).filter(Boolean);

  // Create file content
  let content = instructions;
  content += `**Batch ${batchNumber} of ${batches.length}** (${batch.length} creatures)\n\n`;
  content += '```json\n';
  content += JSON.stringify(batchMonsters, null, 2);
  content += '\n```\n\n';
  content += '---\n\n';
  content += '## Output Format\n\n';
  content += 'Provide the result as valid JSON that can be merged into creature-intelligence.json:\n\n';
  content += '```json\n';
  content += '{\n';
  batch.forEach((name, i) => {
    content += `  "${name}": {\n`;
    content += `    "signature": "...",\n`;
    content += `    "abilities": [...],\n`;
    content += `    "tactical_identity": "...",\n`;
    content += `    "encounter_hooks": [...]\n`;
    content += `  }${i < batch.length - 1 ? ',' : ''}\n`;
  });
  content += '}\n```\n';

  fs.writeFileSync(batchFilePath, content, 'utf-8');
  console.log(`Created ${batchFileName} with ${batch.length} creatures`);
});

console.log(`\nAll batches created in: ${batchDir}`);
console.log(`Total creatures to process: ${missing.length}`);
