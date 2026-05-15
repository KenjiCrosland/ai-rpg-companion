/**
 * Shared prompt block: "the register's category name is GENERATOR
 * METADATA, not in-world fiction."
 *
 * Real-world category labels (Etruscan, Yoruba, Russian, Norse,
 * Egyptian — every real-world cultural / linguistic / ethnic /
 * geographic category) have a tendency to surface in LLM output as
 * in-world setting decoration. This block is the universal rule
 * against the four common slip points (language names, places, ethnic
 * labels, periods).
 *
 * Lean version: the rule names WRONG patterns explicitly and trusts
 * the LLM to invent the RIGHT-side replacements freshly. An earlier
 * draft included concrete in-world example phrases ("the cold-north
 * amber-coast," "Velzna-Pantha," "salt-pillar wastes") for
 * pedagogical scaffolding, but production showed the LLM cargo-
 * culting those phrases verbatim across many generations — every
 * Norse outsider became "an amber-trader from the cold-north amber-
 * coast." Same anchoring failure mode that drove the
 * rotateRegisterExamples work. The lean version drops the concrete
 * RIGHT examples and pushes the LLM to invent based on the
 * register's material-culture clues alone.
 *
 * Fantasy-race names ("elven," "dwarven," "orcish," "fey,"
 * "celestial," "draconic") are NOT category names — they're in-world.
 * The block carves them out explicitly so the explicit-origin-naming
 * requirement (lore must name the origin culture) stays intact.
 */
export function buildRealWorldCategoryRestrictionBlock() {
  return `REAL-WORLD CATEGORY NAMES — USE IN-WORLD TERMS ONLY:

The register name itself — every real-world cultural / linguistic / ethnic / geographic / historical category — is GENERATOR METADATA, not part of the in-world fiction. This applies to ALL registers, Western-canonical AND non-Western. If a name appears in an atlas, history book, or linguistics survey, it doesn't belong in output prose.

Invent in-world replacements freshly each generation. Use material-culture clues drawn from THIS REGISTER's own historical record — its actual materials, craft forms, environmental features, and trade goods. Do not borrow material-culture vocabulary from other traditions just because it sounds "ancient" or generically evocative. If the material would not plausibly appear in this specific register's historical context, do not use it here.

REACH PAST THE HEADLINE MATERIAL: every culture has a single most-iconic material or motif that appears in the opening paragraph of any popular-history summary about it. That headline material is what your training will reach for first. Reach past it. Pull from the second, third, or fifth most-typical material in this register's record — the working-craft vocabulary, the secondary trade goods, the everyday tools and environmental features — not the stock headline. If the first material that comes to mind feels obvious for the register, pick a different one.

Four common slip points:

1. LANGUAGE NAMES. Use the in-world culture's own word for their tongue, never the real-world linguistic category.
   - For fantasy races: "the elven tongue," "the orcish war-tongue."
   - For cultural-coded content: invent an in-world descriptor that fits the register's material culture.
   - NEVER: "the Welsh tongue," "the Yoruba-inspired tongue," "the Old Norse tongue."

2. PLACES / TERRAIN / CITIES / RIVERS. NEVER use real cities, rivers, regions, or geographic features — this includes both Western-canonical ones (the Volga, the Tiber, Wales, the Urals) and non-Western ones (Ur, the Nile, Byblos, Sumer). Invent in-world place names in the register's phonological style, or use generic in-world descriptors anchored in material culture.
   - WRONG: "the Etruscan highlands," "the city of Ur," "the Russian steppe," "the Volga delta," "in Sumer," "the Nile."

3. ETHNIC / CIVILIZATIONAL LABELS. Don't tag characters or peoples by the register's category name. Use in-world descriptors anchored in material culture, occupation, or place of origin.
   - WRONG: "an Etruscan smith," "the Russian woman," "a Norse warrior," "the Yoruba elders," "a Maori warrior."

4. PERIOD / EPOCH LABELS. Don't reference real-world historical eras by name. Use in-world temporal markers anchored in the lore's events.
   - WRONG: "the New Kingdom," "the Viking Age," "in Tsarist times," "the Bronze Age," "in Punic times."

EXCEPTIONS — what this rule does NOT touch:
- Named figures, deities, or public-domain texts the register's descriptor explicitly authorizes appear by name as licensed (subject to the deity-handling block's mode rules).
- Fantasy-race names (elven, dwarven, orcish, fey, celestial) are in-world, not real-world — the explicit-origin-naming requirement still applies for these.

OUTSIDER RELATIONSHIPS:
When a cross-cultural relationship target is drawn from a different register, the outsider's NAME may follow that register's phonological pattern (the descriptor authorizes the style). But the outsider's setting, ethnicity, and geographic origin still obey this rule: do NOT call them "the Russian woman" or place them in "Tmutarakan." Invent an in-world descriptor for their home culture and place of origin.`;
}
