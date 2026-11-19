// THE FALLBACK LIBRARY (owner go 2026-09-13; expanded to the print
// EMANATION, NOT "WITHIN N FEET" (2026-10-22): print's 2024 idiom for an area around the creature is an EMANATION: 25 Emanation clauses in the corpus against ONE bare "within N feet" (Lich/Deathly Teleport).
// Both qualifier positions are print-attested — a choice qualifier BEFORE (Azer Sentinel: "each creature of the azer's choice in a 5-foot Emanation originating from the azer") and a sense qualifier AFTER (Doppelganger: "...originating from the doppelganger that can see the doppelganger").
// The SIZE is unchanged in every case, so this is grammar only and the pricing does not move.
// Measured 2026-10-22.
// SHAPE-SPACE 2026-09-15: "a more comprehensive action library").
// When a concept's wildcard dies in vetting and repair, the engine
// draws a GENERIFIED print shape priced at the block's own numbers.
//
// DESIGN LAWS:
// - ~24 seeds = the full mechanical shape-space of the 329-block
//   corpus. NOT 20-per-archetype: print itself holds only ~25-30
//   distinct action shapes; volume past that is re-skins of the same
//   shapes and monotony baked into the engine (owner concurred
//   2026-09-15 after the pushback).
// - Every seed is vet-legal BY CONSTRUCTION and print-cited. No
//   reactions (the Parry-retirement pin), no negation, no immunity
//   grants, no authored DCs, no 2014 grammar, ONE save per action.
// - Numbers: {dc} stamps the card DC; {burst} re-dices dpr_frac of the
//   block's per-hit; the library never invents a number.
// - SELECTION: the reskin answer carries `fallback_shape` (the model
//   picks the key nearest its concept UP FRONT, in the same call — no
//   added cost); the draw honors it, then keys-tag affinity, then the
//   name-hash rotation. The same block always draws the same seed.
// - NAMES: authored names are PLACEHOLDERS, never the goal — the
//   model's slot rename re-attaches fiction when honest; a generic
//   name that survives to assembly is flagged to the AUDIT for a
//   concept-fitted rename (owner 2026-09-15: "they should be renamed
//   for the creature").

import { saveDamageDiceFor } from '../format-2024/dice.mjs';
import { capSingleTargetSave, escalateFrom } from './card-budgets.mjs';

const MINOR_REWARDS = ['Prone', 'Poisoned', 'Deafened', 'Frightened', 'Blinded']; // the mild pool, same list the catalog's {condition_minor} slot accepts

/**
 * WHAT A CURSE DOES, BY THE CREATURE'S CR (owner's ruling R2, 2026-11-18). "Curses scale with CR."
 *
 * The moderate and severe effects are print's own words — the Incubus's Short Rests, the Mummy's
 * Hit Points, the Rakshasa's Short or Long Rest. The two MINOR effects are the handoff author's
 * wording of the owner's "a minor inconvenience" and are flagged in the report for him to change.
 *
 * The sentence that carries them is print's: "the target is cursed. While cursed, X." No duration
 * and no "until" — that is what makes it a curse rather than a condition with a timer.
 */
export const CURSE_TIERS = [
  { tier: 'minor', maxCr: 1, effects: ['the target has Disadvantage on Dexterity (Stealth) checks', 'the target has Disadvantage on Charisma (Persuasion) checks'] },
  { tier: 'moderate', maxCr: 4, effects: ["the target's Speed is reduced by 5 feet", 'the target gains no benefit from finishing Short Rests'] },
  { tier: 'severe', maxCr: Infinity, effects: ["the target can't regain Hit Points", 'the target gains no benefit from finishing a Short or Long Rest'] },
];
/** the tier that holds this CR, and one effect from it chosen by the sheet's own seed */
export const curseEffectFor = (cr, seedName = '') => {
  const tier = CURSE_TIERS.find((t) => Number(cr ?? 0) <= t.maxCr) ?? CURSE_TIERS.at(-1);
  return { tier: tier.tier, effect: tier.effects[nameHash(String(seedName)) % tier.effects.length] };
};

export const LIBRARY_SEEDS = [
  // ——— control ———
  {
    key: 'aggro-curse', keys: ['mark', 'taunt', 'oath', 'challenge'],
    section: 'Bonus Actions', archetypes: ['defender', 'brute', 'skirmisher', 'caster'],
    name: 'Binding Mark', // Brinefrost Salt Demand, generified
    text: "*Wisdom Saving Throw:* DC {dc}, one creature within 30 feet. *Failure:* Until the start of the creature's next turn, the target has Disadvantage on attack rolls against creatures other than the creature.",
  },
  {
    key: 'obstacle-pull', moves: 'toward', keys: ['pull', 'yank', 'reel', 'beckon'],
    // A PULL AT RANGE IS A REACHING HOLD (2026-11-11). Its own text reaches 60 feet and
    // hauls the target in, which is the same body question `hook-drag` and `reel` answer
    // with `hold_shape: 'reach'` — and this seed carried no shape, so the gate the owner
    // approved for those two let it onto a grip creature's menu: the cove bull eel (grip,
    // "pulls sailors beneath the waves") shipped Thrashing Surge, a 15-foot cone pull,
    // through `closest accepted`. Not a new class, the same one, declared.
    hold_shape: 'reach',
    section: 'Actions', archetypes: ['caster', 'defender', 'lurker'],
    name: 'Beckoning Pull', // Polite Beckon, generified
    text: "*Strength Saving Throw:* DC {dc}, one creature within 60 feet. *Failure:* The target is pulled up to 15 feet straight toward the creature, and its Speed is 0 until the start of the creature's next turn.",
  },
  {
    key: 'lure', duration_default: 'source_start', imposes: 'Charmed', retired: true, // promoted to a shape (shapes.mjs) 2026-09-22
    keys: ['lure', 'beguile', 'song', 'call'],
    section: 'Actions', archetypes: ['lurker', 'caster', 'skirmisher'],
    name: 'Luring Presence', // Dull Compliance + the Bog Lantern's live proof
    text: "*Wisdom Saving Throw:* DC {dc}, one creature within 30 feet that can see or hear the creature. *Failure:* The target has the Charmed condition {duration}, and while Charmed this way, it must move toward the creature by the safest available route on its turn.",
  },
  {
    key: 'pacify', duration_default: 'target_end', imposes: 'Incapacitated', keys: ['transfix', 'hold', 'stillness', 'trance'],
    section: 'Actions', archetypes: ['caster', 'lurker'],
    name: 'Transfixing Regard (2/Day)', // Weight of Attention, gated
    text: "*Wisdom Saving Throw:* DC {dc}, one creature within 60 feet. *Failure:* The target has the Incapacitated condition and its Speed is 0 {duration}.",
  },
  {
    // ITS OWN TEXT DEPENDS ON THIS DURATION (2026-11-18). The second sentence — "If the target was
    // already Frightened BY THIS ABILITY" — can only ever fire if the fear outlasts the creature's
    // own next turn. The fit call may answer a duration, and on the Air Elemental and the Quarry
    // Scree-Wyrm it answered `target_end`: the fear then ends before the creature acts again and
    // the escalation is dead text on the card. `duration_fixed` says the call does not get to
    // choose here. It is the only template of the 114 with both a {duration} slot and a sentence
    // that refers back to the condition it just applied.
    key: 'escalating-dread', duration_default: 'source_end', duration_fixed: true, imposes: 'Frightened', keys: ['dread', 'fear', 'wither', 'doom'],
    section: 'Actions', archetypes: ['lurker', 'caster', 'brute'],
    name: 'Creeping Dread', dpr_frac: 0.5, // the Mummy's Dreadful Glare
    text: "*Wisdom Saving Throw:* DC {dc}, one creature within 60 feet. *Failure:* The target has the Frightened condition {duration}. If the target was already Frightened by this ability, it also takes {burst} {damage_type} damage.",
  },
  {
    key: 'terror-pulse', duration_default: 'target_end', imposes: 'Frightened', keys: ['terror', 'roar', 'shriek', 'presence'],
    section: 'Actions', archetypes: ['brute', 'lurker', 'defender'],
    name: 'Horrid Display (2/Day)', // the Frightful Presence class
    // PRINT'S PRICE FOR AN EMANATION (2026-10-29): every at-will control
    // Emanation past 10 feet in the 329 buys the target out on a success — Pit
    // Fiend 20 ft, Cloaker 60 ft, Harpy 300 ft, 3 of 3. This row is a 30-foot
    // Emanation and shipped without it twice on the 10-29 forty (Meshrin, Rook
    // Harrowgate), where the renamer had also broadcast it as "Dread Presence".
    text: "*Wisdom Saving Throw:* DC {dc}, each creature of the creature's choice in a 30-foot Emanation originating from the creature that can see or hear it. *Failure:* The target has the Frightened condition {duration}. *Success:* The target is immune to this creature's terror for 24 hours.",
  },
  {
    key: 'snare-bolt', duration_default: 'source_end', imposes: 'Restrained', keys: ['snare', 'web', 'bind', 'tangle'],
    section: 'Actions', archetypes: ['lurker', 'caster', 'skirmisher'],
    name: 'Binding Lash', // the Web-bolt class (Restrained, self-ending)
    text: "*Dexterity Saving Throw:* DC {dc}, one creature within 60 feet. *Failure:* The target has the Restrained condition {duration}.",
  },
  {
    key: 'slow-bolt', keys: ['slow', 'chill', 'mire', 'leaden'],
    section: 'Actions', archetypes: ['caster', 'lurker', 'defender'],
    name: 'Leaden Touch', // the Ray of Frost / Slow-lite class
    text: "*Constitution Saving Throw:* DC {dc}, one creature within 60 feet. *Failure:* The target's Speed is halved and it can't take Reactions until the end of the creature's next turn.",
  },
  {
    key: 'sensory-strike', duration_default: 'source_end', imposes: 'Blinded', keys: ['blind', 'dazzle', 'flash', 'deafen'],
    section: 'Actions', archetypes: ['caster', 'skirmisher', 'lurker'],
    name: 'Dazzling Burst', // the Blindness class, self-ending
    text: "*Constitution Saving Throw:* DC {dc}, one creature within 60 feet. *Failure:* The target has the Blinded condition {duration}.",
  },
  {
    key: 'disarm', keys: ['disarm', 'twist', 'strip'],
    section: 'Actions', archetypes: ['skirmisher', 'defender'],
    name: 'Disarming Twist', // print's disarm idiom
    // DAMAGE AND THE EFFECT, WHICH IS PRINT'S GRAMMAR, AND THE CELL DECLARED SO THE
    // DAMAGE DOES NOT MOVE IT (owner's rulings, 2026-11-05: "in dnd a disarming attack
    // has damage ... even then a 1d4 is usable", then option b — a seed declares its own
    // cell rather than having one inferred from its prose).
    //
    // Bare, this row scored EV 0 against the value floor in all 20 contexts of that day's
    // template audit, and EV 0 is UNLIFTABLE: the ladder raises a row by scaling the dice
    // it already has, so a row with no damage term has nothing to scale and is dropped
    // with a fallback standing in. That is how the Ledger Ghaunt shipped "Forfeit the
    // Burden" — a Strength save for plain bludgeoning under a forfeiture name — while the
    // disarm the GM asked for was picked and discarded (homebrew40 #30, and subjectflip12
    // rolls 09 and 12). Print agrees with the floor here: 140 of its 146 action-cost save
    // rows carry damage or a condition, and the one bare disarm precedent is the Rust
    // Monster's Antennae at CR 1/2.
    //
    // `effect: 'movement'` is declared because the damage term would otherwise refile this
    // row as `save/damage` and empty the movement shelf of the only disarm on it.
    // `dpr_frac` IS WHAT FILLS {burst}, AND WITHOUT IT THE ROW CANNOT RENDER AT ALL.
    // The seed path substitutes the damage token only inside `if (seed.dpr_frac)`, and
    // `renderTemplate` returns null on any leftover `{token}` — so the first cut of this
    // repair added the damage term and no fraction, which took disarm OFF every menu:
    // "menu pruned: action — disarm (the sheet cannot render them)" on all 12 sheets of
    // floorfix12, against 0 of 12 before. It was picked and shipping the night before.
    //
    // 0.8 is the floor for an ungated action (0.8x the attack it replaces), so the row
    // clears on merit rather than by exemption and the disarm itself is the upside. The
    // neighbours bracket it: a small recurring tick is 0.25 (`delayed-brand`), print's
    // Life Drain grammar 0.6 (`drain`), a gated nova 1.0-1.2 (`thrown-burst`, `wind-up`).
    trigger: 'save', effect: 'movement', dpr_frac: 0.8,
    text: "*Strength Saving Throw:* DC {dc}, one creature within 5 feet that is holding a weapon or another object. *Failure:* {burst} {damage_type} damage, and the target drops the held object, which lands in its space.",
  },
  // ——— forced movement ———
  {
    key: 'push-prone', imposes: 'Prone', moves: 'away', keys: ['shove', 'topple', 'slam', 'bowl'],
    section: 'Actions', archetypes: ['brute', 'defender'],
    name: 'Sundering Shove', // the Topple Foe / push class
    text: '*Strength Saving Throw:* DC {dc}, one creature within 5 feet. *Failure:* The target is pushed up to 15 feet away from the creature and has the Prone condition.',
  },
  {
    key: 'herd', keys: ['herd', 'drive', 'command'],
    section: 'Actions', archetypes: ['defender', 'brute', 'caster'],
    // UNGATED AND CARRYING A LITTLE DAMAGE (2026-11-07). Gated it read 6 against 54 at
    // CR 9 — the nova floor — and was dropped every time. Print's precedent for area
    // forced movement is the bronze dragons' Repulsion Breath: bare, and AT WILL. Ungated
    // this reaches ~78% of the floor on the movement credit alone (13 of 17 at CR 9), so
    // a small fraction closes it rather than turning a herding bellow into a nova.
    name: 'Driving Bellow', dpr_frac: 0.3, // area forced-move, at will like print's Repulsion Breath
    text: "*Wisdom Saving Throw:* DC {dc}, each creature of the creature's choice in a 30-foot Emanation originating from the creature. *Failure:* {burst} {damage_type} damage, and the target immediately moves up to half its Speed in a direction of the creature's choice, using the safest available route.",
  },
  {
    key: 'hook-drag', moves: 'toward', imposes: 'Grappled', retired: true, // promoted to a shape (shapes.mjs) 2026-09-22
    keys: ['hook', 'chain', 'harpoon', 'drag', 'grapple'],
    section: 'Actions', archetypes: ['brute', 'lurker', 'defender'],
    name: 'Hooked Lash', // the whip-and-drag class
    text: '*Strength Saving Throw:* DC {dc}, one creature within 30 feet. *Failure:* The target is pulled up to 20 feet straight toward the creature and has the Grappled condition (escape DC {dc}).',
  },
  // ——— damage shapes ———
  {
    key: 'thrown-burst', keys: ['hurl', 'bomb', 'burst', 'volley'],
    section: 'Actions', archetypes: ['caster', 'skirmisher', 'brute'],
    name: 'Hurled Burst (Recharge 5-6)', dpr_frac: 1.0, // nova-gated below
    text: '*Dexterity Saving Throw:* DC {dc}, each creature in a 15-foot-radius Sphere centered on a point within 60 feet. *Failure:* {burst} {damage_type} damage. *Success:* Half damage.',
  },
  {
    key: 'drain', keys: ['drain', 'leech', 'feed', 'siphon'],
    section: 'Actions', archetypes: ['lurker', 'caster', 'brute'],
    name: 'Vitality Leech', dpr_frac: 0.6, // print's Life Drain grammar
    text: '*Constitution Saving Throw:* DC {dc}, one creature within 30 feet. *Failure:* {burst} {damage_type} damage, and the creature regains Hit Points equal to half the damage dealt.',
  },
  {
    key: 'delayed-brand', keys: ['brand', 'ember', 'fuse', 'venom'],
    section: 'Actions', archetypes: ['caster', 'lurker', 'skirmisher'],
    // 0.25 PRICED IT AS A TICK BESIDE A HIT; IT IS THE WHOLE ROW (2026-11-07). At that
    // fraction it read EV 4 against a floor of 7 and was dropped in all 20 contexts of
    // the template audit. 0.5 clears it while staying under print's own per-tick ceiling
    // — the note below is why the number is small in the first place, and it stays small.
    name: 'Lingering Brand', dpr_frac: 0.5, // print's tick is SMALL: Fire Form 1d10 beside a 10-point hit (CR 5) — 0.6 of the round minted 6d6 a turn, uncapped (critic, new lines 2026-09-28) // the delayed-tick class
    text: "*Constitution Saving Throw:* DC {dc}, one creature within 60 feet. *Failure:* The target is branded: it takes {burst} {damage_type} damage at the start of each of its turns until it uses its action to {douse}.",  // dilemma rows are DoT-until-action (Fire Elemental grammar, critic 2026-09-22): a single tick never binds
  },
  {
    // A CURSE IS PERMANENT (owner's ruling R2, 2026-11-18). This row used to read "cursed until
    // the end of the creature's next turn", which is a condition with a timer, not a curse. The
    // owner: "curse is a permanent effect. At lower levels it can even be a joke, like CR 1/2 it's
    // a minor inconvenience, but still needs a restoration spell."
    //
    // PRINT'S OWN SENTENCE, and its own effects: the Mummy and the Mummy Lord write "it is cursed.
    // While cursed, the target can't regain Hit Points"; the Rakshasa "While cursed, the target
    // gains no benefit from finishing a Short or Long Rest"; the Incubus "the target gains no
    // benefit from finishing Short Rests". No "until", no duration. The curse is a RIDER on damage,
    // never a row whose only effect is the curse.
    key: 'curse-debt', keys: ['curse', 'debt', 'rebuke', 'price'],
    section: 'Actions', archetypes: ['caster', 'defender'],
    name: 'Ruinous Curse', dpr_frac: 0.6, // was "Debt of Ruin" — the debt mechanic it named is gone
    text: '*Charisma Saving Throw:* DC {dc}, one creature within 60 feet. *Failure:* {burst} {damage_type} damage, and the target is cursed. While cursed, {curse_effect}.',
  },
  {
    // RETIRED 2026-11-11 (owner's read of the H7 twelve: "a reaction masquerading as a bonus
    // action", the marsh swallower and the dune maw). The TRIGGER is a reaction's — you hit me —
    // and the COST is a bonus action on this creature's own turn, so the table must carry "who hit
    // it since its last turn" every round for a 0.4-DPR row. Print has NO such shape: 0 of 329
    // blocks retaliate on "since its last turn" as a bonus action, and 0 as a reaction. It was an
    // invention, and an unsound one; `riposte` is the catalog's shape for punishing a hit.
    //
    // It was also the single most-dealt row in the engine: 17 of the 31 library draws since
    // 2026-11-10 (55%) were this one seed. Structural, not luck — on a brute whose action slot is
    // already full (a Swallow, an Engulf, a template), the blind draw can only deal a BONUS ACTION,
    // and this was the ONLY bonus-action seed on the brute shelf that BLIND_ROLES marks dealable.
    // One card in the deck, dealt every time. Retiring it empties that slot: a brute with a full
    // action slot now ships no bonus action at all, which is correct — no row beats an unsound row,
    // and "a flagged row beats no row" is about REPAIRING a row that exists, not dealing one.
    key: 'own-turn-punisher', retired: true, keys: ['punish', 'sting', 'answer', 'reprisal'],
    section: 'Bonus Actions', archetypes: ['defender', 'brute'],
    name: 'Answering Sting', dpr_frac: 0.4, // Gentle Rebuke
    text: 'One creature within 5 feet that hit the creature with an attack roll since the end of the creature\'s last turn takes {burst} {damage_type} damage.',
  },
  // ——— zones & support ———
  {
    key: 'zone', keys: ['fog', 'murk', 'cloud', 'field'],
    section: 'Actions', archetypes: ['caster', 'lurker'],
    // UNGATED, WHICH IS THE WHOLE FIX HERE (2026-11-07). Gated, this priced against the
    // nova floor (1.3x the Multiattack) and read 13 against 30 at CR 5, so it was dropped
    // and a fallback stood in. At will it clears on its own merits — 26 against 9 at CR 5,
    // 46 against 17 at CR 9 — because an obscuring, difficult-terrain zone is worth an
    // action, not a round. Print's bare area control is at will too (the copper dragons'
    // Slowing Breath, the bronze dragons' Repulsion Breath, every CR from 1 to 22).
    name: 'Clinging Murk', dpr_frac: 0.5, // the Fog Cloud / obscuring-zone class
    // AND IT BITES, WHICH IS PRINT'S DAMAGING-ZONE GRAMMAR (2026-11-07). Obscured plus
    // Difficult Terrain credits nothing in the value model — no damage, no condition — so
    // ungating alone left it at EV 0 against a floor of 6. Print's zones that cost an
    // action deal damage on entry or at the start of a turn there (the Blighted Ground
    // class), so it does that now at half a hit.
    text: "The creature fills a 15-foot-radius Sphere centered on a point it can see within 60 feet. The area is Lightly Obscured and Difficult Terrain until the start of the creature's next turn. A creature that enters the area or starts its turn there takes {burst} {damage_type} damage.",
  },
  {
    key: 'reveal', keys: ['reveal', 'light', 'outline', 'expose'],
    section: 'Actions', archetypes: ['caster', 'defender'],
    // UNGATED AND CARRYING DAMAGE (2026-11-07). Gated it read 5 against 54 at CR 9. Its
    // only credited value is the Advantage it grants attackers (a quarter of an attack),
    // so even at will it reached a third of the floor. Print pairs damage with an effect
    // on 96% of its action-cost save rows; this is one of them.
    name: 'Unveiling Glow', dpr_frac: 0.6, // the Faerie Fire class
    text: "*Dexterity Saving Throw:* DC {dc}, one creature within 60 feet. *Failure:* {burst} {damage_type} damage, and until the end of the creature's next turn the target sheds dim light in a 10-foot radius, it can't benefit from the Invisible condition, and attack rolls against it have Advantage.",
  },
  {
    key: 'self-invisibility', keys: ['invisible', 'invisibility', 'vanish', 'vanishes', 'unseen', 'turn invisible'], // "can turn invisible once per day" (form-ten 2026-10-01); print: the Imp's "casts Invisibility on itself"
    section: 'Bonus Actions', archetypes: ['skirmisher', 'lurker', 'caster', 'defender', 'brute'],
    name: 'Vanish (1/Day)',
    text: 'The creature casts *Invisibility* on itself, requiring no spell components and using Charisma as the spellcasting ability.',
  },
  {
    key: 'rally', keys: ['rally', 'bolster', 'ward', 'blessing'],
    section: 'Bonus Actions', archetypes: ['defender', 'caster', 'brute'],
    // RENAMED 2026-10-27: 188 shipped rows, 81 (43%) on a body that cannot have
    // a class and 76 of those Constructs — golems giving a Bolstering Cry. The
    // mechanic needs no class, only the "Cry" did: a construct has a presence.
    name: 'Bolstering Presence (2/Day)', dpr_frac: 0.5, // the commander THP class
    text: 'Each ally within 30 feet of the creature gains {burst} Temporary Hit Points.',
  },
  {
    key: 'focus', keys: ['focus', 'aim', 'stalk', 'poise'],
    section: 'Bonus Actions', archetypes: ['skirmisher', 'brute', 'lurker'],
    name: 'Predatory Focus (2/Day)', // the aim class — gated (blind read 2026-09-21: at-will self-Advantage is unpriced)
    text: 'The creature has Advantage on the next attack roll it makes before the end of its turn.',
  },
  {
    key: 'feint-slip', keys: ['feint', 'slip', 'blur', 'weave'],
    section: 'Bonus Actions', archetypes: ['skirmisher', 'lurker'],
    name: 'Feinting Step', // the Disengage-plus class
    text: 'The creature takes the Disengage action, and the next attack roll made against it before the start of its next turn has Disadvantage.',
  },
  {
    key: 'unnerve', keys: ['unnerve', 'croon', 'whisper', 'hex'], retired: true, // the deleted placeholder's payload came back through the library (blind read 2026-09-21, the bishop's "Dissonant Hymn")
    section: 'Bonus Actions', archetypes: ['lurker', 'caster', 'defender', 'brute', 'skirmisher'],
    name: 'Unnerving Croon', // the old fallback's payload, on the RIGHT economy
    // (a bonus-action debuff never competes with Multiattack — the
    // Toll Demand precedent; the dominated-Action form is the one that
    // was deleted)
    text: "*Wisdom Saving Throw:* DC {dc}, one creature within 30 feet. *Failure:* The target has Disadvantage on the next attack roll it makes before the start of the creature's next turn.",
  },
];

// ——— the 2026-09-15 completion pass (owner: "make A the workhorse") ———
LIBRARY_SEEDS.push(
  {
    key: 'summon-lite', keys: ['summon', 'call', 'servitor', 'raise'], retired: true, // NO GROUP TEMPLATES (owner ruling 2026-09-28): print puts companions in their own blocks (one Animate Trees in 329); a concept's pack is fiction on the rows
    section: 'Actions', archetypes: ['caster', 'defender', 'lurker'], minCr: 3,
    name: 'Servitor Call (1/Day)', // the Debtor's Claim print idiom
    text: "The creature calls a servitor formed of its own substance in an unoccupied space within 30 feet. The servitor uses the *Skeleton* statistics, acts on the creature's initiative immediately after it, and obeys its silent commands. It crumbles after 1 minute, when reduced to 0 Hit Points, or when the creature dies.",
  },
  {
    key: 'wind-up', keys: ['gather', 'charge-up', 'telegraph', 'brew'],
    section: 'Actions', archetypes: ['brute', 'caster', 'defender'], nova: true,
    name: 'Gathering Ruin (Recharge 5-6)', dpr_frac: 1.2,
    text: "The creature begins gathering destructive power, {telegraph}. At the end of its next turn, after it has moved, the power erupts. *Dexterity Saving Throw:* DC {dc}, each creature in a 20-foot Emanation originating from the creature at that moment. *Failure:* {burst} {damage_type} damage. *Success:* Half damage.",
  },
  {
    key: 'coating', keys: ['coat', 'venom', 'anoint', 'charge-weapon'],
    section: 'Bonus Actions', archetypes: ['skirmisher', 'lurker', 'brute'],
    name: 'Venomed Edge (2/Day)', dpr_frac: 0.5,
    text: 'The creature charges its next strike: the first time it hits with an attack before the end of its next turn, the target takes an extra {burst} {damage_type} damage.',
  },
  {
    key: 'exploiter', keys: ['exploit', 'opportunist', 'predator', 'finish', 'punish', 'crush', 'batter', 'savage', 'execute', 'break'],
    section: 'Actions', archetypes: ['lurker', 'skirmisher', 'brute', 'defender'],
    name: "Opportunist's Lash", dpr_frac: 0.8, needsImposed: true, rewardsCondition: true,
    // the pure-interlock seed (owner: "conditionals unique to a
    // creature — X BY THE CREATURE"): only drawable when this sheet
    // actually imposes a condition; the slot renders source-bound
    //
    // IT REWARDS THE CONDITION, IT NO LONGER REQUIRES IT (owner's redesign, 2026-11-05).
    // This seed read "one creature ... that is {imposed_bound}", so it was dead whenever
    // the hold did not land first — the same fault the condition-payoff TEMPLATE had,
    // and this is the row that actually ships: the signature seat goes to the library
    // path on 11 of 12 sheets, so the template redesign could not reach a sheet while
    // this seed stayed as it was. Now it hits anyone and escalates on a target the sheet
    // has already afflicted, with the rung chosen off print's ladder.
    // THE TRIGGER STAYS SOURCE-BOUND. print binds a payoff to its OWN hold — the
    // Glabrezu's "one creature Grappled by the glabrezu", the Mimic's "if the target is
    // Grappled by the mimic" — so the reward fires on what THIS creature did, never on
    // an ally's grapple. Dropping `{imposed_bound}` for a bare "has the X condition"
    // made it broader than print; the shelf's own test caught it.
    text: '*Strength Saving Throw:* DC {dc}, one creature within 30 feet. *Failure:* {burst} {damage_type} damage. If the target is already {imposed_bound}, it also has the {escalated_condition} condition until the end of its next turn. *Success:* Half damage.',
  },
  {
    key: 'blighted-ground', keys: ['blight', 'scorch', 'corrupt', 'floor'],
    section: 'Actions', archetypes: ['caster', 'lurker'], nova: true,
    name: 'Blighted Ground (2/Day)', dpr_frac: 0.6,
    text: "The creature corrupts a 15-foot-radius area of ground centered on a point within 60 feet. The area is Difficult Terrain until the start of the creature's next turn. *Constitution Saving Throw:* DC {dc}, each creature in the area when it appears. *Failure:* {burst} {damage_type} damage. *Success:* Half damage.",
  },
  {
    key: 'phase-slip', keys: ['slip', 'phase', 'blink', 'vanish'],
    section: 'Bonus Actions', archetypes: ['lurker', 'skirmisher', 'caster'],
    requiresMechanic: 'teleport', // teleports are concept-gated tech —
    // the library never leaks a mechanic the concept didn't claim
    name: 'Phase Slip (2/Day)',
    text: 'The creature teleports up to 30 feet to an unoccupied space it can see.',
  },
);

// print binds conditions to their source (owner 2026-09-15: "Creatures
// who are X by the creature"): fear/charm bind with OF, physical holds
// bind with BY, the rest stay plain
const SOURCE_BOUND = {
  Frightened: 'Frightened of the creature', Charmed: 'Charmed by the creature',
  Grappled: 'Grappled by the creature', Restrained: 'Restrained by the creature',
};
const boundForm = (c) => SOURCE_BOUND[c] ?? `${c}`;

export const LIBRARY_KEYS = LIBRARY_SEEDS.map((s) => s.key);

// deterministic, block-varied: the same block always draws the same
// seed; different blocks rotate through their eligible shelf
export const nameHash = (s) => [...String(s)].reduce((h, c) => ((h * 31) + c.charCodeAt(0)) >>> 0, 7);

export function drawLibraryRow(scaled, { archetype = null, energy = null, mix = null, name = '', shapeKey = null, imposed = [], mechanics = null, cr = null, meleeName = null, rangedName = null } = {}) {
  let spentDamageType = null; // the type this seed's frame actually spent, or null
  const hasNova = Object.values(scaled.sections ?? {}).flat()
    .some((e) => (/^Recharge/.test(e.gate ?? '') || /\(Recharge [\d–-]+\)/.test(e.name ?? '')) && /\d+ \(\d+d\d+/.test(e.text ?? ''));
  const chassisTeleports = Object.values(scaled.sections ?? {}).flat().some((e) => /teleports? up to/.test(e.text ?? ''));
  // A SHEET THAT ALREADY CLOSES ITS LOOP DOES NOT NEED A SECOND PAYOFF (owner,
  // 2026-11-05: "we already have payoffs baked into our grapplers ... any creature
  // template where there is a loop payoff is not needed and too much"). Same law as the
  // teleport line above: the chassis already delivering the mechanic beats the claim.
  //
  // Measured over 3,279 saved sheets: 1,209 impose a condition and 476 of them (39%)
  // already have a row that consumes it — Swallow 66, Whelm 35, Fling 21, Smother 17,
  // the engulf family the grappler chassis ship with. On those, this seed is a third row
  // on one mechanic. It also removes a redundancy that already shipped: Opportunist's
  // Lash itself closes the loop 28 times, so on some sheets it was doubling up.
  //
  // The 733 LOOP-FREE sheets are the ones worth having it — a grab with no follow-up, a
  // Frightened aura that leads nowhere. The condition is on the page doing nothing.
  const closers = /\bit is grappling\b|\b(?:swallowed|engulfed|caged|entombed|smothered|whelmed)\b|\b(?:Grappled|Restrained|Poisoned|Prone|Frightened|Blinded|Stunned) (?:by|of) the\b/i;
  const loopClosed = Object.values(scaled.sections ?? {}).flat().some((e) => closers.test(String(e?.text ?? '')));
  const legal = (seed) => !((seed.nova || seed.key === 'thrown-burst') && hasNova)
    && !(seed.needsImposed && !imposed.length)
    && !(seed.requiresMechanic && !(Array.isArray(mechanics) && mechanics.includes(seed.requiresMechanic)))
    // the chassis already delivering the mechanic beats the claim (the
    // Gutterwretch drew a second teleport beside Flickerstep, 2026-09-15)
    && !(seed.key === 'phase-slip' && chassisTeleports)
    && !(seed.rewardsCondition && loopClosed) // the sheet already does something with its own condition
    // DOMINANCE (critic 2026-09-15, the Ledgerhorn's Overbalance: a
    // 0-damage prone action on a sheet whose Gore and Steam Vent both
    // prone already): a pure-control seed never draws into a sheet
    // that already imposes its payload condition
    && !(seed.key === 'push-prone' && imposed.includes('Prone'))
    // A BODY THAT HOLDS IS NOT GIVEN A ROW THAT PUSHES ITS PREY AWAY (item 1.6, 2026-11-18). The
    // Mire Hound's Bite grapples and then "Sundering Shove" pushed the target 15 feet away from it;
    // the Well Drowned Worm's Coil did the same. Both drew this seed as a STAND-IN when no template
    // held the idea — and on the hound the idea was the opposite direction, a Bite that "pulled the
    // target into the hound's space". `moves` is declared on the three seeds that move a target, so
    // the pull seeds (obstacle-pull, hook-drag) still deal to a grappler, which is where they belong.
    && !(seed.moves === 'away' && imposed.includes('Grappled'))
    && !(seed.minCr && (cr ?? scaled.cr ?? 99) < seed.minCr);
  const shelf = LIBRARY_SEEDS.filter((seed) => (!archetype || seed.archetypes.includes(archetype)) && legal(seed));
  if (!shelf.length) return null;
  // the model's up-front pick wins (exact key, then tag affinity),
  // shelf-restricted so archetype fit holds; the hash rotation is the
  // tiebreak, never the first choice when a key was given
  const wanted = String(shapeKey ?? '').trim().toLowerCase();
  const seed = (wanted
    ? (shelf.find((x) => x.key === wanted)
      ?? shelf.find((x) => x.keys.includes(wanted))
      ?? LIBRARY_SEEDS.find((x) => legal(x) && (x.key === wanted || x.keys.includes(wanted)))) // off-shelf exact ask still honored
    : null)
    ?? shelf[nameHash(name) % shelf.length];
  let text = seed.text.split('{dc}').join(String(scaled.dc));
  // the interlock slots: a condition THIS sheet imposes, source-bound
  if (text.includes('{imposed_bound}') || text.includes('{imposed_condition}')) {
    const pick = imposed[0] ?? 'Prone';
    text = text.split('{imposed_bound}').join(boundForm(pick)).split('{imposed_condition}').join(pick);
    // THE RUNG COMES OFF PRINT'S LADDER, not off the seed's wording: one step up from
    // whatever this sheet already imposes, mild below the bands where print's own
    // single-target saves take a turn away and severe at or above them. When no rung
    // applies the escalation sentence leaves whole rather than printing a half clause —
    // the same rule the template's conditional rider follows.
    if (text.includes('{escalated_condition}')) {
      const rung = escalateFrom(pick, MINOR_REWARDS, { severe: Number(cr ?? scaled.cr ?? 0) >= 10 });
      text = rung
        ? text.split('{escalated_condition}').join(rung)
        : text.replace(/ If the target is already [^.]*, it also has the \{escalated_condition\} condition until the end of its next turn\./, '');
    }
  }
  if (seed.dpr_frac) {
    // THE SEED PATH CLAMPS TOO. This is the writer that actually shipped the Merciless
    // Strike's 66 at CR 16 — a condition-payoff row reaches a sheet as a LIBRARY row,
    // not through renderTemplate, so a clamp placed only there changed nothing live.
    const { avg, dice } = saveDamageDiceFor(capSingleTargetSave(Math.max(3, Math.round((scaled.per_hit ?? 6) * seed.dpr_frac)), text, cr ?? scaled.cr));
    text = text.split('{burst}').join(`${avg} (${dice})`);
    // A SEED'S OWN FICTION BEATS THE SLOT'S DEFAULT (critic, 2026-10-14:
    // Bloodcurdling Howl and Creeping Dread both dealt Piercing — the seed path
    // defaults an action to Piercing and a bonus action to Bludgeoning, which is
    // a weapon's type on a thing that is not a weapon). A dread or a wail hurts
    // the mind; a drain is Necrotic; a spew or a venom is Poison.
    const BY_FICTION = { 'escalating-dread': 'Psychic', 'terror-pulse': 'Psychic', 'sensory-strike': 'Psychic', drain: 'Necrotic', 'curse-debt': 'Necrotic', 'delayed-brand': 'Necrotic', 'blighted-ground': 'Poison' };
    const dtype = mix === 'physical' || !energy
      ? (BY_FICTION[seed.key] ?? (seed.section === 'Bonus Actions' ? 'Bludgeoning' : 'Piercing'))
      : energy;
    // the frame only declares a type when it actually spends one: a Frightened
    // seed with no damage token must not carry a misleading default
    if (text.includes('{damage_type}')) spentDamageType = dtype;
    text = text.split('{damage_type}').join(dtype);
  }
  // THE CURSE'S EFFECT COMES FROM THE TIER THAT HOLDS THIS CR (R2). Until the model has a field
  // for it, the engine picks one of the tier's two by the sheet's own seed, so a given creature
  // always curses the same way.
  if (text.includes('{curse_effect}')) {
    const { effect } = curseEffectFor(cr ?? scaled.cr, name);
    text = text.split('{curse_effect}').join(effect);
  }
  // THE ROW CARRIES ITS SEED (critic's hold 5, 2026-10-16). A drawn row said only
  // `library: true`, so nothing downstream could tell WHICH shape it was: the
  // draw had no way to skip a seed the sheet already carried, and Meridane
  // shipped two bonus actions that both charge its next strike. The id is also
  // the row's provenance, which the review doc wants anyway (hold 3).
  // the card's own `imposes` rides onto the row: A2 reads a field, never prose
  // THE SEED DECLARES THE DAMAGE IT DEALS, like a template does (owner,
  // 2026-10-27). `dtype` above is this function's own answer; a later reader
  // scraping it back out of the sentence is the regex the owner retired.
  // Stamped only when the seed's frame actually spends it — a Frightened seed
  // with no damage token declares nothing rather than a misleading default.
  return { seed: seed.key, section: seed.section, row: { name: seed.name, text, library: true, seed: seed.key, ...(spentDamageType ? { damageType: spentDamageType } : {}), ...(seed.imposes ? { imposes: seed.imposes } : {}) } };
}
