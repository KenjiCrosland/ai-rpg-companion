# Cultural Pool Architecture — Primer for Register Researchers

## Version History

- **v1.1** (2026-05-07) — Navajo/Diné register removed entirely from the system (register entry, detection map, prompt-side restriction lists). The skinwalker tradition is sacred and not appropriate for fictional appropriation; clan-name and sacred-geographic terms carry too high a collision-risk for a curated pool to safely contain. Diné-coded user input now falls through to the LLM's world-knowledge override path with strict universal-invent rules. The horror-origin protection still covers the analogous category for other Indigenous-tradition registers.
- **v1** (2026-05-07) — Initial architecture documented. Yoruba is the v1 reference implementation. Horror-coded origin protection just shipped. Conventions reflect production validation against four observed failure modes (Olódùmarè, Pachakutiq, Nyenchen Thanglha, Sorush).

This is a living document. As more registers ship and production data accumulates, architectural decisions will refine. Update this primer when significant decisions change and append a version-history entry.

## What This Document Is

cros.land has multiple AI-driven generators that produce cultural-coded fantasy content — items, NPCs, locations, encounters, settings, books, timelines. When the linguistic register is non-Western-canonical, those generators all face the same cultural-engagement risk: LLMs reach for high-frequency religious-cultural vocabulary they were trained on, producing real deities cast as fictional figures, real emperors cast as fictional smiths, real sacred concepts woven into fantasy lore.

`src/shared/registers/` is the shared substrate that mitigates that risk. Each register in the directory ships pool data, cultural notes, and a curation-time avoid-list. Every generator that produces cultural-coded content can import the shared resource and compose it into its own prompt instructions.

This document is the architectural primer that future register-research projects read before starting. It defines what's being built, why, and what conventions a v1 deliverable must follow. The audience is the next thread that adds a register here. Read it before researching, then deliver a `.mjs` file conforming to the conventions below.

## The Problem Being Solved

LLMs (DeepSeek specifically; the pattern generalizes to GPT-4, Claude, Gemini) follow abstract universal-invent rules ("don't use real religious figures, invent fictional ones in the register's register") imperfectly when the cultural register is unfamiliar. The model can't distinguish sacred-versus-everyday vocabulary in a register where its training is shallow, so it pulls the most-frequent terms it knows — which, for unfamiliar traditions, are typically the most-published ones, which are typically the deities and historical luminaries.

Production validation surfaced specific failure modes:

- **Olódùmarè** (Yoruba supreme deity) used as fictional sky-father
- **Pachakutiq** (real Inca emperor) used as fictional demon-flesh-forging smith
- **Nyenchen Thanglha** (real Tibetan mountain god) used as a fictional place name
- **Sorush** (Zoroastrian Yazata) used as a fictional engraver

These aren't model failures in any narrow sense — the abstract invent-fictional rule is genuinely hard to follow without ground-truth knowledge of the register. The architectural answer is to give the LLM concrete pools it can pick from rather than rules it has to apply. Selection is a cognitive task LLMs do reliably; cultural-knowledge-grounded invention isn't.

## Why Epithets, Not Given Names

This is the most important architectural decision. There are two reasons — communicated separately because each carries weight.

**Structural rationale.** Real personal names across cultures follow specific construction conventions: theophoric (containing god-elements), circumstantial (referencing birth context), lineage-marking, aspirational. A name like Sarah, Adégoke, Pachakutiq, or Min-Jun is the kind of label parents give to children. If you construct names that follow those conventions, your pool entries STRUCTURALLY share patterns with real personal names, and collision risk is high — even careful research can miss attested names that match common production patterns. Given-name construction is structurally porous.

Praise-name epithets (Old Norse "Bloodaxe," Yoruba "Ọwọ́-Iná" Firehand, Quechua "Hamutariq" the thinking one, Anglo-Saxon "Wulfheart") follow different conventions. They're earned descriptors attached to someone after they've become known for something. No parent names their newborn "Hand-of-Fire." This means epithet pools are STRUCTURALLY barred from collision with real personal names — the construction pattern is different. The pool's positive constraint ("use ONLY these names") combines with the structural pattern to give two layers of protection against accidental real-name inclusion.

**Cultural rationale.** Epithet construction is the established fantasy-genre convention for engaging with cultural-linguistic registers. Tolkien used heiti and kennings drawn from Old Norse skaldic poetry. Norse-derivative fantasy uses Bloodaxe, Ironside, Stormbringer. Native speakers of source cultures recognize epithet construction as fantasy engaging with their cultural forms ON THE FORM'S OWN TERMS — it reads as fluency rather than appropriation, because the form itself is the engagement.

By contrast, fantasy that uses real personal names, real religious figures, or real historical persons as fictional characters tends to receive mixed-to-negative reception in source communities, because the engagement isn't with the form — it's with the specific individuals. Epithet pools get cultural engagement (form-recognition, register-presence, language-visibility, diacritic preservation) without triggering the specific-person appropriation patterns that real-name usage produces.

**Practical translation.** When researching a register, identify THAT culture's specific epithet or descriptive-naming traditions:

- Yoruba has Oríkì (praise-recital fragments — `Ọwọ́-Iná`, `Adúró-Òkè`)
- Norse has heiti and kennings (`Hjartastein`, `Stormhamarr`)
- Quechua has agentive `-q` and possessive `-yuq` forms plus quality-compound bynames (`Yawar-Maki` Blood-Hand)
- Andean traditions broadly use animal-attribute warrior-bynames
- Anglo-Saxon has alliterative compounds and `-stan/-frith/-wulf` formations as bynames

Each culture's epithet conventions should drive its pool construction. Do NOT construct given-name-pattern names following the culture's actual baby-naming conventions. If you find yourself writing "this could plausibly be a real Yoruba/Quechua/Welsh name," your construction pattern is wrong.

## Why Per-Register, Not Universal

Each register is a self-contained cultural-research project drawing from THAT culture's specific epithet conventions. There is NO universal-concept layer that all registers translate (no shared "warrior / mother / smith / mountain" archetype list). Cross-register overlap may emerge naturally where cultures share archetypal patterns, but the architecture doesn't force overlap through a shared layer.

A universal layer would homogenize differences. Yoruba praise-name conventions differ structurally from Quechua descriptive-compound conventions, which differ from Lakota nature-attribute warrior-bynames, which differ from Anglo-Saxon alliterative bynames. Forcing them through a shared concept-list flattens what makes each culture's naming patterns distinct — and the distinctness IS the cultural engagement.

When adding a new register, work from the source culture's traditions outward, not from a universal list inward.

## The Data Structure

Each register `.mjs` file produces four exports:

```javascript
export const [register]CharacterEpithets = [
  'YorubaForm',     // English meaning — context note
  // ... ~30-40 entries
];

export const [register]PlaceEpithets = [
  'YorubaForm',     // English meaning — context note
  // ... ~20-25 entries
];

export const [register]SpiritEpithets = [
  'YorubaForm',     // English meaning — context note
  // ... ~12-15 entries
];

export const [register]CulturalNotes = `string with cultural context`;
```

Pools are flat arrays of strings — not objects with `{form, gloss}` structure. Inline source comments document meaning for human maintainers; comments do NOT get sent to the LLM (JS strips them at runtime). The LLM receives only the pool strings, joined by commas.

`CulturalNotes` is a single multi-paragraph string injected into the prompt verbatim. See section below for required content.

See `src/shared/registers/yoruba.mjs` for the canonical structural example. After reading the architectural rationale here, that file gives you the working reference shape.

## The Avoid-List as Curation-Time Only

Avoid-lists are NOT exported to prompts. They live in the file as a curation-time constraint — when constructing pool entries, verify no entry contains any forbidden component. After verification, the pool is the only constraint sent to the LLM.

**Reasoning.** Prompt-time avoid-lists carry priming risk. Listing names with "do NOT use" puts them in the LLM's working context, which can paradoxically increase the chance they surface (the model attends to negation imperfectly). The pool's positive constraint is the actual protection. The avoid-list is a curation tool that ensures the pool is built correctly.

**Scope.** The avoid-list covers sacred-boundary content only:

- Real deities and religious figures
- Real supreme-being variants and their alternative names across diaspora traditions
- Sacred ceremonial concepts (Ifá in Yoruba, capacocha in Andean, etc.)
- Named ancestral figures with religious significance
- Real historical emperors, founders, culturally-foundational persons
- Sacred geographic features (named sacred mountains, sacred lakes)

The avoid-list does NOT enumerate every common given-name pattern, every common place name, or every word in the language. Those are protected structurally by the pool's positive constraint and the epithet-not-given-name decision.

You document the avoid-list in your file's docstring or in inline comments adjacent to pool construction — wherever a future curator can reuse it to verify expansions. It's research-process documentation, not prompt content.

## Cultural Notes Structure

The cultural-notes string covers, in roughly this order:

1. **Cultural framing** (1 paragraph) — which real-world tradition this register draws on, where it's spoken/practiced, that it's an active living tradition deserving serious engagement.

2. **Phonology and orthography** (1 paragraph) — vowel system, distinctive consonants, tonal/diacritical marks, syllable structure. Concrete enough that the LLM doesn't drop diacriticals or mangle phonetics.

3. **Naming conventions** (1 paragraph, critical) — the specific construction patterns this register uses (praise-recital, agentive forms, quality compounds). MUST include explicit framing that pool entries are epithets, not given names. Sample template:

   > The character names in the provided pools are praise-name epithets (or [register-specific term: Oríkì, heiti, byname, etc.]) following [culture]-specific descriptive-naming conventions. They function as character names in lore but their semantic content is descriptive — they imply identity through marked-by qualities. Use them as character names directly. Rely on your knowledge of [language] morphology to interpret meanings and pick names that fit the lore's tone.

4. **Material culture** (1 paragraph) — specific materials, crafts, forms, foods, garments that root the register in concrete cultural specificity rather than generic-fantasy materials.

5. **Visual and cosmological flavor** (1 paragraph, optional) — what the world looks like in this register: landscapes, animals, atmospheric register — without invoking specific real religious-cosmological structures.

6. **What to avoid** (1 paragraph) — explicit instruction not to use specific named figures, named places, sacred concepts. Narrative form, not name-list form. The pool's positive constraint is the structural protection; this paragraph is supplementary framing.

7. **Pool-only instruction** (1 paragraph) — the LLM uses ONLY entries from the provided pools, doesn't invent additional names, doesn't modify pool entries with honorifics or affixes that aren't already present.

## Construction Pattern Variety

A pool that's all hyphenated body-element compounds reads as repetitive across many generations. Different cultures have different epithet patterns; identify all the patterns that exist in your target culture and represent each in the pool.

For each register, identify:

- The dominant epithet construction pattern (e.g., agentive `-q` forms in Quechua, body-element compounds in Yoruba)
- Secondary patterns (single-word qualities, phrase-names, reduplications, animal-attribute compounds, kennings)
- Idiomatic or poetic patterns specific to the culture

Aim for variety across the pool. Guidance is "include 3-5 different construction patterns" — not prescriptive percentages. If your culture has reduplications as a productive pattern, include some. If it has sentence-fragment names, include some. The variety is what makes the pool feel like the source tradition rather than one repeated formula.

## Item-Naming Construction (Generator-Specific)

When the LLM generates an item with a non-English-register item-name, it constructs the item's name freehand from non-sacred word components in the target language. The pool doesn't include item-names; it provides character/place/spirit names. Item-names are LLM construction at generation time.

Cultural-notes for the register should include a list of common everyday non-sacred word components the LLM can use when constructing item-names. For Yoruba: `Ọpá` (staff), `Adé` (crown), `Ìlù` (drum), `Idà` (sword). For Quechua: `thinka` (rod), `wasi` (house), `yauri` (copper), etc. — but NOT `khipu` (sacred record-keeping cord, ritual context).

The list of item-naming components is curation work parallel to the epithet pools. Verify no component is on the avoid-list.

## Routing and Scope

Each register commits to a specific cultural-linguistic register. The routing layer (`src/tools/item-generator/utils/select-register.mjs` and equivalents) decides when this register fires based on user input or origin selection.

In your deliverable's docstring, specify:

- **In-scope inputs** — which cultural keywords, deity-names, place-names should route here
- **Out-of-scope adjacents** — which related-but-distinct traditions need their own register later (e.g., an Andean register covers Cuzco Quechua but NOT Aymara, Ecuadorian Kichwa, or Mapudungun — those need separate registers if added)
- **Acceptable fall-through** — generic regional inputs without specificity falling to general handling rather than this register

This routing-scope information is for the integrator, not for prompt injection. Keep it in the docstring or a sidebar comment.

## Existing Protections (Context for Researchers)

Two existing architectural protections shape what your register IS and ISN'T expected to handle:

**Orc/Goblin pool-only**: Origins of `Orcish` and `Goblinoid` are restricted to a curated European/fictional register pool. Non-Western registers are structurally excluded for these origins because of documented orc-coding-as-racism patterns in fantasy. See `fantasyRaceConventionalRegisters` in `select-register.mjs`.

**Horror-coded aesthetic origins**: Origins of `Infernal`, `Abyssal`, `Necromantic`, `Vampiric`, `Lycanthropic`, and `Aberrant` are similarly restricted to a European/fictional pool. These origins' genre-conventional framing (Faustian, gothic, Lovecraftian) imposes Western-Christian-derived horror conventions on whatever register they pair with, so they're routed to a pool where the framing fits. See `horrorOriginRegisterPool` in `select-register.mjs`.

You don't design around these — the routing layer handles them. But understanding them clarifies the architectural pattern you're contributing to.

## Sacred-Boundary Commitment

Real religious figures and real historical persons of cultural-religious significance MUST NOT appear in fictional contexts. This is a values commitment, not an architectural choice that could be relaxed for performance or convenience.

The pool architecture and curation-time avoid-list are mechanisms that enforce this commitment. The commitment itself is why the architecture exists.

> Real [register] religious figures used in fictional contexts cause harm to the practitioners of an active living religion. This restriction is absolute.

Your register's docstring should make this commitment visible. Pool entries that violate it are bugs to fix, not tradeoffs to weigh.

## Residual Risk Acknowledgment

Architecture isn't perfect. Some pool entries may collide with real names not encountered during research. Cultural-notes accuracy may have errors. Construction patterns may produce output that reads as awkward to native speakers. The values commitment accepts these residuals as the cost of representation: representation with some risk of appropriation is better than non-representation, *provided* the architecture sincerely tries to minimize the risk.

Verification mechanisms:

- Pool curation discipline (verify no entry contains avoid-list components at construction time)
- Native-speaker review encouraged but not blocking before initial ship
- Production user feedback as primary post-ship verification (collision reports trigger pool swaps)

Your deliverable's docstring should acknowledge residual risks rather than implying coverage is complete. Honesty about uncertainty is part of the architecture.

## Cross-Generator Availability

Pool resources live at `src/shared/registers/` so they're accessible to every generator without crossing tool boundaries. Adding a register here makes it potentially available to:

- Item generator (current primary consumer)
- NPC generator (next likely consumer)
- Location generator (place-name pool especially relevant)
- Encounter generator
- Setting generator
- Bookshelf generator
- Lore/timeline generator

Generators consume the shared resource at their own pace. As a researcher, you're producing the data layer; per-generator integration is separate work handled by Claude Code at integration time.

## The Deliverable Format

Researchers deliver the actual `.mjs` file rather than a research document. This eliminates a transformation step where structure could drift between research and integration.

Your deliverable contains:

- A complete `.mjs` file with the four exports (`[register]CharacterEpithets`, `[register]PlaceEpithets`, `[register]SpiritEpithets`, `[register]CulturalNotes`)
- Inline source comments documenting meaning for each pool entry
- File-top docstring with research methodology, source citations, residual-risk acknowledgment, routing-scope notes, and the curation-time avoid-list (for future curator reference)

Claude Code receives the `.mjs` file, verifies it (pool sizes within target ranges, no entry collides with documented avoid-list, cultural notes covers the required topics), integrates it into the codebase, adds tests, and updates consumer code in any generator ready to adopt it.

## Reference Files

- `src/shared/registers/yoruba.mjs` — canonical structural example. After reading this primer, that file gives you the concrete shape.
- `src/tools/item-generator/utils/select-register.mjs` — routing layer with orc/goblin and horror-origin protection patterns. Demonstrates pool-only protection at the routing level.
- `src/tools/item-generator/utils/yoruba-prompt.mjs` — how a generator composes the shared resource into prompt instructions. Shows what the LLM actually sees.

## What This Document Is NOT

- **Implementation details about consumer code.** You're producing the data layer; integrators handle generator-side composition.
- **A universal-archetype list.** Every register is per-culture. There is no shared concept layer across registers. If you find yourself wanting one, re-read sections 4 and 5.
- **A template to mirror Yoruba's specific entries.** `yoruba.mjs` is a structural reference. Each register is its own cultural-research project drawing from the source culture's traditions.
