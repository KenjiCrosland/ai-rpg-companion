#!/usr/bin/env python3
"""Restore two save labels the SRD markdown conversion dropped (2026-11-13).

WHY. `src/data/srd52-monsters.json` is parsed from vendored SRD 5.2 markdown. The
Stone Giant's Deflect Missile arrived with its *Dexterity Saving Throw* and
*Failure* labels stripped, so the row read:

    ...the giant can redirect some of the attack's force.
    DC 17, one creature the giant can see within 60 feet. 11 (1d10 + 6) Force damage.

A GM cannot tell which save to roll. The row is pasted verbatim onto any sheet that
borrows the Stone Giant, so it ships as a screenshot defect (it did, on Big Bob,
2026-11-13). The official text is confirmed against D&D Beyond, AideDD and Roll20:

    *Dexterity Saving Throw*: DC 17, one creature the giant can see within 60 feet.
    *Failure:* 11 (1d10 + 6) Force damage.

Label style follows the corpus's own, measured over all 1310 print rows:
`*X Saving Throw*:` (198 uses, colon outside) and `*Failure:*` (190, colon inside).

The second edit is typography only. The Chain Devil's Unnerving Gaze reads
`*Response--Wisdom Saving Throw:*`, and `Response—Wisdom Saving Throw:` is the
OFFICIAL form for a reaction whose response is itself a save — the structure was
never damaged, only the em-dash was ASCII-ed by the markdown conversion.

NOT TOUCHED. Nine rows (Medusa, Basilisk, Gorgon, Cockatrice, Death Dog, four
Silver Dragons) write `*First Failure*` / `*Second Failure*` without their colons.
Readable, mechanically complete, and left alone deliberately.

Run:  python3 scripts/repair-srd-save-labels.py [--dry-run]
"""
import json
import sys
from pathlib import Path

PATH = Path("src/data/srd52-monsters.json")
DRY = "--dry-run" in sys.argv

EDITS = [
    # (monster, row name, old fragment, new fragment, why)
    (
        "Stone Giant",
        "Deflect Missile (Recharge 5-6)",
        "force. DC 17, one creature the giant can see within 60 feet. 11 (1d10 + 6) Force damage.",
        "force. *Dexterity Saving Throw*: DC 17, one creature the giant can see within 60 feet. *Failure:* 11 (1d10 + 6) Force damage.",
        "the save stat and the failure label, dropped by the markdown conversion",
    ),
    (
        "Chain Devil",
        "Unnerving Gaze",
        "*Response--Wisdom Saving Throw:*",
        "*Response—Wisdom Saving Throw:*",
        "an em-dash the conversion wrote as two hyphens (the structure is print's own)",
    ),
]


def rows(doc):
    """Every (monster name, section, row) in the corpus, in order."""
    monsters = doc if isinstance(doc, list) else doc.get("monsters", list(doc.values()))
    for m in monsters:
        for section, rs in (m.get("sections") or {}).items():
            for r in rs or []:
                yield m.get("name"), section, r


def main():
    original = PATH.read_text(encoding="utf-8")
    doc = json.loads(original)

    # 1. THE SERIALIZER MUST ROUND-TRIP BEFORE ANYTHING IS WRITTEN. A JS rewrite of
    #    this corpus once reformatted every number (10.0 -> 10) and every indent;
    #    the settings below were measured, not guessed, and this asserts them.
    if json.dumps(doc, indent=2, ensure_ascii=False) + "\n" != original:
        sys.exit("REFUSED: dumping the unmodified parse does not reproduce the file byte for byte")

    before = {(n, s, r.get("name")): r.get("text") for n, s, r in rows(doc)}

    applied = []
    for monster, row_name, old, new, why in EDITS:
        hit = [r for n, _s, r in rows(doc) if n == monster and r.get("name") == row_name]
        if len(hit) != 1:
            sys.exit(f"REFUSED: {monster} / {row_name} matched {len(hit)} rows, expected 1")
        text = hit[0].get("text") or ""
        if new in text:
            print(f"  already repaired: {monster} / {row_name}")
            continue
        if text.count(old) != 1:
            sys.exit(f"REFUSED: {monster} / {row_name} contains the old fragment {text.count(old)} times, expected 1")
        hit[0]["text"] = text.replace(old, new)
        applied.append((monster, row_name, why))

    # 2. EXACTLY THE INTENDED ROWS CHANGED, AND NOTHING ELSE.
    after = {(n, s, r.get("name")): r.get("text") for n, s, r in rows(doc)}
    if set(before) != set(after):
        sys.exit("REFUSED: the set of rows changed")
    changed = [k for k in before if before[k] != after[k]]
    if len(changed) != len(applied):
        sys.exit(f"REFUSED: {len(changed)} rows differ, expected {len(applied)}")
    print(f"rows in corpus: {len(before)} · changed: {len(changed)} · untouched: {len(before) - len(changed)}")
    for monster, row_name, why in applied:
        print(f"  {monster} / {row_name} — {why}")

    out = json.dumps(doc, indent=2, ensure_ascii=False) + "\n"
    if DRY:
        print("\n--dry-run: nothing written")
        return
    PATH.write_text(out, encoding="utf-8")
    # 3. AND THE FILE WE JUST WROTE RE-PARSES TO WHAT WE MEANT.
    if json.loads(PATH.read_text(encoding="utf-8")) != doc:
        sys.exit("REFUSED: the written file does not re-parse to the repaired document")
    print("written and re-parsed clean")


if __name__ == "__main__":
    main()
