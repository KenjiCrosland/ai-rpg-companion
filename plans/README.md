# Plans

Forward-dated implementation notes for work that isn't being done now but will need to be done when a specific feature lands. Each file describes:

- The trigger — the feature or change that makes the plan relevant.
- The problem the plan exists to solve.
- The recommended approach, with enough detail that a future session can act on it without rebuilding context.

If you (Claude) are about to start work that touches a domain in this folder, **read the relevant plan first**. Plans are written assuming you have no memory of the conversations that produced them.

## When to add a plan here

- A latent issue exists that's harmless today but will bite once a specific feature ships.
- A design decision was made but deferred — the rationale needs to survive past the conversation.
- A workaround was chosen with the explicit understanding that it gets revisited later.

Don't use this folder for general roadmap items, ideas, or task lists. Plans here are about preserving *technical context that would otherwise be lost*.

## Index

- [`multi-promote.md`](./multi-promote.md) — Cross-tool NPC promotion across multiple containers of the same store. Required before shipping any "link existing NPC to setting/dungeon" or systematic recurring-NPC flow. Describes a localStorage clobber gap in delete paths.
- [`statblock-stable-id.md`](./statblock-stable-id.md) — Replace the composite `${name}__${folder}` cross-tool id for statblocks with a stable `stb_*` id, mirroring the substrate's other entity id patterns. Triggered by new tools that link statblocks, new operations that mutate statblock identity, or any bug surfaced by the composite-id form.
