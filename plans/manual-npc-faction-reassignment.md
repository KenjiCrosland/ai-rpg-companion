# Manual NPC → Faction Reassignment in the Setting Generator's NPCs Tab

## Trigger

Any of:
- A user reports that the auto-classification step in `FactionsTab.generateFactions` (added 2026-05-24) put an NPC in the wrong faction and they want to correct it.
- We add a flow where NPCs are created *after* factions already exist (e.g., the user generates more NPCs from scratch in the NPCs tab once factions are in place) and they need a way to assign a faction at creation time or after.
- We ship `addNewFaction` improvements that should also re-trigger classification of pre-existing NPCs against the new faction.

## Problem

Today, the only path that sets `npc.faction` is:

1. **`AddNPCForm`** — the optional faction picker when a user manually adds an NPC. Fine for the create case but no edit path.
2. **`FactionsTab.generateFactions`** — auto-classifies un-affiliated NPCs against the just-generated faction list via the LLM. Best-effort; NPCs that don't clearly fit any faction stay in "Unaffiliated" with `faction: null`. Faction leaders are assigned to their own faction automatically.

There is **no UI to change an NPC's `faction` field after the fact**. If the auto-classify picks wrong, the user is stuck. If they generate factions a second time (or `addNewFaction`), there's no re-classification pass for the existing NPCs.

## Recommended approach

Add a faction picker inside the NPC card's edit mode (or as a small inline control on the row). Three pieces:

1. **NPCCard.vue edit form** gains a faction `<select>` whose options come from `setting.factions[]` (plus an "Unaffiliated" choice that maps to empty string / null). The edit-form state already has `name / read_aloud_description / combined_details / relationships`; add `faction`. Save flow propagates the new faction into `setting.npcs[i].faction`.

2. **NPCsTab.onSaveEdit** picks up the new field from the `edited` payload alongside the existing fields. The setting save already round-trips, so the regrouping in `RelatedNPCsSection`'s computed groups happens automatically on the next render.

3. **(Optional) Stub-row affordance**: a small "Move to faction…" dropdown on the collapsed row for users who don't want to expand the card just to reassign. Skip for first pass — expanded-edit path is enough.

Tests to add:
- `NPCCard.vue` edit form includes the faction picker when `setting.factions` is non-empty.
- `onSaveEdit` round-trip preserves the new `faction` value.
- An NPC manually moved into a faction renders inside that faction's group on next render.

## What NOT to do

- Don't try to make the AddNPCForm-style picker a permanent fixture on every NPC row. The faction is metadata, not the primary identifier; surfacing it always clutters the row. Keep it inside the edit form.
- Don't re-trigger the auto-classify LLM call from `addNewFaction` or on every faction-list mutation. That's another round of "implicit AI cost the user didn't ask for." Manual UI is the right answer for the after-the-fact case; auto-classify stays scoped to the bulk `generateFactions` flow where the user explicitly asked for a fresh faction set.
- Don't make the picker required. Users should be able to leave any NPC in Unaffiliated indefinitely.

## Related

- Auto-classify-on-generate landed: `classifyNPCsByFactionPrompt` + `classifyNPCsByFactionValidation` in `src/tools/setting-generator/prompts/faction-prompts.mjs`, wired in `FactionsTab.generateFactions`. The manual UI complements that — it doesn't replace it.
- `RelatedNPCsSection.vue` already groups NPCs by faction (with "Unaffiliated" bucket) — no work needed there beyond the data update.
