#!/usr/bin/env python3
"""Give the Archmage's Misty Step row the Archmage's own name (2026-11-14).

WHY. The Archmage names itself five times as "the archmage" and once as "the mage":

    Magic Resistance        The archmage has Advantage on saving throws...
    Multiattack             The archmage makes four Arcane Burst attacks.
    Spellcasting            The archmage casts one of the following spells...
    Protective Magic        The archmage casts Counterspell or Shield...
    Misty Step (3/Day)      The mage casts Misty Step, using the same...   <-- this one

That row is word for word the Mage's own Misty Step row, DC and all. The reskin engine
pastes print's rows onto the sheet and swaps print's noun for the creature's, and it
reads the nouns of the BODY'S NAME -- "mage" is not a word of "Archmage", only a
trailing substring of one. So Lord Vexmoor (CR 12, archmage body) shipped:

    Spellcasting.            Vexmoor casts one of the following spells...
    Protective Magic (3/Day) Vexmoor is hit by an attack roll...
    Misty Step (3/Day).      The mage casts Misty Step...                  <-- a creature
                                                                              not on the card

Catching it in CODE would need a rule about print's text -- "a noun that is a trailing
substring of the name is a self-reference" -- which is exactly the kind of word rule this
project refuses to write, and which would misfire the moment a block legitimately mentions
a different mage. The owner ruled on 2026-11-14 that the data is repaired instead.

THIS CORRECTS THE SOURCE, NOT OUR PARSE. Checked three ways, all agreeing the published
text reads "The mage":
  * scripts/srd-source/oldmanumby-monsters-A-Z.md:1184
  * scripts/srd-source/springbov-12_MonstersA-Z.md:1282     (an independent conversion)
  * Roll20's 2024 Archmage entry, which carries the line beside its "The archmage" rows
Both vendored markdown files are separate conversions of SRD 5.2 and both already carry
it, so our parser did not introduce it. It is an error in the published SRD.

WHAT IS NOT TOUCHED, and why this is not the start of a sweep.
  * The MAGE's own Misty Step row says "The mage" and is CORRECT. Only the Archmage's copy
    moves.
  * The WARHORSE's Hooves says "the horse moved 20+ feet". Same shape -- a noun that is a
    trailing substring of the name -- but the Warhorse never calls itself anything else, so
    "the horse" is that block's own idiom, not a slip. Left alone.
  * Measured across both corpora: the Archmage is the ONLY block that names itself two
    different ways (329 monsters in srd52-monsters.json, 327 in srd-monsters.json). The
    2014 corpus has no case at all -- its Archmage casts Misty Step from a spell list
    rather than a row.

Run:  python3 scripts/repair-srd-archmage-mage.py [--dry-run]
"""
import json
import sys
from pathlib import Path

PATH = Path("src/data/srd52-monsters.json")
DRY = "--dry-run" in sys.argv

EDITS = [
    (
        "Archmage",
        "Misty Step (3/Day)",
        "The mage casts",
        "The archmage casts",
        "the Mage's row was copied into the Archmage's block and kept the Mage's name",
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

    # 1. THE SERIALIZER MUST ROUND-TRIP BEFORE ANYTHING IS WRITTEN.
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

    # 2. THE MAGE'S OWN ROW IS UNTOUCHED. The whole point is that one of two identical
    #    rows is wrong; writing both would be the same mistake in the other direction.
    mage = [r for n, _s, r in rows(doc) if n == "Mage" and r.get("name") == "Misty Step (3/Day)"]
    if len(mage) != 1 or not str(mage[0].get("text") or "").startswith("The mage casts"):
        sys.exit("REFUSED: the Mage's own Misty Step row is missing or no longer says 'The mage casts'")

    # 3. EXACTLY THE INTENDED ROWS CHANGED, AND NOTHING ELSE.
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
    # 4. AND THE FILE WE JUST WROTE RE-PARSES TO WHAT WE MEANT.
    if json.loads(PATH.read_text(encoding="utf-8")) != doc:
        sys.exit("REFUSED: the written file does not re-parse to the repaired document")
    print("written and re-parsed clean")


if __name__ == "__main__":
    main()
