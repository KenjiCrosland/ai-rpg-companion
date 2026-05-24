/**
 * register-prose-directive.mjs
 *
 * Anti-leak directive shared across all tool prompts that use
 * linguistic registers. Tells the LLM not to mention the real-world
 * cultural / linguistic source of the register (Latin, Norse, Welsh,
 * Egyptian, etc.) inside generated prose — the register is the
 * prompt's framing, not in-world history.
 *
 * Observed leaks in production:
 *   - "inscribed with a single word in an older dialect of Latin"
 *   - "the runes are written in archaic Norse"
 *   - "the names come from the Yoruba tradition"
 *
 * Each tool's overview / generation prompt should embed this block
 * inside its register-handling section. The directive is intentionally
 * tool-agnostic (talks about "the world" rather than "the setting" or
 * "the dungeon") so the same string serves every consumer; the calling
 * prompt provides tool-specific context around it.
 *
 * If a tool needs to add tool-specific PASS / FAIL examples on top of
 * the shared ones, append them after this block in the calling prompt.
 */

export function registerProseDirective() {
  return `NEVER name the real-world cultural / linguistic source of the register in the prose. The world's tongues, scripts, traditions, and peoples are IN-WORLD, not real-world. Words like "Latin", "Norse", "Welsh", "Old Irish", "Egyptian", "Mesopotamian", "Greek", "Slavic", "Yoruba", "Aztec", "Japanese" — and any other real-world cultural / linguistic label — MUST NOT appear in any field. They're the prompt's framing, not the world's history.

PASS: "inscribed with a single word in the old script: 'Tace.'"
PASS: "inscribed with a single word in the script of the Vethari, the empire that founded this place: 'Tace.'"
FAIL: "inscribed with a single word in an older dialect of Latin: 'Tace.'"
FAIL: "the runes are written in archaic Norse"
FAIL: "the names come from the Yoruba tradition"

If a script, tongue, or tradition needs framing, give it a FANTASY name (the Old Tongue, the script of the First Empire, the speech of the Vethari) — never the real-world register source.`;
}
