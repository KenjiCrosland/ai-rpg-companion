# SRD 5.2.1 monster sources (CC-BY-4.0, Wizards of the Coast)

`src/data/srd52-monsters.json` was built 2026-10-13 by `scripts/parse-srd52.py` from
`springbov/dndsrd5.2_markdown` (`src/12_MonstersA-Z.md` + `src/13_Animals.md`), in a sandbox — the
source was never committed. Fetched again 2026-11-12 and vendored here:

- `springbov-12_MonstersA-Z.md`, `springbov-13_Animals.md` — the ORIGINAL source. **It carries only
  3 `### Reactions` sections** (Archmage, Lich, Mage). The parser is correct; the conversion dropped
  the other 19. That is why our corpus has reactions on 3 of 329 monsters.
- `oldmanumby-monsters-A-Z.md` — `oldmanumby/dnd.srd.5.2.1`, all 26 letter files concatenated. Same
  entry idiom (`***Name.*** text`), different heading levels (`# Name`, `## Section`), and it carries
  **all 22 Reactions sections** (Redirect Attack, Parry ×7, Shield Guardian's Protection, …). Its
  attack rows write `*Hit:*` where ours do not — do NOT re-parse the whole corpus from it; merge the
  Reactions sections only (see HANDOVER-2026-11-11.md, "the SRD reactions").

A third source, `downfallx/dnd-5e-srd-markdown` (`monsters-A-Z.md`, `**_Name._**` idiom, `<hr>`
separators), agrees with oldmanumby on 19 of 22 reaction texts to the first 80 characters; the
differences are en-dashes and italics markers, not words.
