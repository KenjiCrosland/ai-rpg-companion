/**
 * Deity-handling prompt block — per-register mode rule.
 *
 * Real deity names are the most-loaded surface of a cultural register.
 * Two failure modes shape the architecture:
 *
 *   1. Active living traditions (Yoruba's orisha, Maori's atua, Lakota
 *      spirits, Hindu/Sanskrit deities, etc.) have community
 *      practitioners with standing to object to fictional usage. Real
 *      deity names MUST NOT appear in any context — not as patrons,
 *      not as epithets, not as mythological references.
 *
 *   2. Extinct religions (Mesopotamian, Egyptian, Etruscan, Greek,
 *      Roman, Norse paganism, Celtic paganism, etc.) have extensive
 *      public-domain literature and no living community standing.
 *      Active religious life can be rendered through CONSTRUCTED
 *      EPITHETS drawn from authentic tradition. Real deity names
 *      appear SPARINGLY as historical-mythological reference points
 *      in lore — not as the routine framing for daily religious
 *      practice.
 *
 * The mode is determined by whether the religious tradition has
 * living practitioners with community standing — not by how ancient
 * the underlying culture is. Phoenician religion is older than
 * Yoruba religion but easier to engage with because Phoenician has
 * no active community while Yoruba does.
 *
 * Mode is declared on the register object via `deityMode`:
 *   'active-engagement' — extinct religion, epithet-construction framing.
 *   'restricted'        — living religion, no real deity names anywhere.
 *   undefined           — register isn't religion-coded; block does
 *                         not fire (fictional palettes, craft registers
 *                         like Italian-Renaissance, etc.).
 *
 * Each mode may carry register-specific data:
 *   - active-engagement: optional `deityEpithets` array — authentic
 *     epithets drawn from the tradition's real cultural sources
 *     (texts, inscriptions, hymns). The block displays them as a
 *     "use these directly" reference. Format diversity is preferred:
 *     simple titles ("the Merciful Lord"), prepositional phrases
 *     ("Lord of Fifty Names," "Lady of the Sycamore"), and domain-
 *     attribute compounds ("Bull-Calf of the Sun," "the Cloud-Rider")
 *     all sit naturally in their respective traditions' idioms. When
 *     absent, the block fires the generic active-engagement rule and
 *     trusts the LLM to invoke the tradition's actual epithet patterns
 *     from its training.
 *   - restricted: optional `deityAvoidList` array — real deity names
 *     to enumerate as explicit do-not-use terms. When present, the
 *     block names them. When absent, the block fires the generic
 *     restricted rule and trusts the LLM to recognize the tradition's
 *     deity surface.
 *
 * Returns empty string for any register without a `deityMode`, so the
 * caller can append the result unconditionally.
 *
 * @param {Object|null} register — the resolved register entry from
 *   `ALL_REGISTERS`, or null when no register is in scope.
 * @returns {string}
 */
export function buildDeityModeBlock(register) {
  if (!register || typeof register.deityMode !== 'string') return '';

  if (register.deityMode === 'active-engagement') {
    const epithetReference = Array.isArray(register.deityEpithets) && register.deityEpithets.length
      ? `

Authentic epithets for this register, drawn from real cultural sources (texts, inscriptions, hymns, classical-author records). Use these directly — they are the actual idioms the tradition used. Format varies (simple titles, prepositional phrases, domain-attribute compounds) — do not normalize them to a single style:

${register.deityEpithets.join(', ')}`
      : '';
    return `DEITY HANDLING — ACTIVE ENGAGEMENT MODE:

This register draws on an extinct religious tradition with no living practitioner community. Active religious life in the narrative is rendered through EPITHETS — descriptive deity-handles drawn from authentic cultural sources. Real deity names (those the descriptor authorizes) appear SPARINGLY as historical-mythological reference points in lore, not as the routine framing for daily religious practice.

- Active religious life (priests, temples, rituals, character deity-relationships, prayers, oaths): use the tradition's authentic epithets — the descriptive handles the culture itself used in its texts, hymns, and inscriptions. Reach for THIS register's actual epithets from your training, not epithets from other traditions. Format varies naturally across traditions: simple titles ("the [Quality] One"), prepositional phrases ("[Lord/Lady] of [Domain]"), domain-attribute compounds, and short evocative titles all sit naturally — match the format conventions of the specific register you're working in. Do not normalize every epithet to a single hyphenated style.
- Historical-mythological reference: a real deity name authorized by the register's descriptor MAY appear, but the DEFAULT is NOT to name the deity. The epithets above carry the active religious framing on their own — the lore does not need the underlying deity's name to convey weight. Reach for the deity's actual name only when the lore explicitly engages with origin-story or ancient-myth material that the name actively clarifies. Most generations should name no deity at all. When you do name a deity, weave the name into the lore freshly — do NOT lean on a stock genitive framing phrase that names an epithet and its underlying deity in the same breath.${epithetReference}`;
  }

  if (register.deityMode === 'restricted') {
    const avoidEnumeration = Array.isArray(register.deityAvoidList) && register.deityAvoidList.length
      ? `

The following real deity names MUST NOT appear anywhere in the narrative — not as patrons, not as epithets, not as mythological references, not as place-name components:

${register.deityAvoidList.join(', ')}`
      : '';
    return `DEITY HANDLING — RESTRICTED MODE:

This register draws on a LIVING religious tradition with practitioner community standing. Real deity names MUST NOT appear in any context — not as active patrons, not as epithets, not as mythological references. Religious life is rendered through fully-constructed fictional deities or generic divine references.

- For active religious life, construct fictional deities in the register's phonological style. Pattern the names after the register's morphology so they read as register-coherent, but do not use any real deity name as a component or as a near-cognate.
- For generic divine references that don't need named deities, use in-world phrasing: "the elder powers," "the river-spirits," "the keepers of the sacred grove," "the ones who came before," "the deep ones in the rocks."
- Sacred ceremonial concepts that double as deity terms in the tradition (mana, tapu, atua, orisha, etc.) are forbidden as item-name components or epithet components — see the item-name avoid-list if registered.${avoidEnumeration}`;
  }

  return '';
}
