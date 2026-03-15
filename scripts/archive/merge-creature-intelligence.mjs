#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dataPath = join(__dirname, '../src/data/creature-intelligence.json');

// Read existing data
const existingData = JSON.parse(readFileSync(dataPath, 'utf-8'));

// New fields to merge - ADD YOUR NEXT BATCH HERE
const newData = {
  'Axe Beak': {
    preferred_tones: [
      'already_in_motion',
      'triggered_mistake',
      'interrupted_activity',
    ],
    retreat: 'Runs away at high speed across open ground.',
    social: null,
    aftermath_hooks: [
      'the axe beak was domesticated — a brand or leg band identifies its owner',
      "a flock is nearby and reacts aggressively to the party's presence",
      "the axe beak's nesting ground is on a trade route — travelers avoid this stretch",
    ],
  },
  Baboon: {
    preferred_tones: [
      'interrupted_activity',
      'triggered_mistake',
      'already_in_motion',
    ],
    retreat: 'Climbs to safety. Shrieks to summon the troop.',
    social: null,
    aftermath_hooks: [
      'the baboon stole something from the party — a small item is missing',
      "the troop is large and aggressive — they'll harass the party until it leaves their territory",
      'the baboons were raiding a camp or caravan — the owner wants them driven off',
    ],
  },
  Badger: {
    preferred_tones: ['triggered_mistake', 'quiet_tension'],
    retreat: 'Burrows underground.',
    social: null,
    aftermath_hooks: [
      "the badger's burrow destabilized a small area of ground",
      'the badger was defending a den with young',
      'the burrow entrance connects to a larger tunnel system',
    ],
  },
  Bat: {
    preferred_tones: ['triggered_mistake', 'quiet_tension'],
    retreat: 'Flies away into darkness.',
    social: null,
    aftermath_hooks: [
      'the bat was disturbed from a roost — the colony above is enormous',
      "the bat's flight path reveals an air current from a hidden passage",
      'the bat was a familiar — its wizard master is nearby',
    ],
  },
  'Blood Hawk': {
    preferred_tones: ['already_in_motion', 'triggered_mistake'],
    retreat: 'Flies away. Returns with the flock.',
    social: null,
    aftermath_hooks: [
      'the blood hawks were trained by a druid, ranger, or villain as attack animals',
      'the flock was defending a nesting cliff that overlooks something important',
      'the hawks were agitated by something in the area — a predator or magical disturbance',
    ],
  },
  Cat: {
    preferred_tones: ['quiet_tension', 'something_wrong'],
    retreat: 'Darts away and hides.',
    social: null,
    aftermath_hooks: [
      'the cat was a familiar — its wizard master felt it die or flee',
      "the cat's behavior was a clue — it was watching something or leading somewhere",
      'the cat wore a collar with a tiny engraving — it belongs to someone specific',
    ],
  },
  'Constrictor Snake': {
    preferred_tones: ['triggered_mistake', 'quiet_tension', 'hidden_predator'],
    retreat: 'Slithers into water or dense vegetation.',
    social: null,
    aftermath_hooks: [
      'the snake was constricting something when disturbed — the prey is identifiable',
      "the snake's presence near water marks a safe drinking source — or a dangerous one",
      "the snake's skin has unusual coloring — a druid or herbalist would value it",
    ],
  },
  Crab: {
    preferred_tones: ['triggered_mistake'],
    retreat: 'Scuttles into water or under rocks.',
    social: null,
    aftermath_hooks: [
      'crabs swarming something on the beach — what washed ashore matters',
      "the crab's shell has an unusual marking or color — it's been in contact with something magical",
      'the tidal pool the crab came from contains a small, hidden object',
    ],
  },
  Deer: {
    preferred_tones: ['quiet_tension', 'triggered_mistake'],
    retreat: 'Bolts instantly at any threat.',
    social: null,
    aftermath_hooks: [
      'the deer was fleeing something other than the party — it ran FROM a direction',
      'the deer is sacred to a local druid circle — harming it has consequences',
      "the deer's unusual calmness or behavior suggests fey influence or enchantment",
    ],
  },
  Eagle: {
    preferred_tones: ['quiet_tension', 'interrupted_activity'],
    retreat: 'Flies away instantly.',
    social: null,
    aftermath_hooks: [
      "the eagle's nest is at a high vantage point with a view the party needs",
      "the eagle was a druid's companion or a familiar",
      "the eagle was circling something on the ground — it spotted something the party hasn't",
    ],
  },
  Elk: {
    preferred_tones: [
      'triggered_mistake',
      'quiet_tension',
      'interrupted_activity',
    ],
    retreat: 'Gallops away through forest or plains.',
    social: null,
    aftermath_hooks: [
      'the elk herd is migrating — their path reveals seasonal information or a blocked route',
      'the elk was sacred to a local people — its antlers have ceremonial value',
      'the elk was fleeing a predator — that predator is still behind it',
    ],
  },
  'Flying Snake': {
    preferred_tones: ['triggered_mistake', 'quiet_tension'],
    retreat: 'Glides away through canopy.',
    social: null,
    aftermath_hooks: [
      'the flying snake was a familiar or trained guardian for a yuan-ti or mage',
      'the snakes nest in a specific tree that has unusual properties — fruit, sap, or magical resonance',
      "the snake's venom is mild but useful alchemically",
    ],
  },
  Frog: {
    preferred_tones: ['triggered_mistake'],
    retreat: 'Hops into water.',
    social: null,
    aftermath_hooks: [
      'the frog was polymorphed — it reverts to its true form when killed or after a time',
      "the frog's presence near water indicates the water is clean — or that something keeps it clean",
      'the frogs are abnormally numerous — something in the water is encouraging their growth',
    ],
  },
  Goat: {
    preferred_tones: ['triggered_mistake', 'interrupted_activity'],
    retreat: 'Flees uphill.',
    social: null,
    aftermath_hooks: [
      'the goat belongs to a herder who will come looking',
      "the goat's bell or brand identifies a specific settlement",
      'the goat was grazing on an unusual plant — the plant has properties worth investigating',
    ],
  },
  Hawk: {
    preferred_tones: ['quiet_tension', 'interrupted_activity'],
    retreat: 'Flies away at speed.',
    social: null,
    aftermath_hooks: [
      'the hawk was trained — jesses or a hood identify its falconer',
      'the hawk was carrying a tiny message tube',
      'the hawk was circling a specific spot — something is there',
    ],
  },
  Hyena: {
    preferred_tones: [
      'already_in_motion',
      'interrupted_activity',
      'quiet_tension',
    ],
    retreat: 'Flees when the pack is broken.',
    social: null,
    aftermath_hooks: [
      'the hyenas serve gnolls — their presence means a warband is in the area',
      'the hyenas were scavenging a recent kill — the original predator may return',
      'the pack is larger than what the party fought — more are nearby',
    ],
  },
  Jackal: {
    preferred_tones: ['quiet_tension', 'interrupted_activity'],
    retreat: 'Flees immediately. Scavenges from a safe distance.',
    social: null,
    aftermath_hooks: [
      'the jackals were scavenging something — the remains tell a story',
      'the pack follows a larger predator, feeding on its scraps — that predator is in the area',
      'jackals in unusual numbers indicate something is dying or dead nearby',
    ],
  },
  Lizard: {
    preferred_tones: ['triggered_mistake'],
    retreat: 'Darts into a crack or under a rock.',
    social: null,
    aftermath_hooks: [
      'the lizard was a familiar — its master is nearby and aware',
      'the lizard was unusually large or colored — magic or alchemical contamination',
      'the crack the lizard fled into leads to a tiny space with something hidden',
    ],
  },
  Octopus: {
    preferred_tones: ['triggered_mistake', 'quiet_tension'],
    retreat: 'Jets away in an ink cloud.',
    social: null,
    aftermath_hooks: [
      'the ink cloud obscured something in the water',
      "the octopus's den contains small shiny objects it collected",
      'the octopus was guarding a small underwater opening',
    ],
  },
  Owl: {
    preferred_tones: ['quiet_tension', 'something_wrong'],
    retreat: 'Flies away silently.',
    social: null,
    aftermath_hooks: [
      'the owl was a familiar — its master felt it die',
      'the owl was perched watching something specific — what it was looking at matters',
      'the owl pellets below its roost contain tiny bones and objects that reveal the local fauna',
    ],
  },
  'Poisonous Snake': {
    preferred_tones: ['triggered_mistake', 'quiet_tension'],
    retreat: 'Slithers into undergrowth or a hole.',
    social: null,
    aftermath_hooks: [
      "the snake's venom can be harvested — useful for alchemy or poison crafting",
      'the snake was nesting near something warm — a body, a fire, or a magical heat source',
      'the snake was placed here deliberately as a trap or guardian',
    ],
  },
  Quipper: {
    preferred_tones: ['triggered_mistake', 'already_in_motion'],
    retreat: null,
    social: null,
    aftermath_hooks: [
      'the quippers were feeding on something in the water — remains are identifiable',
      'the quipper-infested water blocks a crossing the party needs',
      'the quippers were drawn by blood — something died in this water recently',
    ],
  },
  Rat: {
    preferred_tones: ['triggered_mistake', 'quiet_tension'],
    retreat: 'Squeezes through tiny gaps.',
    social: null,
    aftermath_hooks: [
      'the rats carry disease — anyone bitten should be monitored',
      'the rats were fleeing something — rats leaving an area is a bad sign',
      'the rat was a familiar — its master is nearby',
    ],
  },
  Raven: {
    preferred_tones: ['something_wrong', 'quiet_tension'],
    retreat: 'Flies away. May speak a word as it goes.',
    social: null,
    aftermath_hooks: [
      'the raven can mimic speech — it repeated something it heard recently',
      'the raven was a familiar or spy for a hag, wizard, or druid',
      'ravens gathering in unusual numbers are an omen — something nearby is dying or cursed',
    ],
  },
  Scorpion: {
    preferred_tones: ['triggered_mistake'],
    retreat: 'Hides under rocks or debris.',
    social: null,
    aftermath_hooks: [
      "the scorpion's venom is harvestable for alchemy",
      'the scorpion was nesting — more are hidden in the area',
      'the scorpion was displaced from a container or crate — someone shipped it here',
    ],
  },
  'Sea Horse': {
    preferred_tones: ['quiet_tension'],
    retreat: 'Swims away.',
    social: null,
    aftermath_hooks: [
      'sea horses in unusual numbers indicate a healthy reef or a merfolk settlement nearby',
      "the sea horse's coloring is unusual — alchemical or magical water properties",
      'the sea horses are fleeing a disturbance — a predator or underwater event',
    ],
  },
  Spider: {
    preferred_tones: ['triggered_mistake', 'quiet_tension'],
    retreat: 'Retreats into web or crevice.',
    social: null,
    aftermath_hooks: [
      "the spider's web covered something — a keyhole, a switch, an inscription",
      'the spider was a familiar — its master is nearby',
      'the web contained tiny wrapped prey with something glinting inside — a ring, a coin, a gem',
    ],
  },
  Vulture: {
    preferred_tones: ['quiet_tension', 'interrupted_activity'],
    retreat: 'Flies away heavily.',
    social: null,
    aftermath_hooks: [
      'the vultures were circling something dead — the body tells a story',
      'the flock indicates recent death in the area — a battlefield, a plague, or a predator',
      "vultures following the party means something thinks they're going to die",
    ],
  },
  Weasel: {
    preferred_tones: ['triggered_mistake', 'quiet_tension'],
    retreat: 'Darts into a burrow or gap.',
    social: null,
    aftermath_hooks: [
      'the weasel was a familiar — its master is aware',
      "the weasel's burrow contains small stolen objects — a key, a button, a tooth",
      "the weasel's behavior was unusual — it was watching the party deliberately",
    ],
  },
  'Swarm of Bats': {
    preferred_tones: ['triggered_mistake', 'already_in_motion'],
    retreat: 'Disperses through multiple exits. Reforms in darkness.',
    social: null,
    aftermath_hooks: [
      'the bat swarm was disturbed from a roost above a much larger cave',
      "the bats fled through multiple openings — revealing exits the party didn't know about",
      'the swarm was driven from its roost by something deeper in the cave',
    ],
  },
  'Swarm of Insects': {
    preferred_tones: [
      'triggered_mistake',
      'already_in_motion',
      'quiet_tension',
    ],
    retreat: null,
    social: null,
    aftermath_hooks: [
      'the insects were nesting in something — a corpse, a log, a wall cavity — disturbing the nest revealed it',
      'the swarm was driven out by smoke, fire, or a creature — the source is nearby',
      'the insects are unusually aggressive — a magical or alchemical contamination made them hostile',
    ],
  },
  'Swarm of Poisonous Snakes': {
    preferred_tones: [
      'triggered_mistake',
      'quiet_tension',
      'already_in_motion',
    ],
    retreat: 'Scatters into undergrowth and crevices.',
    social: null,
    aftermath_hooks: [
      'the snakes were disturbed from a den — what disturbed them is the real concern',
      'the snakes were concentrated near a heat source — a magical or geothermal feature',
      'the venom from this many snakes is valuable — an alchemist would pay well',
    ],
  },
  'Swarm of Quippers': {
    preferred_tones: ['triggered_mistake', 'already_in_motion'],
    retreat: null,
    social: null,
    aftermath_hooks: [
      "the quippers stripped something to the bone — the skeleton's gear is on the river bottom",
      'the quipper-infested stretch blocks the only water route',
      'the quippers were attracted by blood from an upstream source — something died or was killed up the river',
    ],
  },
  'Swarm of Rats': {
    preferred_tones: [
      'triggered_mistake',
      'already_in_motion',
      'quiet_tension',
    ],
    retreat: 'Scatters through dozens of tiny holes.',
    social: null,
    aftermath_hooks: [
      'the rats carry disease — anyone bitten should check for infection',
      'the rats were fleeing something — a rat exodus means danger below',
      'the rats were controlled by a wererat, vampire, or other creature with power over vermin',
    ],
  },
  'Swarm of Ravens': {
    preferred_tones: ['something_wrong', 'already_in_motion', 'quiet_tension'],
    retreat: 'Scatters and reforms at a distance.',
    social: null,
    aftermath_hooks: [
      'the ravens were drawn to death — a body or massacre site is nearby',
      'the ravens were controlled by a hag, druid, or dark spellcaster',
      'one raven in the flock spoke a word as the swarm scattered — it was mimicking something it heard',
    ],
  },
};
// Merge new fields into existing data
let mergedCount = 0;
let notFoundCount = 0;
const notFound = [];

for (const [creatureName, newFields] of Object.entries(newData)) {
  if (existingData[creatureName]) {
    existingData[creatureName] = {
      ...existingData[creatureName],
      ...newFields,
    };
    mergedCount++;
  } else {
    notFound.push(creatureName);
    notFoundCount++;
  }
}

// Write updated data back to file
writeFileSync(dataPath, JSON.stringify(existingData, null, 2), 'utf-8');

console.log(`✓ Merged ${mergedCount} creatures successfully`);
if (notFoundCount > 0) {
  console.log(`✗ Could not find ${notFoundCount} creatures:`);
  notFound.forEach((name) => console.log(`  - ${name}`));
}
